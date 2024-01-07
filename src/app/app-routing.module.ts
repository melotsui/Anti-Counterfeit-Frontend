import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportHistoryComponent } from './report-history/report-history.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: '', component: IndexComponent },
  { path: 'report-form', component: ReportFormComponent },
  { path: 'report-detail', component: ReportDetailComponent },
  { path: 'report-history', component: ReportHistoryComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
