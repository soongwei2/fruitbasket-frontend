import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { RootState } from '..';
import { showSnackBar } from '../layout/layout.action';

@Injectable()
export class LayoutEffects {
  constructor(
    private actions: Actions,
    private store: Store<RootState>,
    private snackBar: MatSnackBar,
  ) { }


  showSnackBar$ = createEffect(() => this.actions.pipe(
    ofType(showSnackBar),
    tap((action) => this.snackBar.open(action.message, null, {
      duration: 3000,
    }))
  ), { dispatch: false })

}