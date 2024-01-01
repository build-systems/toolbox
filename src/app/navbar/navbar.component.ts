import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // This logic is to apply style to the current route icon in the nav bar
  // Declaring the current route as string
  currentRoute!: string;

  // Import Router and use it in the constructor
  constructor(private router: Router) {
    // Subscribe to its observable
    router.events.subscribe((val) => {
      // Check if val is NavigationEnd (it has many actions untile this last one)
      if (val instanceof NavigationEnd)
        // Then assign the url as a string
        this.currentRoute = this.router.url.toString();
    });
  }

  // This method is used in the html together with [class.active-nav]
  // If the current url matches the html element, then it applies the active-nav class
  isRouteActive(linkRoute: string) {
    if (linkRoute === this.currentRoute) {
      return true;
    } else {
      return false;
    }
  }
}
