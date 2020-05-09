import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';

@Component({
  templateUrl: './dialog-generate-coupon.component.html',
  styleUrls: ['./dialog-generate-coupon.component.scss']
})
export class DialogGenerateCouponComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogGenerateCouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<RootState>) { }

  ngOnInit(): void {
  }
  onOk() {
    this.dialogRef.close();
  }
}
