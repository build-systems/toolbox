import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGkostenM2SanierungComponent } from './chart-gkosten-m2-sanierung.component';

describe('ChartGkostenM2SanierungComponent', () => {
  let component: ChartGkostenM2SanierungComponent;
  let fixture: ComponentFixture<ChartGkostenM2SanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGkostenM2SanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartGkostenM2SanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
