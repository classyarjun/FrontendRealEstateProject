import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentListedComponent } from './recent-listed.component';

describe('RecentListedComponent', () => {
  let component: RecentListedComponent;
  let fixture: ComponentFixture<RecentListedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentListedComponent]
    });
    fixture = TestBed.createComponent(RecentListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
