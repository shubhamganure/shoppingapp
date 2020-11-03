import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.state';
import { Products } from '../model/productList';
import { ProductsService } from '../products.service';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: Products[] = [];
  loading: boolean = false;
  noRecordFound: boolean = false;
  disableButton: boolean = false;

  productListSubsription: Subscription = null;

  private mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  tabQuery: MediaQueryList;
  screen_1366x768Query: MediaQueryList;
  screen_1920x1080Query: MediaQueryList;

  constructor(
    private productService: ProductsService,
    media: MediaMatcher,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
    )
    {
    this.mobileQuery = media.matchMedia('(max-width:600px)');
    this.tabQuery = media.matchMedia('(max-width:768px)');
    this.screen_1366x768Query = media.matchMedia('(max-width:1366px)');
    this.screen_1920x1080Query = media.matchMedia('(max-width:1920px)');
  }

  ngOnInit(): void {
    this.getAllProductsLists();
  }

  getAllProductsLists(){
    this.loading = true;
    this.productListSubsription = this.productService.getAllProducts().subscribe(res=>{
      if(res.data){
        this.loading = false;
        this.noRecordFound = false;
        this.products = res.data;
        this.products.forEach((ele:any) =>{
          ele.isAddedToCart = false;
        });
      } else{
        this.noRecordFound = true;
      }
     },
     err =>{
       console.log(err);
       this.noRecordFound = true;
     }
     );
  }

  addToCart(product: Products){
    product.isAddedToCart = true;
    this.store.dispatch(new ProductActions.AddProductToCart(product));
    this.snackBar.open(`${product.name} Added To Cart!!`, '',{
      duration: 2000,
      horizontalPosition: 'end',
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  getColumnCount() {
    //Mobile Screen
    if (this.mobileQuery.matches) {
      return 1;
    }
    //Tablet screen
    else if (this.tabQuery.matches) {
      return 1;
    }
    //1366 resolution screen
    else if (this.screen_1366x768Query.matches) {
      return 4;
    }
    //1920 resolution screen
    else if (this.screen_1920x1080Query.matches) {
      return 3;
    }
  }

  getHeight(){
    //Mobile Screen
    if(this.mobileQuery.matches){
      return '390px';
    }
    //1366 resolution screen
    else if(this.screen_1366x768Query){
      return '500px';
    }
  }

  ngOnDestroy(){
    if(this.productListSubsription){
      this.productListSubsription.unsubscribe();
    }
  }

}
