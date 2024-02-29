import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbarmobile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbarmobile.component.html',
  styleUrl: './navbarmobile.component.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        backgroundColor: "#222",
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
      })),
      transition('collapsed => expanded', [
        animate('300ms ease-out')
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in')
      ]),
    ]),
    trigger('rotateArrow', [
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      state('expanded', style({
        transform: 'rotate(90deg)'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-out')
      ]),
    ])
  ],
})
export class NavbarmobileComponent {

  isExpanded: boolean = false;

  public onClick(){
    this.isExpanded = !this.isExpanded;
  }

  public closeNavbar() {
    this.isExpanded = false;
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
