import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAgentComponent } from './property-agent.component';

describe('PropertyAgentComponent', () => {
  let component: PropertyAgentComponent;
  let fixture: ComponentFixture<PropertyAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyAgentComponent]
    });
    fixture = TestBed.createComponent(PropertyAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
