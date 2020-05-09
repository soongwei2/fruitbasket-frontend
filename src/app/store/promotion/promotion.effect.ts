import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { DialogGenerateCouponComponent } from 'src/app/shared/components/dialog-generate-coupon/dialog-generate-coupon.component';
import { IPromotion } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { RootState } from '..';
import { hideLoading, showLoading, showSnackBar } from '../layout/layout.action';
import { AddPromotion } from './promotion.action';
import { GetProduct } from '../product/product.action';

@Injectable()
export class PromotionEffects {
  constructor(
    private http: HttpClient,
    private actions: Actions,
    private store: Store<RootState>,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  AddPromotion$ = createEffect(() => this.actions.pipe(
    ofType(AddPromotion),
    tap(() => this.store.dispatch(showLoading())),
    mergeMap(
      (action) =>
        this.http.put(environment.servicePath + "/promotion/full", action.promotion)
          .pipe(
            map((response: IPromotion) => {


              if (response) {
                this.store.dispatch(GetProduct({ product: { deleted: false } }));
                this.store.dispatch(showSnackBar({ message: 'Successfully added promotion' }));

                const dialogRef = this.dialog.open(DialogGenerateCouponComponent, {
                  width: '300px',
                  data: { couponCode: response.couponCode }
                });
              } else {
                this.store.dispatch(showSnackBar({ message: 'Failed to added promotion' }));

              }
              this.store.dispatch(hideLoading());
            }),
            catchError((error) => {
              this.store.dispatch(hideLoading());
              this.store.dispatch(showSnackBar({ message: error.message }));
              return throwError(error);
            })
          )
    ),
  ), { dispatch: false })


}