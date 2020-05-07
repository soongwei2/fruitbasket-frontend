import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleMainComponent } from './module-main.component';

const routes: Routes = [ 
  { path: '', component: ModuleMainComponent },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleMainRoutingModule { }
