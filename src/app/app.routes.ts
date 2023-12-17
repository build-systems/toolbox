import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NeubauComponent } from './neubau/neubau.component';
import { SanierungComponent } from './sanierung/sanierung.component';
import { ProfileComponent } from './profile/profile.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'BS | Home Page'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'BS | Profile'
    },
    {
        path: 'portfolio',
        component: PortfolioComponent,
        title: 'BS | Portfolio'
    },
    {
        path: 'neubau',
        component: NeubauComponent,
        title: 'BS | Neubau'
    },
    {
        path: 'sanierung',
        component: SanierungComponent,
        title: 'BS | Sanierung'
    },
    {
        path: 'settings',
        component: SettingsComponent,
        title: 'BS | Settings'
    },
];
