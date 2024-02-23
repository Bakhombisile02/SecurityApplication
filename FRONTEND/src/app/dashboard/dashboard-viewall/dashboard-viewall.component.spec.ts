import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardViewallComponent } from './dashboard-viewall.component';

describe('DashboardViewallComponent', () => {
  let component: DashboardViewallComponent;
  let fixture: ComponentFixture<DashboardViewallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardViewallComponent]
    });
    fixture = TestBed.createComponent(DashboardViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
