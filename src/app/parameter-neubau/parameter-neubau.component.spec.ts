import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterNeubauComponent } from './parameter-neubau.component';

describe('ParameterNeubauComponent', () => {
  let component: ParameterNeubauComponent;
  let fixture: ComponentFixture<ParameterNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParameterNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
