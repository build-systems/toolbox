import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRepaymentComponent } from './chart-repayment.component';

describe('ChartRepaymentComponent', () => {
  let component: ChartRepaymentComponent;
  let fixture: ComponentFixture<ChartRepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartRepaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
