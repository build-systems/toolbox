import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjektComponent } from './form-projekt.component';

describe('FormProjektComponent', () => {
  let component: FormProjektComponent;
  let fixture: ComponentFixture<FormProjektComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProjektComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
