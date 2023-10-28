import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../@service/common.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  form: FormGroup;
  selectedDistrictId: number = 0;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService) {
    this.form = this.formBuilder.group({
      product: [''],
      shop: [''],
      category: [''],
      district: [''],
      subDistrict: ['']
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.form.valid) {
      // Form submission logic
      console.log(this.form.value);
      console.log('checkLogin', this.commonService.checkLogin());
      // console.log(this.commonService.me());
    } else {
      // Handle invalid form
    }
  }

  onDistrictSelected(districtId: number) {
    this.selectedDistrictId = districtId;
    this.form.controls['subDistrict'].setValue(''); // Reset the sub-district value
  }

}