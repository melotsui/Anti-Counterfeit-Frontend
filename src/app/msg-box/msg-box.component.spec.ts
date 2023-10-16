import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgBoxComponent } from './msg-box.component';

describe('MsgBoxComponent', () => {
  let component: MsgBoxComponent;
  let fixture: ComponentFixture<MsgBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsgBoxComponent]
    });
    fixture = TestBed.createComponent(MsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
