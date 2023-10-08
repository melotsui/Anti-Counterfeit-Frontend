import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportHistoryComponent } from './report-history/report-history.component';
import { ReportFormComponent } from './report-form/report-form.component';

const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: IndexComponent },
  { path: 'report-form', component: ReportFormComponent },
  { path: 'report-history', component: ReportHistoryComponent },
  
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
