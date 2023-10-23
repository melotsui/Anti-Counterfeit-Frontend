import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdlCategoryComponent } from './ddl-category.component';

describe('DdlCategoryComponent', () => {
  let component: DdlCategoryComponent;
  let fixture: ComponentFixture<DdlCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DdlCategoryComponent]
    });
    fixture = TestBed.createComponent(DdlCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
