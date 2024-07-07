import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DbEinzelmassnahmenService } from '../pages/einzelmassnahmen/db-einzelmassnahmen.service';
import { EinzelmassnahmenService } from '../pages/einzelmassnahmen/einzelmassnahmen.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private dbEinzelmassnahmenService = inject(DbEinzelmassnahmenService);
  private einzelmassnahmenService = inject(EinzelmassnahmenService);

  // This logic is to apply style to the current route icon in the nav bar
  // Declaring the current route as string
  currentRoute!: string;

  // Import Router and use it in the constructor
  constructor(private router: Router) {
    // Subscribe to its observable
    router.events.subscribe((val) => {
      // Check if val is NavigationEnd (it has many actions until this last one)
      if (val instanceof NavigationEnd)
        // Then assign the url as a string
        this.currentRoute = this.router.url.toString();
    });
  }

  // This method is used in the html together with [class.active-item]
  // If the current url matches the html element, then it applies the active-item class
  isRouteActive(linkRoute: string) {
    if (linkRoute === this.currentRoute) {
      return true;
    } else {
      return false;
    }
  }

  // Used to fetch the data before the user changes route
  // For improved UX
  async onHoverPrefetch() {
    let einzelmassnahmenProjects =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenProjects();
    this.einzelmassnahmenService.projectsEinzelmassnahmen.update(
      () => einzelmassnahmenProjects
    );
  }
}
