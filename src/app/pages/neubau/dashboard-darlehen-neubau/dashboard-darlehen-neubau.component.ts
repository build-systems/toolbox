import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeubauService } from '../neubau.service';
import { ChartFinanzierungskostenNeubauComponent } from './chart-finanzierungskosten-neubau/chart-finanzierungskosten-neubau.component';
import { ChartTilgungNeubauComponent } from './chart-tilgung-neubau/chart-tilgung-neubau.component';
import { ChartAnnuitaetenNeubauComponent } from './chart-annuitaeten-neubau/chart-annuitaeten-neubau.component';
import { NeubauProjekt } from '../../../shared/neubauprojekt';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de'
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'app-dashboard-darlehen-neubau',
  standalone: true,
  imports: [CommonModule, ChartFinanzierungskostenNeubauComponent, ChartTilgungNeubauComponent, ChartAnnuitaetenNeubauComponent],
  templateUrl: './dashboard-darlehen-neubau.component.html',
  styleUrl: './dashboard-darlehen-neubau.component.css',
  host: { class: 'host-output' },
})
export class DashboardDarlehenNeubauComponent implements OnInit {
  investitionskosten: number = 0;
  sollzinsKfw: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  output!: NeubauProjekt;

  constructor(private neubauService: NeubauService) {}

  // Here I made a copy of the subscription to both observables.
  // It is a lot of repetitive code, but I run out of time...
  ngOnInit(): void {
    this.neubauService.currentOutputNeubau$
      .subscribe((value) => {
        this.output = value;
        this.investitionskosten = this.output.investitionskosten;
        this.sollzinsKfw = this.output.sollzinsKfw;
        this.finanzierungskostenFinanzmarkt =
          this.output.finanzierungskostenBank;
        this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
        this.bankKredit = this.output.bankKredit;
        this.kfwKredit = this.output.kfwKredit;
      });
  }
}
