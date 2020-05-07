import { createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/shared/models/product';
import { RootState } from '..';
import { UpdateProduct } from './product.action';


export interface ProductState {
  list: Array<IProduct>;
  isLoading: boolean;
}
export const initialState: ProductState = {
  list: [],
  isLoading: false,
};

export const productReducer = createReducer(initialState,
  on(UpdateProduct, (state, action) => { 
    return { 
    ...state, 
    ...action.list != undefined && {list: action.list},
    ...action.isLoading != undefined && {isLoading: action.isLoading} 
  } }),
);


//SELECTORS
export const selectProduct = {
  // product: (state: RootState) => state.product,
  list: (state: RootState) => state.product.list,
  isLoading: (state: RootState) => state.product.isLoading,
}

