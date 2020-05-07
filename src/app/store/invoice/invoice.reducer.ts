import { createReducer, on } from '@ngrx/store';
import { IInvoice } from 'src/app/shared/models/invoice';
import { RootState } from '..';
import { AddListInvoice } from './invoice.action';


export interface InvoiceState {
  list: IInvoice[];
  // hideDialog: boolean;
}
export const initialState: InvoiceState = {
  list: [],
  // hideDialog: false,
};

export const invoiceReducer = createReducer(initialState,
  on(AddListInvoice, (state, action) => { return { ...state, list: action.list } }),
  // on(CreateInvoiceSuccess, (state, action) => { return { ...state, hideDialog: !hideLoading } }),
);


//SELECTORS
export const selectInvoice = {
  list: (state: RootState) => state.invoice.list,
  // hideDialog: (state: RootState) => state.invoice.hideDialog,
}

