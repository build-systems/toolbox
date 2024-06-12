import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEinzelmassnahmenComponent } from './chart-einzelmassnahmen.component';

describe('ChartEinzelmassnahmenComponent', () => {
  let component: ChartEinzelmassnahmenComponent;
  let fixture: ComponentFixture<ChartEinzelmassnahmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartEinzelmassnahmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartEinzelmassnahmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
