import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDarlehenNeubauComponent } from './form-darlehen-neubau.component';

describe('FormDarlehenNeubauComponent', () => {
  let component: FormDarlehenNeubauComponent;
  let fixture: ComponentFixture<FormDarlehenNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDarlehenNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDarlehenNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
