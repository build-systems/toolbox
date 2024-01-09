import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarmobileComponent } from './navbarmobile.component';

describe('NavbarmobileComponent', () => {
  let component: NavbarmobileComponent;
  let fixture: ComponentFixture<NavbarmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarmobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
