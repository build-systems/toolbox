import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInstallmentComponent } from './chart-installment.component';

describe('ChartInstallmentComponent', () => {
  let component: ChartInstallmentComponent;
  let fixture: ComponentFixture<ChartInstallmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartInstallmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
