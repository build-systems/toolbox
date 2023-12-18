import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Chart } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungProjekt } from '../sanierungprojekt';
import { SanierungService } from '../sanierung.service';

@Component({
  selector: 'app-chart-installment',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-installment.component.html',
  styleUrl: './chart-installment.component.css'
})
export class ChartInstallmentComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: SanierungProjekt;
  monthlyKfw: number[] = [];

  constructor(private sanierungService: SanierungService) { }

  ngOnInit(): void {
    this.sanierungService.currentOutput$.subscribe((value) => {
      this.output = value;
      // Calculation here
      // Monthly KfW-Darlehen
      if (this.output['kfWDarlehen'] === "Annuitäten" ){

      }
      // If KfW-Darlehen === Annuität, then divide loan by years (create an array)
      // If KfW-Darlehen === Endfälliges Darlehen, then EF KFW / years (array years -1, last item (KfW-Kredit + EF KFW / years)
      // If KfW-Darlehen === kein Darlehen
      
      // If Bank Darlehen === Annuität, then creates array
      // If Bank Darlehen === kein Darlehen

      // Sum array values
      // Assign values to chart
      this.chart?.update();
    });
  }
}
