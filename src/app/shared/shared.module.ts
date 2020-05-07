import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogLogoutComponent } from './components/dialog-logout/dialog-logout.component';
import { BackButtonDirective } from './components/back-button/back-button.directive';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogPaymentComponent } from './components/dialog-payment/dialog-payment.component';
import { CommonModule } from '@angular/common';
import { DialogPaymentService } from './components/dialog-payment/dialog-payment.service';

const modules = [
  MatButtonModule,
  MatDialogModule,
  FormsModule,
  MatInputModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    DialogLogoutComponent,
    BackButtonDirective,
    AddCouponComponent,
    DialogPaymentComponent,
  ],
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: [
    ...modules,
    DialogLogoutComponent,
    AddCouponComponent,
    BackButtonDirective,
  ],
  entryComponents: [
    DialogLogoutComponent,
    AddCouponComponent,
  ],
  providers: []
})
export class SharedModule { }
