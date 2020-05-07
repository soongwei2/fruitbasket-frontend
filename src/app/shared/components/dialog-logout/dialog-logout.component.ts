import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { UpdateUser } from 'src/app/store/user/user.action';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogLogoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<RootState>) {}

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close();
  }

  onLogout(){
    this.store.dispatch(UpdateUser({user: {email: null}}));
    this.dialogRef.close();
  }
}
