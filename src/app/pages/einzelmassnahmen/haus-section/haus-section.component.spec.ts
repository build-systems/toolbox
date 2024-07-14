import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HausSectionComponent } from './haus-section.component';

describe('HausSectionComponent', () => {
  let component: HausSectionComponent;
  let fixture: ComponentFixture<HausSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HausSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HausSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
