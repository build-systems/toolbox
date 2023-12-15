import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDarlehenComponent } from './form-darlehen.component';

describe('FormDarlehenComponent', () => {
  let component: FormDarlehenComponent;
  let fixture: ComponentFixture<FormDarlehenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDarlehenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDarlehenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
