import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjektNeubauComponent } from './form-projekt-neubau.component';

describe('FormProjektNeubauComponent', () => {
  let component: FormProjektNeubauComponent;
  let fixture: ComponentFixture<FormProjektNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProjektNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormProjektNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
