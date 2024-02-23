import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFinanzierungskostenSanierungComponent } from './chart-finanzierungskosten-sanierung.component';

describe('ChartFinanzierungskostenSanierungComponent', () => {
  let component: ChartFinanzierungskostenSanierungComponent;
  let fixture: ComponentFixture<ChartFinanzierungskostenSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartFinanzierungskostenSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartFinanzierungskostenSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
