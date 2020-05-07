import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModuleAuthRoutingModule } from './module-auth-routing.module';
import { ModuleAuthComponent } from './module-auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  declarations: [ModuleAuthComponent],
  imports: [
    CommonModule,
    ModuleAuthRoutingModule,
    ReactiveFormsModule, 
    ...modules,
  ],
  exports: [
    ...modules,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class ModuleAuthModule { }
