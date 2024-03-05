import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildsystemsHelpComponent } from './buildsystems-help.component';

describe('BuildsystemsHelpComponent', () => {
  let component: BuildsystemsHelpComponent;
  let fixture: ComponentFixture<BuildsystemsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildsystemsHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildsystemsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
