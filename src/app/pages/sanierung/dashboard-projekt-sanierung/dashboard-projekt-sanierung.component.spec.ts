import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProjektSanierungComponent } from './dashboard-projekt-sanierung.component';

describe('DashboardProjektSanierungComponent', () => {
  let component: DashboardProjektSanierungComponent;
  let fixture: ComponentFixture<DashboardProjektSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProjektSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProjektSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
