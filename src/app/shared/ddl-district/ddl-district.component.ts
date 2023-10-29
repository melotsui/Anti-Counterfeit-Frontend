import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
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
  selectedValue: string = '';
  @Output() districtSelected: EventEmitter<number> = new EventEmitter<number>();
  onChange: any = () => {};
  onTouched: any = () => {};
  @Input() inputValue: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDistricts();
  }

  fetchDistricts() {
    this.http.get<any>('http://127.0.0.1:8000/api/districts')
      .subscribe(data => {
        this.districts = data.data.districts;
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
    this.districtSelected.emit(parseInt(value)); // Emit the district ID
  }

  updateValue(value: string) {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
  }
}