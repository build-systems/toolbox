import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartGkostenSanierungComponent } from './chart-gkosten-sanierung/chart-gkosten-sanierung.component';
import { ChartGkostenM2SanierungComponent } from './chart-gkosten-m2-sanierung/chart-gkosten-m2-sanierung.component';
import { SanierungService } from '../sanierung.service';
import { ChartEinheitskostenSanierungComponent } from './chart-einheitskosten-sanierung/chart-einheitskosten-sanierung.component';
import { SanierungProjekt } from '../../../shared/sanierungprojekt';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de'
registerLocaleData(localeDe, 'de');

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
  output!: SanierungProjekt;
  investitionskosten: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  kfwZuschuss: number = 0;
  kfwZuschussPercent: number = 0;
  KfwKreditschwelleProWe: number = 0;

  constructor(private sanierungService: SanierungService) {}

  ngOnInit(): void {
    this.sanierungService.currentOutputSanierung$.subscribe((value) => {
      this.output = value;
      this.investitionskosten = this.output.investitionskosten;
      this.bankKredit = this.output.bankKredit;
      this.kfwKredit = this.output.kfwKredit;
      this.kfwZuschuss = this.output.kfwZuschuss;
      this.kfwZuschussPercent = this.output.kfwZuschussPercentage;
      this.KfwKreditschwelleProWe = this.output.kfwKreditschwelleProWe;
    });
  }
}
