import { createReducer, on } from '@ngrx/store';
import { RootState } from '..';
import { decrement, increment, reset, showLoading, hideLoading } from './layout.action';

export interface LayoutState {
  value: number;
  isLoading: boolean;
}
export const initialState: LayoutState = {
  value: 0,
  isLoading: false,
};

export const layoutReducer = createReducer(initialState,
  on(increment, (state, action) => { return { ...state, value: state.value + 1 } }),
  on(decrement, (state, action) => { return { ...state, value: state.value - 1 } }),
  on(reset, (state, action) => { return { ...state, value: action.value?action.value:0 } }),
 
  on(showLoading, (state, action) => { return { ...state, isLoading: true } }),
  on(hideLoading, (state, action) => { return { ...state, isLoading: false } }),
);


//SELECTORS
export const selectLayout = {
  value: (state: RootState) => state.layout.value,
  isLoading: (state: RootState) => state.layout.isLoading,
}

