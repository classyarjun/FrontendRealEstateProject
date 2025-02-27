import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePropertyComponent } from './feature-property.component';

describe('FeaturePropertyComponent', () => {
  let component: FeaturePropertyComponent;
  let fixture: ComponentFixture<FeaturePropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturePropertyComponent]
    });
    fixture = TestBed.createComponent(FeaturePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
