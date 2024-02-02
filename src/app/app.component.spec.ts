import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarmobileComponent } from './navbarmobile/navbarmobile.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NavbarComponent, NavbarmobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it('should display NavbarComponent when screen width is greater than or equal to 700px', () => {
  //   // spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
  //   component.screenWidth = 800;

  //   // Trigger change detection
  //   fixture.detectChanges();

  //   // Assert that NavbarComponent is displayed
  //   expect(fixture.nativeElement.querySelector('app-navbar')).toBeTruthy();
  // });
});
