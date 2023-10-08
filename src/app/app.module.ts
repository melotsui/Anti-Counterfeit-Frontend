import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportHistoryComponent } from './report-history/report-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    FooterComponent,
    IndexComponent,
    NotFoundComponent,
    ReportFormComponent,
    ReportHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
