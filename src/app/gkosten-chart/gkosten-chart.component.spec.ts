import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GkostenChartComponent } from './gkosten-chart.component';

describe('GkostenChartComponent', () => {
  let component: GkostenChartComponent;
  let fixture: ComponentFixture<GkostenChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GkostenChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GkostenChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
