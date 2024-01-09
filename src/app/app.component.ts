import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'
import { NeubauComponent } from './pages/neubau/neubau.component'
import { HomeComponent } from './pages/home/home.component';
import { NavbarmobileComponent } from './navbarmobile/navbarmobile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, NavbarmobileComponent, HomeComponent, NeubauComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class AppComponent {
  // https://angular.dev/guide/components/host-elements

  // This part is to control if either the normal navbar or the navbarmobile should be loaded
  // See also the host up
  public screenWidth!: number;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }
  
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }

  isMobile(screenWidth: number){
    return screenWidth < 700
  }
}