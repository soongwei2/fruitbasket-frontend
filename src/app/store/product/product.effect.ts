import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { RootState } from '..';
import { hideLoading, showLoading, showSnackBar } from '../layout/layout.action';
import { GetProduct, UpdateProduct } from './product.action';

@Injectable()
export class ProductEffects {
  constructor(
    private http: HttpClient,
    private actions: Actions,
    private store: Store<RootState>,
    private router: Router,
  ) { }

  GetProduct$ = createEffect(() => this.actions.pipe(
    ofType(GetProduct),
    tap(() => this.store.dispatch(showLoading())),
    mergeMap(
      (action) =>
        this.http.post(environment.servicePath + "/product/full", action.product)
          .pipe(
            map((response: IProduct[]) => {
              // this.store.dispatch(UpdateUser({ user }));
              this.store.dispatch(UpdateProduct({list: response}));
              this.store.dispatch(hideLoading());

              // if (!user) {
              //   this.store.dispatch(showSnackBar({ message: 'Invalid email or password' }));
              // }
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