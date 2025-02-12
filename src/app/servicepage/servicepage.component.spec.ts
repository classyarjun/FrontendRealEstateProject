import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicepageComponent } from './servicepage.component';

describe('ServicepageComponent', () => {
  let component: ServicepageComponent;
  let fixture: ComponentFixture<ServicepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicepageComponent]
    });
    fixture = TestBed.createComponent(ServicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
