import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModuleMainRoutingModule } from './module-main-routing.module';
import { ModuleMainComponent } from './module-main.component';
import { ProductComponent } from './product/product.component';
import { MatCardModule } from '@angular/material/card';
import { DialogPaymentService } from '../shared/components/dialog-payment/dialog-payment.service';
import { MatDividerModule } from '@angular/material/divider';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatBadgeModule,
  MatCardModule,
  // ProductModule,
  MatDividerModule
];

@NgModule({
  declarations: [ModuleMainComponent, ProductComponent],
  imports: [
    CommonModule,
    ModuleMainRoutingModule,
    ...modules,
  ],
  exports: [...modules, ProductComponent],
  providers: [],
})
export class ModuleMainModule { }
