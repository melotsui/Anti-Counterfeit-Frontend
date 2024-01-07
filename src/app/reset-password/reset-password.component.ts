import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  user_id: string = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.form = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['id'];
      if (this.user_id == null) {
        this.router.navigate(['/not-found']);
      }
    });
  }

  onSubmit(value: any) {
    if (this.form.invalid) {
      return;
    }
    if(value.newPassword != value.confirmPassword){
      alert('Passwords do not match');
      return;
    }
    const apiUrl = 'http://127.0.0.1:8000/api/users/resetPassword';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestBody = {
      user_id: this.user_id,
      password: value.newPassword,
    };
    console.log('requestBody', JSON.stringify(requestBody));

    this.isLoading = true;
    this.http.post(apiUrl, JSON.stringify(requestBody), { headers }).subscribe(
      (response: any) => {
        if(response.code == 200){
          console.log('resetPassword', response);
          localStorage.setItem('accessToken', response.data.access_token);
          localStorage.setItem('islogin', "1");
          localStorage.setItem('userName', response.data.user.name);
          localStorage.setItem('userID', response.data.user.user_id);
          this.router.navigate(['/']);
        }
        else {
          console.log('Error', response);
        }
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
