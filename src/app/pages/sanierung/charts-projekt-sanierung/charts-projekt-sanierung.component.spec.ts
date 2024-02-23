import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsProjektSanierungComponent } from './charts-projekt-sanierung.component';

describe('ChartsProjektSanierungComponent', () => {
  let component: ChartsProjektSanierungComponent;
  let fixture: ComponentFixture<ChartsProjektSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsProjektSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsProjektSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
