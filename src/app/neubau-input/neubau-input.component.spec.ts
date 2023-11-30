import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeubauInputComponent } from './neubau-input.component';

describe('NeubauInputComponent', () => {
  let component: NeubauInputComponent;
  let fixture: ComponentFixture<NeubauInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeubauInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NeubauInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
