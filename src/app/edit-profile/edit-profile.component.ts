import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from '../@service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Output() callParent = new EventEmitter();
  user: any;
  form: FormGroup;

  constructor(private commonService: CommonService, private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadData();
    console.log(this.commonService.refreshToken());
  }

  loadData() {
    this.commonService.me().subscribe(
      (response) => {
        console.log("me", response);
        if (response.code == 200) {
          this.user = response.data;
          this.form.controls['name'].setValue(this.user.name);
          console.log('userInfo', this.user);
        } else {
          console.log('me', 'fail');
        }
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  onSubmit() {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
    console.log(JSON.stringify(this.form.value));
    this.httpClient.put<any>('http://127.0.0.1:8000/api/users/editProfile', JSON.stringify(this.form.value), { headers })
      .subscribe(response => {
        if (response.code == 200) {
          localStorage.setItem('userName', response.data.user.name);
          alert('Edit Successfully');
          this.router.navigate(['/']);
        } else if (response.code == 401) {
          this.router.navigate(['/login']);
        } else {
          console.error('Error creating report:', response.message);
          alert(response.message);
        }
        // Handle the success response
      }, error => {
        console.error('Error creating report:', error);
        alert(error.message);
      });

  }
}
