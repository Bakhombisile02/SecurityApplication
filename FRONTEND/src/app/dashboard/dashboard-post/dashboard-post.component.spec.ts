import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPostComponent } from './dashboard-post.component';

describe('DashboardPostComponent', () => {
  let component: DashboardPostComponent;
  let fixture: ComponentFixture<DashboardPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPostComponent]
    });
    fixture = TestBed.createComponent(DashboardPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
