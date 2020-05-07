import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { formatMonies } from '@soongwei/commons/basket/monies';
import _ from 'lodash';
import { AddCouponComponent } from 'src/app/shared/components/add-coupon/add-coupon.component';
import { DialogPaymentComponent } from 'src/app/shared/components/dialog-payment/dialog-payment.component';
import { IBasket } from 'src/app/shared/models/basket';
import { RootState } from 'src/app/store';
import { AddCouponCode, AddToBasket, RemoveFromBasket } from 'src/app/store/basket/basket.action';
import { selectBasket } from 'src/app/store/basket/basket.reducer';
import { showSnackBar } from 'src/app/store/layout/layout.action';
import { BasketDataSource } from './basket.datasource';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { DialogPaymentService } from 'src/app/shared/components/dialog-payment/dialog-payment.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  dataSource = new BasketDataSource(this.store);
  displayedColumns = ['name', 'unitPrice', 'quantity', 'totalPrice'];
  formatMonies = formatMonies;
  _ = _;

  coupon$ = this.store.select(selectBasket.couponCode);

  constructor(
    private store: Store<RootState>, 
    public dialog: MatDialog,
    private dialogPaymentService: DialogPaymentService
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

      this.dialogPaymentService.open({basketArr: this.dataSource.connect(), subTotal: this.dataSource.subTotal()});
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



}
