import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentregisterComponent } from './agentregister.component';

describe('AgentregisterComponent', () => {
  let component: AgentregisterComponent;
  let fixture: ComponentFixture<AgentregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentregisterComponent]
    });
    fixture = TestBed.createComponent(AgentregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
