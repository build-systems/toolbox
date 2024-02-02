import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartGkostenSanierungComponent } from '../form-projekt-sanierung/chart-gkosten-sanierung/chart-gkosten-sanierung.component';
import { ChartGkostenM2SanierungComponent } from '../form-projekt-sanierung/chart-gkosten-m2-sanierung/chart-gkosten-m2-sanierung.component';
import { DashboardOutput } from '../../../shared/dashboard-output';
import { SanierungService } from '../sanierung.service';
import { ChartEinheitskostenSanierungComponent } from './chart-einheitskosten-sanierung/chart-einheitskosten-sanierung.component';
import { SanierungProjekt } from '../../../shared/sanierungprojekt';

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
  kfwZuschuss: number = 0;
  investitionskosten: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  sollzinsKfw: number = 0;
  output!: SanierungProjekt;

  constructor(private sanierungService: SanierungService) {}

  ngOnInit(): void {
    this.sanierungService.currentOutputSanierung$.subscribe((value) => {
      this.output = value;
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
