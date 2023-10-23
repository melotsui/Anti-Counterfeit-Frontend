import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      product: [''],
      shopName: [''],
      category: [''],
      district: [''],
      subDistrict: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      // Form submission logic
      console.log(this.form.value);
    } else {
      // Handle invalid form
    }
  }
}