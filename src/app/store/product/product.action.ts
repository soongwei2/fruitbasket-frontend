import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/models/product';

export const GetProduct = createAction('[Product] GetProduct', props<{ product: IProduct }>());
export const UpdateProduct = createAction('[Product] UpdateProduct', props<{ list?: Array<IProduct>, isLoading?: boolean}>());