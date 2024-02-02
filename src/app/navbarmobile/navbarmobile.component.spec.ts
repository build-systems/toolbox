import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavbarmobileComponent } from './navbarmobile.component';

// describe('NavbarmobileComponent', () => {
//   let fixture: ComponentFixture<NavbarmobileComponent>;
//   let component: NavbarmobileComponent;

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavbarmobileComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create NavbarmobileComponent if the page is smaller than 700px', fakeAsync(() => {
//     spyOnProperty(window, 'innerWidth', 'get').and.returnValue(600);

//     fixture.detectChanges();
//     tick();

//     // Check if the NavbarMobileComponent is created
//     const navbarMobileElement = fixture.debugElement.nativeElement;
//     expect(navbarMobileElement).toBeTruthy();
//   }));
// });
