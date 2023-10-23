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

  constructor(private formBuilder: FormBuilder, private commonService: CommonService) {
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
    /*
    // Handle form submission
    const formData = new FormData();

    // Append form data
    formData.append('product', this.form.get('product')?.value);
    formData.append('shopName', this.form.get('shopName')?.value);
    // Append other form fields
    
    // Append images
    for (let image of this.images) {
      formData.append('images', image);
    }

    // Call API to upload images and submit the form data
    this.commonService.uploadImages(formData).subscribe(
      (response) => {
        // Handle success response
        console.log('Images uploaded successfully');
        // Submit the remaining form data to the backend
        this.submitFormDataToBackend();
      },
      (error) => {
        // Handle error response
        console.error('Error uploading images', error);
      }
    );
    */
  }

}
