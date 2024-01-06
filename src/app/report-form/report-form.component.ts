import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/@service/common.service';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  @Output() callParent = new EventEmitter();
  form: FormGroup;
  images: File[] = [];
  selectedDistrictId: number = 0;
  isFileUploadDisabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private formBuilder: FormBuilder, private commonService: CommonService, private httpClient: HttpClient) {
    this.form = this.formBuilder.group({
      product: ['', Validators.required],
      shop: ['', Validators.required],
      category_id: [''],
      district_id: [''],
      sub_district_id: [''],
      date: [''],
      time: [''],
      address: [''],
      phone: [''],
      website: [''],
      fileUpload: [''],
      description: ['']
    });

  }

  onDistrictSelected(districtId: number) {
    this.selectedDistrictId = districtId;
    this.form.controls['sub_district_id'].setValue(''); // Reset the sub-district value
  }

  ngOnInit() {
    console.log(this.commonService.refreshToken());
  }



  onFileChange(event: any) {
    const files: File[] = event.target.files;

    for (let file of files) {
      if (this.images.length < 3) {
        this.images.push(file);
      }
      if (this.images.length >= 3) {
        this.isFileUploadDisabled = true;
      } else {
        this.isFileUploadDisabled = false;
      }
      console.warn('this.images.length', this.images.length)
    }
    // if (this.images.length < 3) {
    //   this.isFileUploadDisabled = true;
    // }
    this.form.get('fileUpload')?.setValue('');
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    if (this.images.length >= 3) {
      this.isFileUploadDisabled = true;
    } else {
      this.isFileUploadDisabled = false;
    }
  }

  getImageUrl(image: File): string {
    return URL.createObjectURL(image);
  }

  openMsgBox(title: string, description: string) {
    const formData = this.form.value;
    const obj = {
      action: "create_report",
      formdata: formData,
      images: this.images
    }
    this.commonService.triggerOpenMsgBoxEvent(title, description, obj);
  }

  onSubmit() {
    this.openMsgBox('Submit Report', 'Are you sure you want to create this report?');
    // this.commonService.me().subscribe(
    //   (response) => {
    //     console.log("me", response);
    //     if (response.data.code == 200) {
    //       const userInfo = response.data.data;
    //       // 在这里处理用户信息
    //     } else {
    //       // 处理错误响应
    //     }
    //   },
    //   (error) => {
    //     // 处理请求错误
    //   }
    // );

    // const accessToken = localStorage.getItem('accessToken');

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${accessToken}`,
    //   'Content-Type': 'application/json'
    // });

    // const formData = this.form.value;
    // console.warn('formData', formData);
    // this.httpClient.post<any>('http://127.0.0.1:8000/api/reports', JSON.stringify(formData), { headers })
    //   .subscribe(response => {
    //     if (response.code == 200) {
    //       alert(response.message);
    //       this.images.forEach((image) => {
    //         this.uploadImage(image, response.data.report.report_id).subscribe(
    //           (response) => {
    //             console.log('Image upload successful:', response);
    //           },
    //           (error) => {
    //             console.error('Image upload failed:', error);
    //           }
    //         );
    //       });
    //     } else if (response.code == 401) {
    //       this.router.navigate(['/login']);
    //     } else {
    //       console.error('Error creating report:', response.message);
    //       alert(response.message);
    //     }
    //     // Handle the success response
    //   }, error => {
    //     console.error('Error creating report:', error);
    //     alert(error.message);
    //   });
    // console.log(this.images);

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


}
