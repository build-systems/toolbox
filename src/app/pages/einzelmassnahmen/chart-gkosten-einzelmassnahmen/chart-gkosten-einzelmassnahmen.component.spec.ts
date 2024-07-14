import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGkostenEinzelmassnahmenComponent } from './chart-gkosten-einzelmassnahmen.component';

describe('ChartGkostenEinzelmassnahmenComponent', () => {
  let component: ChartGkostenEinzelmassnahmenComponent;
  let fixture: ComponentFixture<ChartGkostenEinzelmassnahmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGkostenEinzelmassnahmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartGkostenEinzelmassnahmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
