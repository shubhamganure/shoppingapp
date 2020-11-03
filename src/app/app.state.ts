import { Products } from './model/productList';

export interface AppState {
  readonly product: Products[];
  readonly cartProductCount: number;
}
