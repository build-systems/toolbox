import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSanierungComponent } from './form-sanierung.component';

describe('FormSanierungComponent', () => {
  let component: FormSanierungComponent;
  let fixture: ComponentFixture<FormSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
