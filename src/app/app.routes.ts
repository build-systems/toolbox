import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NeubauComponent } from './neubau/neubau.component';
import { SanierungComponent } from './sanierung/sanierung.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'neubau',
        component: NeubauComponent,
        title: 'Neubau Page'
    },
    {
        path: 'sanierung',
        component: SanierungComponent,
        title: 'Sanierung Page'
    },
];
