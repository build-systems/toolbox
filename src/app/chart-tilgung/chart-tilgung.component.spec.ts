import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTilgungComponent } from './chart-tilgung.component';

describe('ChartTilgungComponent', () => {
  let component: ChartTilgungComponent;
  let fixture: ComponentFixture<ChartTilgungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTilgungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartTilgungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
