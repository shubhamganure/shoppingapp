import { Action } from '@ngrx/store';
import { Products } from '../model/productList';


export const ADD_PRODUCT_TO_CART = "[PRODUCT] Add Product To Cart";
export const REMOVE_PRODUCT_FROM_CART = "[PRODUCT] Remove Product From Cart";
export const PLACE_ORDER = "[PRODUCT] Place Order";

export class AddProductToCart implements Action {
  readonly type = ADD_PRODUCT_TO_CART;
  constructor(public payload: Products) {}
}

export class RemoveProductFromCart implements Action {
  readonly type = REMOVE_PRODUCT_FROM_CART;
  constructor(public payload: number) {}
}

export class PlaceOrder implements Action {
  readonly type = PLACE_ORDER;
  constructor(public payload: []) {}
}

export type ProductActions = AddProductToCart | RemoveProductFromCart | PlaceOrder;
