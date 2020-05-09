

export interface IProduct{
    id?: string;
    name?: string;
    image?: string;
    price?: number;
    deleted?: boolean;
}

export interface IPromotion{
    id?: string;
    name?: string;
    discount?: number;
    type?: string;
    quantity?: number;
    expiryDate?: Date;
    couponCode?: string;
    deleted?: boolean;
    promotionRules?: IPromotionRules[];
}

export interface IPromotionRules{
    id?: string;
    condition?: string;
    quantity?: number;
    productId?: string;
    promotionId?: string;
    product?: IProduct;
    promotion?: IPromotion;
}