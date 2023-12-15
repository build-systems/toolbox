import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGkostenM2Component } from './chart-gkosten-m2.component';

describe('ChartGkostenM2Component', () => {
  let component: ChartGkostenM2Component;
  let fixture: ComponentFixture<ChartGkostenM2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGkostenM2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartGkostenM2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
