import { Products } from "../model/productList";
import { ADD_PRODUCT_TO_CART, PLACE_ORDER, ProductActions, REMOVE_PRODUCT_FROM_CART } from './product.actions';

export interface State {
  products: Products[];
  cartProductCount: number;
}

const initialState: State = {
  products: [],
  cartProductCount: 0
}

export function productReducer(state = initialState, action: ProductActions){
  switch(action.type){
    case ADD_PRODUCT_TO_CART:
     return {
       ...state,
      products: [...state.products, action.payload],
      cartProductCount: state.cartProductCount+1
    }
    case REMOVE_PRODUCT_FROM_CART:
      let products = [...state.products];
      products.splice(action.payload,1);
      return {
        ...state,
        products: products,
        cartProductCount: state.cartProductCount-1
      }
      case PLACE_ORDER:
        return {
          ...state,
          products: [],
          cartProductCount: 0
        }
    default:
      return state;
  }
}


