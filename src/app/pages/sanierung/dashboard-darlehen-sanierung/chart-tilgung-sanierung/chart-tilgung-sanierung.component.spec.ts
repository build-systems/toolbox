import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTilgungSanierungComponent } from './chart-tilgung-sanierung.component';

describe('ChartTilgungSanierungComponent', () => {
  let component: ChartTilgungSanierungComponent;
  let fixture: ComponentFixture<ChartTilgungSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTilgungSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartTilgungSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
