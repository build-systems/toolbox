import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEinzelmassnahmenComponent } from './form-einzelmassnahmen.component';

describe('FormEinzelmassnahmenComponent', () => {
  let component: FormEinzelmassnahmenComponent;
  let fixture: ComponentFixture<FormEinzelmassnahmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEinzelmassnahmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEinzelmassnahmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
