import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersDarlehenNeubauComponent } from './numbers-darlehen-neubau.component';

describe('NumbersDarlehenNeubauComponent', () => {
  let component: NumbersDarlehenNeubauComponent;
  let fixture: ComponentFixture<NumbersDarlehenNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersDarlehenNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumbersDarlehenNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
