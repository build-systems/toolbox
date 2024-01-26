import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDarlehenNeubauComponent } from './dashboard-darlehen-neubau.component';

describe('DashboardDarlehenNeubauComponent', () => {
  let component: DashboardDarlehenNeubauComponent;
  let fixture: ComponentFixture<DashboardDarlehenNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDarlehenNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDarlehenNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
