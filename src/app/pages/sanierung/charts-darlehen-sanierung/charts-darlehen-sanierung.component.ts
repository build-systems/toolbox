import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartFinanzierungskostenSanierungComponent } from './chart-finanzierungskosten-sanierung/chart-finanzierungskosten-sanierung.component';
import { ChartTilgungSanierungComponent } from './chart-tilgung-sanierung/chart-tilgung-sanierung.component';
import { ChartAnnuitaetenSanierungComponent } from './chart-annuitaeten-sanierung/chart-annuitaeten-sanierung.component';

@Component({
  selector: 'app-charts-darlehen-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    ChartFinanzierungskostenSanierungComponent,
    ChartTilgungSanierungComponent,
    ChartAnnuitaetenSanierungComponent,
  ],
  templateUrl: './charts-darlehen-sanierung.component.html',
  styleUrl: './charts-darlehen-sanierung.component.css',
  host: {
    class: 'host-charts-plural'
  }
})
export class ChartsDarlehenSanierungComponent {

}
