import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdlDistrictComponent } from './ddl-district.component';

describe('DdlDistrictComponent', () => {
  let component: DdlDistrictComponent;
  let fixture: ComponentFixture<DdlDistrictComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DdlDistrictComponent]
    });
    fixture = TestBed.createComponent(DdlDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
