import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import packagejson from "../../package.json";
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module.js';
import { metaReducers, rootEffects, rootReducer } from './store';
import { DialogPaymentService } from './shared/components/dialog-payment/dialog-payment.service.js';

const modules = [
  SharedModule
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer, {
      metaReducers, runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    EffectsModule.forRoot(rootEffects),
    StoreDevtoolsModule.instrument({
      name: packagejson.name,
      maxAge: 25, logOnly:
        environment.production
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    ...modules,
  ],
  exports: [
    ...modules,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
