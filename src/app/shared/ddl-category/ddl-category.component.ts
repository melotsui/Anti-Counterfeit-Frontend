import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Category {
  category_id: number;
  category_name: string;
}

@Component({
  selector: 'app-ddl-category',
  templateUrl: './ddl-category.component.html',
  styleUrls: ['./ddl-category.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdlCategoryComponent),
      multi: true
    }
  ]
})
export class DdlCategoryComponent implements ControlValueAccessor, OnInit {
  selectedCategory: string = '';
  categories: Category[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  @Input() inputValue: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    console.log('inputValue', this.inputValue);
    this.fetchCategories();
  }

  fetchCategories() {
    this.httpClient.get<any>('http://127.0.0.1:8000/api/categories').subscribe(
      (response) => {
        if (response.code === 200) {
          console.log('response', response);
          console.log('inputValue', this.inputValue);
          this.categories = response.data.categories;
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
    this.selectedCategory = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedCategory = value;
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
