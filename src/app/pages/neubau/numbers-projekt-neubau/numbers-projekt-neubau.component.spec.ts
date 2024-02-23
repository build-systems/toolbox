import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersProjektNeubauComponent } from './numbers-projekt-neubau.component';

describe('NumbersProjektNeubauComponent', () => {
  let component: NumbersProjektNeubauComponent;
  let fixture: ComponentFixture<NumbersProjektNeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersProjektNeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumbersProjektNeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
