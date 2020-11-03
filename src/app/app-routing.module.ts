import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "shop",
    pathMatch: "full"
  },
  {
    path: "shop",
    component: ShopComponent
  },
  {
    path:"checkout",
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
