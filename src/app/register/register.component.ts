import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue])
    });
  }


  registerUser(formData: any) {
    console.log('formData', formData)
    if (this.registerForm.invalid) {
      return;
    }

    const apiUrl = 'http://127.0.0.1:8000/api/register';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestBody = {
      email: formData.email,
      name: formData.name,
      password: formData.password
    };

    console.log('Registering user', requestBody)
    this.isLoading = true;
    this.http.post(apiUrl, requestBody, { headers }).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
        alert('Registration successful');
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
        console.error('Registration failed', error);
        // Additional error handling if needed
      }
    );
  }
}
