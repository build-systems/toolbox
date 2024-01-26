import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOutput } from '../../../shared/dashboard-output';
import { ChartFinanzierungskostenSanierungComponent } from './chart-finanzierungskosten-sanierung/chart-finanzierungskosten-sanierung.component';
import { ChartTilgungSanierungComponent } from './chart-tilgung-sanierung/chart-tilgung-sanierung.component';
import { ChartAnnuitaetenSanierungComponent } from './chart-annuitaeten-sanierung/chart-annuitaeten-sanierung.component';
import { SanierungService } from '../sanierung.service';

@Component({
  selector: 'app-dashboard-darlehen-sanierung',
  standalone: true,
  imports: [CommonModule, ChartFinanzierungskostenSanierungComponent, ChartTilgungSanierungComponent, ChartAnnuitaetenSanierungComponent],
  templateUrl: './dashboard-darlehen-sanierung.component.html',
  styleUrl: './dashboard-darlehen-sanierung.component.css',
  host: { class: 'host-output' },
})
export class DashboardDarlehenSanierungComponent implements OnInit {
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
    this.sanierungService.currentOutputDashboard$
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
