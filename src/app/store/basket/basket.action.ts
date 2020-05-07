import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/models/product';

export const AddToBasket = createAction('[basket] AddToBasket', props<{ product: IProduct, count?: number }>());
export const RemoveFromBasket = createAction('[basket] RemoveFromBasket', props<{ product: IProduct, count?: number }>());
export const ClearBasket = createAction('[basket] ClearBasket');

export const AddCouponCode = createAction('[basket] AddCouponCode', props<{ code: string }>());
export const VerifyCouponCode = createAction('[basket] VerifyCouponCode', props<{ code: string }>());