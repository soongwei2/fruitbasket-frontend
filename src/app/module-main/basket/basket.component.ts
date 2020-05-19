import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import _ from 'lodash';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddCouponComponent } from 'src/app/shared/components/add-coupon/add-coupon.component';
import { DialogPaymentService } from 'src/app/shared/components/dialog-payment/dialog-payment.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IPromotion } from 'src/app/shared/models/product';
import { RootState } from 'src/app/store';
import { AddCouponCode, AddToBasket, RemoveFromBasket } from 'src/app/store/basket/basket.action';
import { selectBasket } from 'src/app/store/basket/basket.reducer';
import { showSnackBar } from 'src/app/store/layout/layout.action';
import { AddPromotion } from 'src/app/store/promotion/promotion.action';
import { BasketDataSource } from './basket.datasource';
import { UpdateProductsService } from 'src/app/shared/services/update-products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  dataSource = new BasketDataSource(this.store);
  displayedColumns = ['name', 'unitPrice', 'quantity', 'totalPrice'];
  _ = _;

  coupon$ = this.store.select(selectBasket.couponCode);

  constructor(
    private store: Store<RootState>,
    public dialog: MatDialog,
    private dialogPaymentService: DialogPaymentService,
    public productService: UpdateProductsService,
  ) { }

  ngOnInit(): void {
  }

  addItem(item: IBasket) {
    if (!item.product) {
      item.promotion.promotionRules.forEach(eachRule => {
        const count = eachRule.quantity;
        const product = eachRule.product;

        this.store.dispatch(AddToBasket({ product, count }));
      });
    } else {
      this.store.dispatch(AddToBasket({ product: item.product }));
    }
  }

  removeItem(item: IBasket) {
    if (!item.product) {
      item.promotion.promotionRules.forEach(eachRule => {
        const count = eachRule.quantity;
        const product = eachRule.product;

        this.store.dispatch(RemoveFromBasket({ product, count }));
      });
    } else {
      this.store.dispatch(RemoveFromBasket({ product: item.product }));
    }
  }

  onCheckout() {
    combineLatest(this.dataSource.connect(), this.dataSource.subTotal()).pipe(take(1)).toPromise().then((combined) => {
      const basketArr = combined[0];
      const subTotal = combined[1];

      if (!basketArr.length) {
        this.store.dispatch(showSnackBar({ message: 'Basket is empty' }));
        return;
      }

      this.dialogPaymentService.open({ basketArr: this.dataSource.connect(), subTotal: this.dataSource.subTotal() });
      /*       const dialogRef = this.dialog.open(DialogPaymentComponent, {
              minWidth: '300px',
              data: {basketArr: this.dataSource.connect(), subTotal: this.dataSource.subTotal()}
            });
      
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            }); */
    })
  }

  onCoupon(coupon) {
    if (coupon) {
      this.store.dispatch(showSnackBar({ message: 'Removed coupon code' }));
      this.store.dispatch(AddCouponCode({ code: null }));
      return;
    }
    const dialogRef = this.dialog.open(AddCouponComponent, {
      width: '300px',
      data: {}
    });

  }

  onGenerate() {
    const genCouponCode = Math.random().toString(36).slice(2).substring(0, 5).toUpperCase();
    console.log("genCouponCode: ", genCouponCode)
    const promotion: IPromotion = {
      name: "30% Discount on Oranges",
      discount: 30,
      type: "more_than",
      quantity: 1,
      couponCode: genCouponCode,
      expiryDate: new Date(new Date().getTime() + 30000),
      promotionRules: [
        {
          condition: ">=",
          quantity: 1,
          productId: "B9B69146-A55D-4B7A-A698-DF54CFE03ED0",
        }
      ]
    }


    this.store.dispatch(AddPromotion({ promotion }));
  }


}
