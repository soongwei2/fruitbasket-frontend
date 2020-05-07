import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogLogoutComponent } from 'src/app/shared/components/dialog-logout/dialog-logout.component';
import { RootState } from 'src/app/store';
import { GetListInvoice } from 'src/app/store/invoice/invoice.action';
import { selectInvoice } from 'src/app/store/invoice/invoice.reducer';
import { UpdateUser } from 'src/app/store/user/user.action';
import { selectUser } from 'src/app/store/user/user.reducer';
import _ from 'lodash';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user$ = this.store.select(selectUser.user);
  invoice$ = this.store.select(selectInvoice.list);
  displayedColumns = ['name', 'unitPrice', 'quantity', 'totalPrice'];
  _ = _;

  constructor(
    private store: Store<RootState>,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.store.dispatch(GetListInvoice({ invoice: { userId: user.id } }));
    })

  }

  onLogout() {
    this.store.dispatch(UpdateUser({ user: { email: null } }));
  }

  logoutConfirm(): void {
    const dialogRef = this.dialog.open(DialogLogoutComponent, {
      width: '300px',
      data: {}
    });

  }

}
