import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RootState } from 'src/app/store';
import { User } from '../models/user';
import { selectUser } from 'src/app/store/user/user.reducer';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    user$: Observable<User> = this.store.select(selectUser.user);

    constructor(public store: Store<RootState>, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.user$.pipe(map((user) => {

            if (state.url == '/login') { //At login
                if (!user || !user.email)
                    return true;
                this.router.navigate(['/']);
            } else {
                if (user && user.email)
                    return true;
                this.router.navigate(['/login']);
            }
            return false;
        }),
            catchError((error) => {
                console.error("Auth Guard Service Error: ", error);
                return of(false);
            }))
    }



}