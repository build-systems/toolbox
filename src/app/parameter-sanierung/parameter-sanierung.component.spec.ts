import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterSanierungComponent } from './parameter-sanierung.component';

describe('ParameterSanierungComponent', () => {
  let component: ParameterSanierungComponent;
  let fixture: ComponentFixture<ParameterSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParameterSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
