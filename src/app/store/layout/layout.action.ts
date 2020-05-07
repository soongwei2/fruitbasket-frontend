import { createAction, props } from '@ngrx/store';

export const increment = createAction('[layout] Increment');
export const decrement = createAction('[layout] Decrement');
export const reset = createAction('[layout] Reset', props<{ value?: number }>());

export const showLoading = createAction('[layout] showLoading');
export const hideLoading = createAction('[layout] hideLoading');

export const showSnackBar = createAction('[layout] showSnackBar', props<{ message: string }>());


export const clearStore = createAction('[layout] clearStore');