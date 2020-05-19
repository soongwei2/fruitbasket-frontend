import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { getOriginalPrice } from '@soongwei/commons/basket/calculations';
import { generateInvoice } from '@soongwei/commons/basket/invoice';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RootState } from 'src/app/store';
import { selectBasket } from 'src/app/store/basket/basket.reducer';
import { CreatePayment } from 'src/app/store/invoice/invoice.action';
import { selectUser } from 'src/app/store/user/user.reducer';
import { IBasket } from '../../models/basket';


@Component({
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss']
})

export class DialogPaymentComponent implements OnInit {

  user$ = this.store.select(selectUser.user);
  couponCode$ = this.store.select(selectBasket.couponCode);
  // hideDialog$ = this.store.select(selectInvoice.hideDialog); 
  totalItems$ = this.data.basketArr.pipe(
    map(basketArr => basketArr.reduce((total, basket) => total + basket.quantity, 0))
  );

  originalPriceTotal$ = this.data.basketArr.pipe(
    map(basketArr => getOriginalPrice(basketArr))
  )



  constructor(
    public dialogRef: MatDialogRef<DialogPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { basketArr: Observable<IBasket[]>, subTotal: Observable<number> },
    private store: Store<RootState>) {
  }

  ngOnInit(): void {

  }

  onCancel() {
    this.dialogRef.close();
  }

  onPay() {
    combineLatest(this.data.basketArr, this.data.subTotal, this.user$, this.couponCode$).pipe(take(1)).toPromise().then((combined) => {
      const basketArr = combined[0];
      const subTotal = combined[1];
      const user = combined[2];
      const couponCode = combined[3];


      const invoice = generateInvoice(basketArr, user.id);
      /*   const invoiceItems = basketArr.map((eachItem) => {
          return {
            quantity: eachItem.quantity,
            price: _.get(eachItem, 'product.price') || _.get(eachItem, 'promotionPrice'),
            productName: _.get(eachItem, 'product.name') || _.get(eachItem, 'promotion.name'),
            promotionName: _.get(eachItem, 'product.name') ? _.get(eachItem, 'promotion.name') : undefined,
            promotionDiscount: _.get(eachItem, 'promotion.discount'),
            originalPrice: _.get(eachItem, 'originalPrice'),
            totalPrice: _.get(eachItem, 'totalPrice'),
          }
        });
  
        const invoice: IInvoice = {
          subTotal: subTotal,
          userId: user.id,
          invoiceItems
        } */

      this.store.dispatch(CreatePayment({ basketArr, invoice, couponCode, userId: user.id }));

    })

  }


}
