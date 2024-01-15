import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGkostenNeubauComponent } from './chart-gkosten-neubau.component';

describe('ChartGkostenNeubauComponent', () => {
  let component: ChartGkostenNeubauComponent;
  let fixture: ComponentFixture<ChartGkostenNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGkostenNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartGkostenNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
