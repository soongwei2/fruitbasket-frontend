import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RootState } from '..';
import { hideLoading, showLoading, showSnackBar } from '../layout/layout.action';
import { AddCouponCode, VerifyCouponCode } from './basket.action';

@Injectable()
export class BasketEffects {
  constructor(
    private http: HttpClient,
    private actions: Actions,
    private store: Store<RootState>,
    private router: Router,
  ) { }

  VerifyCouponCode$ = createEffect(() => this.actions.pipe(
    ofType(VerifyCouponCode),
    tap(() => this.store.dispatch(showLoading())),
    mergeMap(
      (action) =>
        this.http.post(environment.servicePath + "/promotion/checkCouponCode", { couponCode: action.code })
          .pipe(
            map((response: any) => {

              this.store.dispatch(hideLoading());

              if (!response) {
                this.store.dispatch(showSnackBar({ message: 'Invalid coupon code' }));
              } else {
                this.store.dispatch(AddCouponCode({ code: response.couponCode }));
                this.store.dispatch(showSnackBar({ message: 'Added coupon code' }));
              }

            }),
            catchError((error) => {
              this.store.dispatch(hideLoading());

              if (error.error && error.error.message) {
                this.store.dispatch(showSnackBar({ message: error.error.message }));
              } else {
                this.store.dispatch(showSnackBar({ message: error.message }));
              }

              return throwError(error);
            })
          )
    ),
  ), { dispatch: false })

}