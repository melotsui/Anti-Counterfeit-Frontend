import { Component, OnInit, Input, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/@service/common.service';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxComponent {
  dialogRef: MatDialogRef<MsgBoxComponent>;
  data: any;

  constructor(dialogRef: MatDialogRef<MsgBoxComponent>, private router: Router, @Inject(MAT_DIALOG_DATA) data: any, private httpClient: HttpClient) {
    this.dialogRef = dialogRef;
    this.data = data;
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.data.obj.action == "create_report") {
      this.createReport(this.data.obj);
    } else if (this.data.obj.action == "delete_report"){

    }
  }

  uploadImage(image: File, report_id: number) {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    const url = 'http://127.0.0.1:8000/api/reports/uploadFile';
    const formData = new FormData();
    formData.append('report_id', `${report_id}`);
    formData.append('media', image);

    return this.httpClient.post(url, formData, { headers });
  }

  createReport(obj: any) {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    console.warn('obj', obj);
    this.httpClient.post<any>('http://127.0.0.1:8000/api/reports', JSON.stringify(obj.formdata), { headers })
      .subscribe(response => {
        if (response.code == 200) {
          var report_id = 0;
          obj.images.forEach((image: File) => {
            report_id = response.data.report.report_id;
            this.uploadImage(image, report_id).subscribe(
              (response) => {
                console.log('Image upload successful:', response);
                this.close();
                const queryParams: NavigationExtras = {
                  queryParams: {
                    report_id: report_id
                  }
                };
                this.router.navigate(['/report-detail'], queryParams);
              },
              (error) => {
                console.error('Image upload failed:', error);
              }
            );
          });
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
    console.log(obj.images);

  }
}
