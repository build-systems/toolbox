import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersEinzelmassnahmenComponent } from './numbers-einzelmassnahmen.component';

describe('NumbersEinzelmassnahmenComponent', () => {
  let component: NumbersEinzelmassnahmenComponent;
  let fixture: ComponentFixture<NumbersEinzelmassnahmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersEinzelmassnahmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumbersEinzelmassnahmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
