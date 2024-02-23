import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartFinanzierungskostenNeubauComponent } from './chart-finanzierungskosten-neubau/chart-finanzierungskosten-neubau.component';
import { ChartTilgungNeubauComponent } from './chart-tilgung-neubau/chart-tilgung-neubau.component';
import { ChartAnnuitaetenNeubauComponent } from './chart-annuitaeten-neubau/chart-annuitaeten-neubau.component';

@Component({
  selector: 'app-dashboard-darlehen-neubau',
  standalone: true,
  imports: [
    CommonModule,
    ChartFinanzierungskostenNeubauComponent,
    ChartTilgungNeubauComponent,
    ChartAnnuitaetenNeubauComponent,
  ],
  templateUrl: './dashboard-darlehen-neubau.component.html',
  styleUrl: './dashboard-darlehen-neubau.component.css',
  host: { class: 'host-charts-plural' },
})
export class DashboardDarlehenNeubauComponent {}
