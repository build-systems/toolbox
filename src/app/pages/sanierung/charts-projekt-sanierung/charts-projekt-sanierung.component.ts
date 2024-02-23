import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartGkostenSanierungComponent } from './chart-gkosten-sanierung/chart-gkosten-sanierung.component';
import { ChartGkostenM2SanierungComponent } from './chart-gkosten-m2-sanierung/chart-gkosten-m2-sanierung.component';
import { ChartEinheitskostenSanierungComponent } from './chart-einheitskosten-sanierung/chart-einheitskosten-sanierung.component';
import { NumbersProjektSanierungComponent } from '../numbers-projekt-sanierung/numbers-projekt-sanierung.component';

@Component({
  selector: 'app-charts-projekt-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    ChartGkostenSanierungComponent,
    ChartGkostenM2SanierungComponent,
    ChartEinheitskostenSanierungComponent,
    NumbersProjektSanierungComponent
  ],
  templateUrl: './charts-projekt-sanierung.component.html',
  styleUrl: './charts-projekt-sanierung.component.css',
  host: {
    class: 'host-charts-plural'
  }
})
export class ChartsProjektSanierungComponent {

}
