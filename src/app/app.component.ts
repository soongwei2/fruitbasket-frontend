import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from './store';
import { selectLayout } from './store/layout/layout.reducer';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  isLoading$: Observable<boolean> = this.store.select(selectLayout.isLoading).pipe(delay(0));

  constructor(
    private store: Store<RootState>,
    private router: Router,

  ) { }
  ngOnInit(): void {

  }

}


