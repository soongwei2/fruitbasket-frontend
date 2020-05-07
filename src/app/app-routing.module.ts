import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/services/AuthGuardService';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./module-auth/module-auth.module').then(m => m.ModuleAuthModule),
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./module-main/module-main.module').then(m => m.ModuleMainModule),
    canActivate: [AuthGuardService],
  },
 
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
