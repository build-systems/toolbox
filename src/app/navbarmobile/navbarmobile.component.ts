import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbarmobile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbarmobile.component.html',
  styleUrl: './navbarmobile.component.css'
})
export class NavbarmobileComponent {

  navbarVisible: boolean = false;

  public onClick(){
    this.navbarVisible = !this.navbarVisible;
  }

  public closeNavbar() {
    this.navbarVisible = false;
  }

// This part down is to highlight the menu item
  currentRoute!: string;
  
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd)
        this.currentRoute = this.router.url.toString();
    });
  }

  isRouteActive(linkRoute: string) {
    if (linkRoute === this.currentRoute) {
      return true;
    } else {
      return false;
    }
  }
}
