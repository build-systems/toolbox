import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDarlehenSanierungComponent } from './dashboard-darlehen-sanierung.component';

describe('DashboardDarlehenSanierungComponent', () => {
  let component: DashboardDarlehenSanierungComponent;
  let fixture: ComponentFixture<DashboardDarlehenSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDarlehenSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDarlehenSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
