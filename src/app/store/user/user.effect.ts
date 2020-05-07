import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { get } from 'lodash';
import { throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { RootState, clearState } from '..';
import { hideLoading, showLoading, showSnackBar, clearStore } from '../layout/layout.action';
import { loginUser, UpdateUser, createUser } from './user.action';

@Injectable()
export class UserEffects {
  constructor(
    private http: HttpClient,
    private actions: Actions,
    private store: Store<RootState>,
    private router: Router,
  ) { }

  read$ = createEffect(() => this.actions.pipe(
    ofType(loginUser),
    tap(() => this.store.dispatch(showLoading())),
    mergeMap(
      (action) =>
        this.http.post(environment.servicePath + "/user", action.user)
          .pipe(
            map((response: User[]) => {
              const user: User = get(response, '[0]');
              this.store.dispatch(UpdateUser({ user }));
              this.store.dispatch(hideLoading());

              if (!user) {
                this.store.dispatch(showSnackBar({ message: 'Invalid email or password' }));
              }
            }),
            catchError((error) => {
              this.store.dispatch(hideLoading());
              this.store.dispatch(showSnackBar({ message: error.message }));
              return throwError(error);
            })
          )
    ),
  ), { dispatch: false })

  create$ = createEffect(() => this.actions.pipe(
    ofType(createUser),
    tap(() => this.store.dispatch(showLoading())),
    mergeMap(
      (action) =>
        this.http.put(environment.servicePath + "/user", action.user)
          .pipe(
            map((response: any) => {

              this.store.dispatch(hideLoading());
              this.store.dispatch(showSnackBar({ message: 'Account created' }));
            }),
            catchError((error) => {
              this.store.dispatch(hideLoading());

              if(error.error && error.error.message){
                this.store.dispatch(showSnackBar({ message: error.error.message }));
              }else{
                this.store.dispatch(showSnackBar({ message: error.message }));
              }
              
              return throwError(error);
            })
          )
    ),
  ), { dispatch: false })

  updateUser$ = createEffect(() => this.actions.pipe(
    ofType(UpdateUser),
    tap((action) => {
      if (action.user && action.user.id) {
        this.router.navigate(['/']);
      }else{
        this.store.dispatch(clearStore());
        this.router.navigate(['/login']);
      }
    }),
  ), { dispatch: false })

}