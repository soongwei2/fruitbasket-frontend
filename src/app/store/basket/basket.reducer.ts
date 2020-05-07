import { createReducer, on } from '@ngrx/store';
import { IBasket } from 'src/app/shared/models/basket';
import { RootState } from '..';
import { AddCouponCode, AddToBasket, RemoveFromBasket, ClearBasket } from './basket.action';
import _ from 'lodash';

export interface BasketState {
  list: Array<IBasket>
  isLoading: boolean;
  couponCode: string;
}
export const initialState: BasketState = {
  list: [],
  isLoading: false,
  couponCode: null,
};

export const basketReducer = createReducer(initialState,
  on(AddToBasket, (state, action) => {
    let list = Object.assign([], state.list);
    let index = list.findIndex(basket => _.get(basket, 'product.id') == action.product.id);

    if (index >= 0) {
      let item: IBasket = Object.assign({}, list[index]);
      item.quantity += (action.count ? action.count : 1);
      list[index] = item;
    } else {
      const newBasket = {
        product: action.product,
        quantity: (action.count ? action.count : 1),
      }
      list.unshift(newBasket);
    }

    return { ...state, list }
  }),
  on(RemoveFromBasket, (state, action) => {
    let list = Object.assign([], state.list);
    let index = list.findIndex(basket => _.get(basket, 'product.id') == action.product.id);
    if (index >= 0) {

      list[index].quantity -= (action.count ? action.count : 1);
      if (list[index].quantity <= 0) {
        list.splice(index, 1);
      }
    }
    return { ...state, list }
  }),
  on(AddCouponCode, (state, action) => { return { ...state, couponCode: action.code } }),
  on(ClearBasket, (state, action) => { return { ...state, ...initialState } }),
);


//SELECTORS
export const selectBasket = {
  list: (state: RootState) => state.basket.list,
  isLoading: (state: RootState) => state.basket.isLoading,
  couponCode: (state: RootState) => state.basket.couponCode,
}

