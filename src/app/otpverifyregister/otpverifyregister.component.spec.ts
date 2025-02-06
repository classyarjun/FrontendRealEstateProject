import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverifyregisterComponent } from './otpverifyregister.component';

describe('OtpverifyregisterComponent', () => {
  let component: OtpverifyregisterComponent;
  let fixture: ComponentFixture<OtpverifyregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpverifyregisterComponent]
    });
    fixture = TestBed.createComponent(OtpverifyregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
