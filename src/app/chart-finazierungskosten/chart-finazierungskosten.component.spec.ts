import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFinazierungskostenComponent } from './chart-finazierungskosten.component';

describe('ChartFinazierungskostenComponent', () => {
  let component: ChartFinazierungskostenComponent;
  let fixture: ComponentFixture<ChartFinazierungskostenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartFinazierungskostenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartFinazierungskostenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
