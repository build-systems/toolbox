import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAnnuitaetenComponent } from './chart-annuitaeten.component';

describe('ChartAnnuitaetenComponent', () => {
  let component: ChartAnnuitaetenComponent;
  let fixture: ComponentFixture<ChartAnnuitaetenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartAnnuitaetenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartAnnuitaetenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
