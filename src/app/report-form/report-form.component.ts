import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef  } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef, private router: Router, private formBuilder: FormBuilder, private commonService: CommonService, private httpClient: HttpClient) {
    this.form = this.formBuilder.group({
      product: ['', Validators.required],
      shop: ['', Validators.required],
      category: [''],
      district: [''],
      subDistrict: [''],
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
    this.form.controls['subDistrict'].setValue(''); // Reset the sub-district value
  }

  ngOnInit() {
    console.log(this.commonService.refreshToken());
  }

  onFileChange(event: any) {
    const files: File[] = event.target.files;

    for (let file of files) {
      if (this.images.length < 5) {
        this.images.push(file);
      }
    }

    this.form.get('fileUpload')?.setValue('');
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  getImageUrl(image: File): string {
    return URL.createObjectURL(image);
  }

  openMsgBox(title: string, description: string, obj: any | null = null) {
    const formData = this.form.value;
    // this.commonService.triggerOpenMsgBoxEvent(title, description, formData);
  }

  onSubmit() {
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
    // this.httpClient.post<any>('http://127.0.0.1:8000/api/reports', JSON.stringify(formData), { headers })
    //   .subscribe(data => {
    //     if (data.code == 200) {
    //       console.log('Report created successfully:', data);

    //     } else {
    //       console.error('Error creating report:', data.message);
    //       alert(data.message);
    //     }
    //     // Handle the success response
    //   }, error => {
    //     console.error('Error creating report:', error);
    //     alert(error.message);
    //   });
    console.log(this.images);
    this.images.forEach((image) => {
      this.uploadImage(image);
    });
  }

  uploadImage(image: File) {
    return new Observable((observer) => {
      const formData = new FormData();
      formData.append('report_id', '1');
      formData.append('file', image);
  
      const uploadUrl = 'http://127.0.0.1:8000/api/reports/uploadFile';
  
      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);
  
      xhr.upload.addEventListener('progress', (event: ProgressEvent) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          // You can emit progress updates if needed
          // observer.next(progress);
        }
      });
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          // Upload successful
          const response = xhr.response;
          observer.next(response);
          observer.complete();
        } else {
          // Upload failed
          observer.error('Image upload failed.');
        }
      };
  
      xhr.onerror = () => {
        // Upload error
        observer.error('Image upload failed.');
      };
  
      xhr.send(formData);
    });
  }
  
  
}
