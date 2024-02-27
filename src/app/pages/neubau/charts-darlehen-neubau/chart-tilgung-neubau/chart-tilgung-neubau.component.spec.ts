import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTilgungNeubauComponent } from './chart-tilgung-neubau.component';

describe('ChartTilgungNeubauComponent', () => {
  let component: ChartTilgungNeubauComponent;
  let fixture: ComponentFixture<ChartTilgungNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTilgungNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartTilgungNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
