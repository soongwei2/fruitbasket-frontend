import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { DialogPaymentService } from 'src/app/shared/components/dialog-payment/dialog-payment.service';
import { IInvoice } from 'src/app/shared/models/invoice';
import { environment } from 'src/environments/environment';
import { RootState } from '..';
import { ClearBasket } from '../basket/basket.action';
import { hideLoading, showLoading, showSnackBar } from '../layout/layout.action';
import { AddListInvoice, CreateInvoice, GetListInvoice } from './invoice.action';

@Injectable()
export class InvoiceEffects {
  constructor(
    private http: HttpClient,
    private actions: Actions,
    private store: Store<RootState>,
    private router: Router,
    private dialogPaymentService: DialogPaymentService,
  ) { }

  GetListInvoice$ = createEffect(() => this.actions.pipe(
    ofType(GetListInvoice),
    tap(() => this.store.dispatch(showLoading())),
    mergeMap(
      (action) =>
        this.http.post(environment.servicePath + "/invoice/full", action.invoice )
          .pipe(
            map((response: IInvoice[]) => {
              this.store.dispatch(AddListInvoice({ list: response }));
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

  CreateInvoice$ = createEffect(() => this.actions.pipe(
    ofType(CreateInvoice),
    tap(() => this.store.dispatch(showLoading())),
    mergeMap(
      (action) =>
        this.http.put(environment.servicePath + "/invoice/full", { invoice: action.invoice, couponCode: action.couponCode })
          .pipe(
            map((response: any) => {

              
              this.dialogPaymentService.close();
              this.store.dispatch(ClearBasket());
              this.store.dispatch(showSnackBar({ message: 'Payment successful' }));

              this.router.navigate(['/']).then(() => {
                return this.router.navigate(['/profile'])
              }).then(() => {
                this.store.dispatch(hideLoading());
              });


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

  /* 
    CreateInvoiceSuccess$ = createEffect(() => this.actions.pipe(
      ofType(CreateInvoiceSuccess),
      tap(() => {
    
      }),
      
    ), { dispatch: false }) */

}