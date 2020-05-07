import { IProduct, IPromotion } from './product';


export interface IBasket {
  quantity: number;
  product: IProduct; 
  promotion?: IPromotion;
  originalPrice?: number;
  totalPrice: number;
  promotionPrice?: number;
}
