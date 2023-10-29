import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://127.0.0.1:8000/api/login', loginData).subscribe(
      (response) => {
        console.log(response);
        const accessToken = response.data.access_token;

        console.log(response.data.user.email_verified_at);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('islogin', "1");
        localStorage.setItem('userName', response.data.user.name);
        if (response.data.user.email_verified_at == null) {
          const queryParams: NavigationExtras = {
            queryParams: {
              token: 0
            }
          };
          this.router.navigate(['/email-verification'], queryParams);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Login error', error);
        alert(`Login error ${{ error }}`);
      }
    );
  }

}