import { IProduct, IPromotion } from './product';


export interface IInvoice {
  id?: string;
  paymentDate?: Date;
  subTotal?: number; 
  userId?: string;
  invoiceItems?: IInvoiceItems[];
}

export interface IInvoiceItems{
  id?: string;
  quantity?: number;
  price?: number;
  productName?: string;
  promotionName?: string;
  promotionDiscount?: number;
  invoiceId?: string;
}
