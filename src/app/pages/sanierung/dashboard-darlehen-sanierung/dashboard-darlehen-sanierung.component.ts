import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartFinanzierungskostenSanierungComponent } from './chart-finanzierungskosten-sanierung/chart-finanzierungskosten-sanierung.component';
import { ChartTilgungSanierungComponent } from './chart-tilgung-sanierung/chart-tilgung-sanierung.component';
import { ChartAnnuitaetenSanierungComponent } from './chart-annuitaeten-sanierung/chart-annuitaeten-sanierung.component';
import { SanierungService } from '../sanierung.service';
import { SanierungProjekt } from '../../../shared/sanierungprojekt';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de'
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'app-dashboard-darlehen-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    ChartFinanzierungskostenSanierungComponent,
    ChartTilgungSanierungComponent,
    ChartAnnuitaetenSanierungComponent,
  ],
  templateUrl: './dashboard-darlehen-sanierung.component.html',
  styleUrl: './dashboard-darlehen-sanierung.component.css',
  host: { class: 'host-output' },
})
export class DashboardDarlehenSanierungComponent implements OnInit {
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
        this.output.finanzierungskostenBank;
      this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
      this.bankKredit = this.output.bankKredit;
      this.kfwKredit = this.output.kfwKredit;
      this.sollzinsKfw = this.output.sollzinsKfw;
    });
  }
}
