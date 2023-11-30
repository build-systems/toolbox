import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanierungComponent } from './sanierung.component';

describe('SanierungComponent', () => {
  let component: SanierungComponent;
  let fixture: ComponentFixture<SanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
