import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAnnuitaetenNeubauComponent } from './chart-annuitaeten-neubau.component';

describe('ChartAnnuitaetenNeubauComponent', () => {
  let component: ChartAnnuitaetenNeubauComponent;
  let fixture: ComponentFixture<ChartAnnuitaetenNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartAnnuitaetenNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartAnnuitaetenNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
