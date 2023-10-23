import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdlSubDistrictComponent } from './ddl-sub-district.component';

describe('DdlSubDistrictComponent', () => {
  let component: DdlSubDistrictComponent;
  let fixture: ComponentFixture<DdlSubDistrictComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DdlSubDistrictComponent]
    });
    fixture = TestBed.createComponent(DdlSubDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
