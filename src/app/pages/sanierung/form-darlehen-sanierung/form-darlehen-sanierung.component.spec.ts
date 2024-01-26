import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDarlehenSanierungComponent } from './form-darlehen-sanierung.component';

describe('FormDarlehenSanierungComponent', () => {
  let component: FormDarlehenSanierungComponent;
  let fixture: ComponentFixture<FormDarlehenSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDarlehenSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDarlehenSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
