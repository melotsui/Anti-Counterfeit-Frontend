import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface SubDistrict {
  sub_district_id: number;
  sub_district_name: string;
  district_id: number;
}

@Component({
  selector: 'app-ddl-sub-district',
  templateUrl: './ddl-sub-district.component.html',
  styleUrls: ['./ddl-sub-district.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdlSubDistrictComponent),
      multi: true
    }
  ]
})
export class DdlSubDistrictComponent implements ControlValueAccessor, OnInit {
  selectedValue: string = '';
  subDistricts: SubDistrict[] = [];
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSubDistricts();
  }

  fetchSubDistricts() {
    this.http.get<any>('http://127.0.0.1:8000/api/sub-districts')
      .subscribe(data => {
        this.subDistricts = data.data.sub_districts;
      });
  }

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement this method if needed
  }

  handleSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.updateValue(value);
  }

  updateValue(value: string) {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
  }
}