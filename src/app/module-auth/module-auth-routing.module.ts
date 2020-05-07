import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleAuthComponent } from './module-auth.component';

const routes: Routes = [{ path: '', component: ModuleAuthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAuthRoutingModule { }
