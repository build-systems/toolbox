import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeubauComponent } from './neubau.component';

describe('NeubauComponent', () => {
  let component: NeubauComponent;
  let fixture: ComponentFixture<NeubauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeubauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NeubauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
