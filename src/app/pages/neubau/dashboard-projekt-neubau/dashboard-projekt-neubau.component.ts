import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOutput } from '../../../shared/dashboard-output';
import { NeubauService } from '../neubau.service';
import { ChartGkostenNeubauComponent } from './chart-gkosten-neubau/chart-gkosten-neubau.component';
import { ChartGkostenM2NeubauComponent } from './chart-gkosten-m2-neubau/chart-gkosten-m2-neubau.component';
import { ChartEinheitskostenNeubauComponent } from './chart-einheitskosten-neubau/chart-einheitskosten-neubau.component';

@Component({
  selector: 'app-dashboard-projekt-neubau',
  standalone: true,
  imports: [
    CommonModule,
    ChartGkostenNeubauComponent,
    ChartGkostenM2NeubauComponent,
    ChartEinheitskostenNeubauComponent,
  ],
  templateUrl: './dashboard-projekt-neubau.component.html',
  styleUrl: './dashboard-projekt-neubau.component.css',
  host: { class: 'host-output' },
})
export class DashboardProjektNeubauComponent implements OnInit {
  typ!: ProjektTyp;
  kfwZuschuss: number = 0;
  investitionskosten: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  output!: DashboardOutput;

  constructor(private neubauService: NeubauService) {}

  // Here I made a copy of the subscription to both observables.
  // It is a lot of repetitive code, but I run out of time...
  ngOnInit(): void {
    this.neubauService.currentOutputDashboard$
      .subscribe((value) => {
        this.output = value;
        this.typ = this.output.typ;
        this.kfwZuschuss = this.output.kfwZuschuss;
        this.investitionskosten = this.output.investitionskosten;
        this.finanzierungskostenFinanzmarkt =
          this.output.finanzierungskostenFinanzmarkt;
        this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
        this.bankKredit = this.output.bankKredit;
        this.kfwKredit = this.output.kfwKredit;
      });
  }
}
