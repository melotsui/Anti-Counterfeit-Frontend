import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { CarouselModalComponent } from './carousel-modal/carousel-modal.component';
import { DdlCategoryComponent } from './shared/ddl-category/ddl-category.component';
import { DdlDistrictComponent } from './shared/ddl-district/ddl-district.component';
import { DdlSubDistrictComponent } from './shared/ddl-sub-district/ddl-sub-district.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

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
    ReportHistoryComponent,
    MsgBoxComponent,
    EmailVerificationComponent,
    ResetPasswordComponent,
    ReportDetailComponent,
    CarouselModalComponent,
    DdlCategoryComponent,
    DdlDistrictComponent,
    DdlSubDistrictComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatButtonModule, 
    MatDialogModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
