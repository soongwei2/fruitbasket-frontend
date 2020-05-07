import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { countItems } from 'commons';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket';
import { RootState } from '../store';
import { selectBasket } from '../store/basket/basket.reducer';

@Component({
  selector: 'app-module-main',
  templateUrl: './module-main.component.html',
  styleUrls: ['./module-main.component.scss']
})
export class ModuleMainComponent implements OnInit {

  basketList$: Observable<IBasket[]> = this.store.select(selectBasket.list);
  countItems = countItems;

  constructor(
    private store: Store<RootState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  /*   onLogoutClicked(){
      console.log("lougout")
      this.store.dispatch(UpdateUser({user: {email: null}}));
    } */

}
