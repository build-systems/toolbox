import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanierungInputComponent } from './sanierung-input.component';

describe('SanierungInputComponent', () => {
  let component: SanierungInputComponent;
  let fixture: ComponentFixture<SanierungInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanierungInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanierungInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
