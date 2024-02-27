import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartFinanzierungskostenNeubauComponent } from './chart-finanzierungskosten-neubau/chart-finanzierungskosten-neubau.component';
import { ChartTilgungNeubauComponent } from './chart-tilgung-neubau/chart-tilgung-neubau.component';
import { ChartAnnuitaetenNeubauComponent } from './chart-annuitaeten-neubau/chart-annuitaeten-neubau.component';

@Component({
  selector: 'app-charts-darlehen-neubau',
  standalone: true,
  imports: [
    CommonModule,
    ChartFinanzierungskostenNeubauComponent,
    ChartTilgungNeubauComponent,
    ChartAnnuitaetenNeubauComponent,
  ],
  templateUrl: './charts-darlehen-neubau.component.html',
  styleUrl: './charts-darlehen-neubau.component.css',
  host: { class: 'host-charts-plural' },
})
export class ChartsDarlehenNeubauComponent {}
