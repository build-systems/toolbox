import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeubauService } from '../neubau.service';
import { ChartGkostenNeubauComponent } from './chart-gkosten-neubau/chart-gkosten-neubau.component';
import { ChartGkostenM2NeubauComponent } from './chart-gkosten-m2-neubau/chart-gkosten-m2-neubau.component';
import { ChartEinheitskostenNeubauComponent } from './chart-einheitskosten-neubau/chart-einheitskosten-neubau.component';
import { NeubauProjekt } from '../../../shared/neubauprojekt';

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
  investitionskosten: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  output!: NeubauProjekt;

  constructor(private neubauService: NeubauService) {}
  ngOnInit(): void {
    this.neubauService.currentOutputNeubau$
      .subscribe((value) => {
        this.output = value;
        this.investitionskosten = this.output.investitionskosten;
        this.finanzierungskostenFinanzmarkt =
          this.output.finanzierungskostenBank;
        this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
        this.bankKredit = this.output.bankKredit;
        this.kfwKredit = this.output.kfwKredit;
      });
  }
}
