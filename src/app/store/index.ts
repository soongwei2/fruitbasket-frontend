import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { clearStore } from './layout/layout.action';
import { layoutReducer, LayoutState } from './layout/layout.reducer';
import { UserState, userReducer } from './user/user.reducer';
import { UserEffects } from './user/user.effect';
import { LayoutEffects } from './layout/layout.effect';
import { ProductState, productReducer } from './product/product.reducer';
import { ProductEffects } from './product/product.effect';
import { BasketState, basketReducer } from './basket/basket.reducer';
import { BasketEffects } from './basket/basket.effect';
import { invoiceReducer, InvoiceState } from './invoice/invoice.reducer';
import { InvoiceEffects } from './invoice/invoice.effect';

export const STORE_KEYS_TO_PERSIST = [
  'user',
  'basket',
];

export interface RootState {
  layout: LayoutState;
  user: UserState;
  product: ProductState;
  basket: BasketState;
  invoice: InvoiceState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  layout: layoutReducer,
  user: userReducer,
  product: productReducer,
  basket: basketReducer,
  invoice: invoiceReducer,
};

export const rootEffects = [
  UserEffects, 
  LayoutEffects,
  ProductEffects,
  BasketEffects,
  InvoiceEffects,
]

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: STORE_KEYS_TO_PERSIST,
    rehydrate: true,
    removeOnUndefined: true,
  })(reducer);
}
export function clearState(reducer) {
  return function (state, action) {
    return reducer(action.type === clearStore.type ? undefined : state, action);
  }
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer, clearState];
