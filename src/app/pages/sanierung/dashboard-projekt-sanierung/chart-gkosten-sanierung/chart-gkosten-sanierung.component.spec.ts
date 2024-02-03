import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGkostenSanierungComponent } from './chart-gkosten-sanierung.component';

describe('ChartGkostenSanierungComponent', () => {
  let component: ChartGkostenSanierungComponent;
  let fixture: ComponentFixture<ChartGkostenSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGkostenSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartGkostenSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
