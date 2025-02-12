import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMapsComponent } from './side-maps.component';

describe('SideMapsComponent', () => {
  let component: SideMapsComponent;
  let fixture: ComponentFixture<SideMapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideMapsComponent]
    });
    fixture = TestBed.createComponent(SideMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
