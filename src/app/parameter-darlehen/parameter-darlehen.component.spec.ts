import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterDarlehenComponent } from './parameter-darlehen.component';

describe('ParameterDarlehenComponent', () => {
  let component: ParameterDarlehenComponent;
  let fixture: ComponentFixture<ParameterDarlehenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterDarlehenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParameterDarlehenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
