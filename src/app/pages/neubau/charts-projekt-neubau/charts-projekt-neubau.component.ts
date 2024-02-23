import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartGkostenNeubauComponent } from './chart-gkosten-neubau/chart-gkosten-neubau.component';
import { ChartGkostenM2NeubauComponent } from './chart-gkosten-m2-neubau/chart-gkosten-m2-neubau.component';
import { ChartEinheitskostenNeubauComponent } from './chart-einheitskosten-neubau/chart-einheitskosten-neubau.component';

@Component({
  selector: 'app-charts-projekt-neubau',
  standalone: true,
  imports: [
    CommonModule,
    ChartGkostenNeubauComponent,
    ChartGkostenM2NeubauComponent,
    ChartEinheitskostenNeubauComponent,
  ],
  templateUrl: './charts-projekt-neubau.component.html',
  styleUrl: './charts-projekt-neubau.component.css',
  host: { class: 'host-charts-plural' },
})
export class ChartsProjektNeubauComponent {}
