import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersProjektSanierungComponent } from './numbers-projekt-sanierung.component';

describe('NumbersProjektSanierungComponent', () => {
  let component: NumbersProjektSanierungComponent;
  let fixture: ComponentFixture<NumbersProjektSanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersProjektSanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumbersProjektSanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
