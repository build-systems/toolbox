import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGkostenM2NeubauComponent } from './chart-gkosten-m2-neubau.component';

describe('ChartGkostenM2NeubauComponent', () => {
  let component: ChartGkostenM2NeubauComponent;
  let fixture: ComponentFixture<ChartGkostenM2NeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGkostenM2NeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartGkostenM2NeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
