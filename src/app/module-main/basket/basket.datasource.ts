import { DataSource } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { promotion } from '@soongwei/commons/basket/calculations';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBasket } from 'src/app/shared/models/basket';
import { RootState } from 'src/app/store';
import { selectBasket } from 'src/app/store/basket/basket.reducer';

export class BasketDataSource extends DataSource<IBasket> {
    constructor(private store: Store<RootState>) {
        super();
    }
    connect(): Observable<IBasket[]> {
        return combineLatest(
            this.store.select(selectBasket.list),
            this.store.select(selectBasket.couponCode))
            .pipe(map((combinedArr) => {
                const calculatedBasket = promotion(combinedArr[0], combinedArr[1]);
                return calculatedBasket;
            }))

    }

    subTotal() {
        return this.connect().pipe(
          map(order => order.reduce((total, basket) => total + (Math.round((basket.totalPrice + Number.EPSILON) * 100) / 100), 0)));
      }
    disconnect() { }
}