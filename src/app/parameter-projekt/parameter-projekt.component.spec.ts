import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterProjektComponent } from './parameter-projekt.component';

describe('ParameterProjektComponent', () => {
  let component: ParameterProjektComponent;
  let fixture: ComponentFixture<ParameterProjektComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterProjektComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParameterProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
