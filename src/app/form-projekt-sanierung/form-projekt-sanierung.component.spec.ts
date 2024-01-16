import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjektSanierungComponent } from './form-projekt-sanierung.component';

describe('FormProjektSanierungComponent', () => {
  let component: FormProjektSanierungComponent;
  let fixture: ComponentFixture<FormProjektSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProjektSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormProjektSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
