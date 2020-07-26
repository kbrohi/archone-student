import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportPopupComponent } from './import-popup/import-popup.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from "@angular/forms"
import {from} from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './store/effects/students.effects';
import { ImportResponseComponent } from './import-response/import-response.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashboardComponent,
    ImportPopupComponent,
    HeaderComponent,
    ImportResponseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([StudentsEffects])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
