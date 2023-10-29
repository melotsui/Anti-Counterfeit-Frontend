import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../@service/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouteConfigLoadEnd, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  selectedDistrictId: number = 0;
  reports: any[] = [];
  category_id: number = 0;
  district_id: number = 0;
  sub_district_id: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private commonService: CommonService, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      // this.form.get('product')?.setValue(params['product']);
      // this.form.get('shop')?.setValue(params['shop']);
      this.category_id = params['category_id'];
      this.district_id = params['district_id'];
      this.sub_district_id = params['sub_district_id'];
      // this.form.get('category_id')?.setValue(this.category_id);
      // this.form.get('district_id')?.setValue(this.district_id);
      // this.form.get('sub_district_id')?.setValue(this.sub_district_id);
      this.form = this.formBuilder.group({
        product: [params['product']],
        shop: [params['shop']],
        category_id: [this.category_id],
        district_id: [this.district_id],
        sub_district_id: [this.sub_district_id]
      });
      if (this.district_id > 0)
        this.onDistrictSelected(this.district_id);
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

  reset() {
    this.router.navigate(['/']);
  }

  onDistrictSelected(district_id: number) {
    this.selectedDistrictId = district_id;
    this.form.controls['sub_district_id'].setValue(''); // Reset the sub-district value
  }


}