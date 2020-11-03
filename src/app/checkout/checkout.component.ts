import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Products } from '../model/productList';
import * as ProductActions from '../state/product.actions';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: Products[] = [];
  itemCount: number = 0;
  subTotal: number = 0;

  productSubscription: Subscription = null;

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(){
    this.productSubscription = this.store.select('product').subscribe((res: any)=>{
      this.products = [];
      res.products.forEach(ele => {
        this.products.push(Object.create(ele));
      });
      this.itemCount = res.cartProductCount;
      this.subTotal = 0;
      this.products.forEach((ele:any) =>{
        this.subTotal += Number(ele.price);
        ele.Quantity = 1;
      });
    });
  }

  removeProduct(index: number, name: string){
    this.store.dispatch(new ProductActions.RemoveProductFromCart(index));
    this.snackBar.open(`${name} Deleted Successfully!!`, '',{
      duration: 2000,
      horizontalPosition: 'end',
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  quantityChange(){
    this.subTotal = 0;
    this.products.forEach((ele:any) =>{
      this.subTotal += (Number(ele.price)* ele.Quantity);
    });
  }

  placeOrder(){
    this.store.dispatch(new ProductActions.PlaceOrder([]));
    this.snackBar.open(`Product placed Successfully!!`, '',{
      duration: 2000,
      horizontalPosition: 'end',
      panelClass: ['mat-toolbar', 'mat-primary']
    });
    this.router.navigate(['/shop']);
  }

  ngOnDestroy(){
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
  }

}
