import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFinanzierungskostenNeubauComponent } from './chart-finanzierungskosten-neubau.component';

describe('ChartFinanzierungskostenNeubauComponent', () => {
  let component: ChartFinanzierungskostenNeubauComponent;
  let fixture: ComponentFixture<ChartFinanzierungskostenNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartFinanzierungskostenNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartFinanzierungskostenNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
