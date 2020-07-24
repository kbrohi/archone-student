import { AuthenticationService } from './services/authentication.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import {  ImportPopupComponent} from "./import-popup/import-popup.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthenticationService] },
  { path: 'login', component: LogInComponent },
  {path:'importPopup',component:ImportPopupComponent,canActivate: [AuthenticationService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
