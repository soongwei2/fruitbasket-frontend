import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGenerateCouponComponent } from './dialog-generate-coupon.component';

describe('DialogGenerateCouponComponent', () => {
  let component: DialogGenerateCouponComponent;
  let fixture: ComponentFixture<DialogGenerateCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGenerateCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGenerateCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
