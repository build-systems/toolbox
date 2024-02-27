import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsDarlehenNeubauComponent } from './charts-darlehen-neubau.component';

describe('ChartsDarlehenNeubauComponent', () => {
  let component: ChartsDarlehenNeubauComponent;
  let fixture: ComponentFixture<ChartsDarlehenNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsDarlehenNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsDarlehenNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
