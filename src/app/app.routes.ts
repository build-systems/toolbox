import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NeubauComponent } from './pages/neubau/neubau.component';
import { SanierungComponent } from './pages/sanierung/sanierung.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Homepage'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile'
    },
    {
        path: 'portfolio',
        component: PortfolioComponent,
        title: 'Portfolio'
    },
    {
        path: 'neubau',
        component: NeubauComponent,
        title: 'Neubau'
    },
    {
        path: 'sanierung',
        component: SanierungComponent,
        title: 'Sanierung'
    },
    {
        path: 'settings',
        component: SettingsComponent,
        title: 'BS | Settings'
    },
];
