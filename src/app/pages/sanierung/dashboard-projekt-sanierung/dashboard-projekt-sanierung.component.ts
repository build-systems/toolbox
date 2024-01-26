import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartGkostenSanierungComponent } from '../form-projekt-sanierung/chart-gkosten-sanierung/chart-gkosten-sanierung.component';
import { ChartGkostenM2SanierungComponent } from '../form-projekt-sanierung/chart-gkosten-m2-sanierung/chart-gkosten-m2-sanierung.component';
import { DashboardOutput } from '../../../shared/dashboard-output';
import { SanierungService } from '../sanierung.service';
import { ChartEinheitskostenSanierungComponent } from './chart-einheitskosten-sanierung/chart-einheitskosten-sanierung.component';

@Component({
  selector: 'app-dashboard-projekt-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    ChartGkostenSanierungComponent,
    ChartGkostenM2SanierungComponent,
    ChartEinheitskostenSanierungComponent,
  ],
  templateUrl: './dashboard-projekt-sanierung.component.html',
  styleUrl: './dashboard-projekt-sanierung.component.css',
  host: { class: 'host-output' },
})
export class DashboardProjektSanierungComponent implements OnInit {
  typ!: ProjektTyp;
  kfwZuschuss: number = 0;
  investitionskosten: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  output!: DashboardOutput;

  constructor(private sanierungService: SanierungService) {}

  // Here I made a copy of the subscription to both observables.
  // It is a lot of repetitive code, but I run out of time...
  ngOnInit(): void {
    this.sanierungService.currentOutputDashboard$.subscribe((value) => {
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
