import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogPaymentComponent } from './dialog-payment.component';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DialogPaymentService {

  dialogRef: MatDialogRef<DialogPaymentComponent>;

  constructor(private dialog: MatDialog) { }


  public open(data: any) {
    this.dialogRef = this.dialog.open(DialogPaymentComponent, {
      minWidth: '400px',
      data
    });
  }

  public close(){
    this.dialogRef.close();
  }
}
