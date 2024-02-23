import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsProjektNeubauComponent } from './charts-projekt-neubau.component';

describe('ChartsProjektNeubauComponent', () => {
  let component: ChartsProjektNeubauComponent;
  let fixture: ComponentFixture<ChartsProjektNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsProjektNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsProjektNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
