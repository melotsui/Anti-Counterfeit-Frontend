import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(value: any){
    if (this.form.invalid) {
      return;
    }

    const apiUrl = 'http://127.0.0.1:8000/api/users/forgotPassword';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestBody = {
      email: value.email,
    };

    this.isLoading = true;
    this.http.post(apiUrl, requestBody, { headers }).subscribe(
      (response: any) => {
        console.log('forgotPassword', response);
        const queryParams: NavigationExtras = {
          queryParams: {
            token: 0
          }
        };
        this.router.navigate(['/email-verification'], queryParams);
      },
      (error) => {
        // Handle error
        this.isLoading = false;
        console.error('Forgot Password failed', error);
        // Additional error handling if needed
      }
    );
  }

}
