import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinzelmassnahmenComponent } from './einzelmassnahmen.component';

describe('EinzelmassnahmenComponent', () => {
  let component: EinzelmassnahmenComponent;
  let fixture: ComponentFixture<EinzelmassnahmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EinzelmassnahmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EinzelmassnahmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
