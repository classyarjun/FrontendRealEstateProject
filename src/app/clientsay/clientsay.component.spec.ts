import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsayComponent } from './clientsay.component';

describe('ClientsayComponent', () => {
  let component: ClientsayComponent;
  let fixture: ComponentFixture<ClientsayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsayComponent]
    });
    fixture = TestBed.createComponent(ClientsayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
