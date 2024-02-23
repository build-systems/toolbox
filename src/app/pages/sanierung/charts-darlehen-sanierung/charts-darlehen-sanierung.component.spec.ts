import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsDarlehenSanierungComponent } from './charts-darlehen-sanierung.component';

describe('ChartsDarlehenSanierungComponent', () => {
  let component: ChartsDarlehenSanierungComponent;
  let fixture: ComponentFixture<ChartsDarlehenSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsDarlehenSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsDarlehenSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
