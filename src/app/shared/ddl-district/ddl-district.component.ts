import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface District {
  district_id: number;
  district_name: string;
}

@Component({
  selector: 'app-ddl-district',
  templateUrl: './ddl-district.component.html',
  styleUrls: ['./ddl-district.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdlDistrictComponent),
      multi: true
    }
  ]
})
export class DdlDistrictComponent implements ControlValueAccessor, OnInit {
  districts: District[] = [];
  selectedDistrict: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchDistricts();
  }

  fetchDistricts() {
    this.httpClient.get<any>('http://127.0.0.1:8000/api/districts').subscribe(
      (response) => {
        if (response.code === 200) {
          this.districts = response.data.districts;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.updateValue(value);
  }

  updateValue(value: string) {
    this.selectedDistrict = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedDistrict = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Optional: Implement this method if you need to disable the component dynamically
  }
}