import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HausNokellerSteildachComponent } from './haus-nokeller-steildach.component';

describe('HausNokellerSteildachComponent', () => {
  let component: HausNokellerSteildachComponent;
  let fixture: ComponentFixture<HausNokellerSteildachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HausNokellerSteildachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HausNokellerSteildachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
