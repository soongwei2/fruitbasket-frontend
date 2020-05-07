import { createAction, props } from '@ngrx/store';
import { IInvoice } from 'src/app/shared/models/invoice';

export const CreateInvoice = createAction('[Invoice] CreateInvoice', props<{ invoice: IInvoice, couponCode: string }>());
// export const CreateInvoiceSuccess = createAction('[Invoice] CreateInvoiceSuccess');

export const GetListInvoice = createAction('[Invoice] GetListInvoice', props<{ invoice: IInvoice }>());
export const AddListInvoice = createAction('[Invoice] AddListInvoice', props<{ list: IInvoice[] }>());