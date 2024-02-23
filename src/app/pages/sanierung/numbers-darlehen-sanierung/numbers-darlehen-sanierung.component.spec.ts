import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersDarlehenSanierungComponent } from './numbers-darlehen-sanierung.component';

describe('NumbersDarlehenSanierungComponent', () => {
  let component: NumbersDarlehenSanierungComponent;
  let fixture: ComponentFixture<NumbersDarlehenSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersDarlehenSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumbersDarlehenSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
