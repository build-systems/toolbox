import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEinheitskostenNeubauComponent } from './chart-einheitskosten-neubau.component';

describe('ChartEinheitskostenNeubauComponent', () => {
  let component: ChartEinheitskostenNeubauComponent;
  let fixture: ComponentFixture<ChartEinheitskostenNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartEinheitskostenNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartEinheitskostenNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
