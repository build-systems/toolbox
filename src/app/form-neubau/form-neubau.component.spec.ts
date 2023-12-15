import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNeubauComponent } from './form-neubau.component';

describe('FormNeubauComponent', () => {
  let component: FormNeubauComponent;
  let fixture: ComponentFixture<FormNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
