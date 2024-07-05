import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  // {
  //     path: '',
  //     component: HomeComponent,
  //     title: 'Homepage'
  // },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'BuildSystems | Profile',
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    title: 'BuildSystems | Portfolio',
  },
  { path: '', redirectTo: '/neubau', pathMatch: 'full' },
  // loadComponent pattern is to lazy load the app
  {
    path: 'neubau',
    loadComponent: () =>
      import('./pages/neubau/neubau.component').then((c) => c.NeubauComponent),
    title: 'BuildSystems | Neubau',
  },
  {
    path: 'sanierung',
    loadComponent: () =>
      import('./pages/sanierung/sanierung.component').then(
        (c) => c.SanierungComponent
      ),
    title: 'BuildSystems | Sanierung',
  },
  {
    path: 'einzelmassnahmen',
    loadComponent: () =>
      import('./pages/einzelmassnahmen/einzelmassnahmen.component').then(
        (c) => c.EinzelmassnahmenComponent
      ),
    title: 'BuildSystems | Einzelmaßnahmen',
  },
  // {
  //     path: 'settings',
  //     component: SettingsComponent,
  //     title: 'Settings'
  // },
];
