import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFinanzierungskostenComponent } from './chart-finanzierungskosten.component';

describe('ChartFinanzierungskostenComponent', () => {
  let component: ChartFinanzierungskostenComponent;
  let fixture: ComponentFixture<ChartFinanzierungskostenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartFinanzierungskostenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartFinanzierungskostenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
