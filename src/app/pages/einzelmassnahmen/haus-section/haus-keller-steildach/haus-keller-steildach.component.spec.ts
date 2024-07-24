import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HausKellerSteildachComponent } from './haus-keller-steildach.component';

describe('HausKellerSteildachComponent', () => {
  let component: HausKellerSteildachComponent;
  let fixture: ComponentFixture<HausKellerSteildachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HausKellerSteildachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HausKellerSteildachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
