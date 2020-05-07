import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddCouponCode, VerifyCouponCode } from 'src/app/store/basket/basket.action';
import { selectBasket } from 'src/app/store/basket/basket.reducer';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

  form: FormGroup = new FormGroup({
    couponCode: new FormControl(null, [Validators.required]),
  });

  couponCode$ = this.store.select(selectBasket.couponCode);
  couponCode$$: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddCouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<RootState>) { }

  ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe(result => {
      if(this.couponCode$$) this.couponCode$$.unsubscribe();
    });
  }

  onCancel() {
    this.dialogRef.close();
    
  }

  onSubmit(event) {
    if(this.couponCode$$) this.couponCode$$.unsubscribe();
    this.couponCode$$ =  this.couponCode$.subscribe((couponCode) => {
      if(couponCode){
        this.dialogRef.close();
      }
    })

    const form = {...this.form.value};
    // this.dialogRef.close();
    this.store.dispatch(VerifyCouponCode({code: form.couponCode}));


  }

}
