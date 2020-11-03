import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartCount:number = 0;
  headerCartCountSub: Subscription = null;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getCartCount();
  }

  getCartCount(){
    this.headerCartCountSub = this.store.select('product').subscribe((res: any)=>{
      this.cartCount = res.cartProductCount;
    });
  }

  navigateToCheckout(){
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(){
    if(this.headerCartCountSub){
      this.headerCartCountSub.unsubscribe();
    }
  }

}
