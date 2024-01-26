import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEinheitskostenSanierungComponent } from './chart-einheitskosten-sanierung.component';

describe('ChartEinheitskostenSanierungComponent', () => {
  let component: ChartEinheitskostenSanierungComponent;
  let fixture: ComponentFixture<ChartEinheitskostenSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartEinheitskostenSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartEinheitskostenSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
