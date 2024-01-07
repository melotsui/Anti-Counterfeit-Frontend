import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  status: string = 'Verifying...';
  done: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const accessToken = params['token'];
      if (accessToken == null) {
        this.router.navigate(['/not-found']);
      }
      console.log('accessToken', accessToken); // You can use the token value as per your requirement
      if (accessToken != '0') {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`
        });
        this.http.post<any>('http://127.0.0.1:8000/api/users/verifyEmail', null, { headers }).subscribe(
          (response) => {
            console.log(response);
            // const accessToken = response.data.access_token;
            this.status = 'Success';
            this.done = true;
            // localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('islogin', "1");
          },
          (error) => {
            localStorage.setItem('islogin', "0");
            // this.router.navigate(['/login']);
            console.error('Login error', error);
          }
        );
      } else {
        this.status = 'Please check your email.';
        this.done = false;
      }
    });
  }

}
