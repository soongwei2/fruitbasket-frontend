import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { RootState } from '../store';
import { createUser, loginUser } from '../store/user/user.action';
import { selectUser } from '../store/user/user.reducer';

@Component({
  selector: 'app-module-auth',
  templateUrl: './module-auth.component.html',
  styleUrls: ['./module-auth.component.scss']
})
export class ModuleAuthComponent implements OnInit {

  user$: Observable<User> = this.store.select(selectUser.user);


  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private store: Store<RootState>,
    private router: Router, ) { }

  ngOnInit(): void {
  }

  onSubmit($event: any) {
    if (this.form.valid) {
      this.form.value
      const user: User = {
        ...this.form.value
      }

      switch ($event.submitter.id) {
        case "login":
          this.store.dispatch(loginUser({ user }));
          break;
        case "create":
          this.store.dispatch(createUser({ user }));
          break;
      }

    }
  }

}
