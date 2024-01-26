import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProjektNeubauComponent } from './dashboard-projekt-neubau.component';

describe('DashboardProjektNeubauComponent', () => {
  let component: DashboardProjektNeubauComponent;
  let fixture: ComponentFixture<DashboardProjektNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProjektNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProjektNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
