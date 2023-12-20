import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputvaluesComponent } from './outputvalues.component';

describe('OutputvaluesComponent', () => {
  let component: OutputvaluesComponent;
  let fixture: ComponentFixture<OutputvaluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputvaluesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutputvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
