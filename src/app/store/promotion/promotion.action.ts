import { createAction, props } from '@ngrx/store';
import { IPromotion } from 'src/app/shared/models/product';

export const AddPromotion = createAction('[Promotion] AddPromotion', props<{ promotion: IPromotion }>());