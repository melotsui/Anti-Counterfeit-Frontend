import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../@service/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  form: FormGroup;
  selectedDistrictId: number = 0;
  reports: any[] = [];

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private http: HttpClient) {
    this.form = this.formBuilder.group({
      product: [''],
      shop: [''],
      category_id: [''],
      district_id: [''],
      sub_district_id: ['']
    });
  }

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    if (this.form.valid) {
      // Form submission logic
      console.log(this.form.value);
      console.log('checkLogin', this.commonService.checkLogin());
      const requestBody = {
        product: this.form.value.product,
        shop: this.form.value.shop,
        category_id: this.form.value.category_id,
        district_id: this.form.value.district_id,
        sub_district_id: this.form.value.sub_district_id
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post<any>('http://127.0.0.1:8000/api/reports/search', requestBody, { headers }).subscribe(
        (response) => {
          console.log(response);
          this.reports = response.data.reports;
        },
        (error) => {
          console.error('Login error', error);
        }
      );

    } else {
      // Handle invalid form
    }
  }

  reset(){
    this.form.reset();
    this.onSubmit();
  }

  onDistrictSelected(district_id: number) {
    this.selectedDistrictId = district_id;
    this.form.controls['sub_district_id'].setValue(''); // Reset the sub-district value
  }

}