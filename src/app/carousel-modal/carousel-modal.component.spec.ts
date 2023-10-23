import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselModalComponent } from './carousel-modal.component';

describe('CarouselModalComponent', () => {
  let component: CarouselModalComponent;
  let fixture: ComponentFixture<CarouselModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselModalComponent]
    });
    fixture = TestBed.createComponent(CarouselModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
