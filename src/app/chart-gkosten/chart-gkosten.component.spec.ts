import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGkostenComponent } from './chart-gkosten.component';

describe('ChartGkostenComponent', () => {
  let component: ChartGkostenComponent;
  let fixture: ComponentFixture<ChartGkostenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGkostenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartGkostenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
