import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAnnuitaetenSanierungComponent } from '../chart-annuitaeten-sanierung/chart-annuitaeten-sanierung.component';

describe('ChartAnnuitaetenSanierungComponent', () => {
  let component: ChartAnnuitaetenSanierungComponent;
  let fixture: ComponentFixture<ChartAnnuitaetenSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartAnnuitaetenSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartAnnuitaetenSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
