import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/@service/common.service';

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

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private httpClient: HttpClient) {
    this.form = this.formBuilder.group({
      product: ['', Validators.required],
      shopName: ['', Validators.required],
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
    // this.callParent.emit({ title: title, description: description, obj: obj });
    this.commonService.triggerOpenMsgBoxEvent(title, description, obj);
  }

  onSubmit() {
    const formData = this.form.value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient.post<any>('http://127.0.0.1:8000/api/reports', JSON.stringify(formData), { headers })
      .subscribe(data => {
        console.log('Report created successfully:', data);
        // Handle the success response
      }, error => {
        console.error('Error creating report:', error);
        // Handle the error response
      });

  }

}
