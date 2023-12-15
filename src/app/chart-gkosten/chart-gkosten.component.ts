import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { SanierungService } from '../sanierung.service';


@Component({
  selector: 'app-chart-gkosten',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-gkosten.component.html',
  styleUrl: './chart-gkosten.component.css'
})
export class ChartGkostenComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  zuschuss!: number;
  investitionskosten!: number;
  finanzierungskostenMarkt!: number;
  finanzierungskostenKfW!: number;
  bankKredit!: number;
  kfwKredit!: number;

  constructor(private sanierungService: SanierungService) { }

  ngOnInit(): void {
    this.sanierungService.currentZuschuss$.subscribe((value) => {
      this.zuschuss = value;
      this.barChartData.datasets[0].data = [
        -value,
        0,
      ];
      this.chart?.update();
    });
    this.sanierungService.currentInvestitionskosten$.subscribe((value) => {
      this.investitionskosten = value;
      this.barChartData.datasets[1].data = [
        value,
        0,
      ];
      this.chart?.update();
    });
    this.sanierungService.currentFinanzierungskostenMarkt$.subscribe((value) => {
      this.finanzierungskostenMarkt = value;
      this.barChartData.datasets[2].data = [
        0,
        value,
      ];
      this.chart?.update();
    });
    this.sanierungService.currentFinanzierungskostenKfw$.subscribe((value) => {
      this.finanzierungskostenKfW = value;
      this.barChartData.datasets[3].data = [
        0,
        value,
      ];
      this.chart?.update();
    });
    this.sanierungService.currentBankKredit$.subscribe((value) => {
      this.bankKredit = value;
      this.barChartData.datasets[4].data = [
        0,
        value,
      ];
      this.chart?.update();
    });
    this.sanierungService.currentKfwKredit$.subscribe((value) => {
      this.kfwKredit = value;
      this.barChartData.datasets[5].data = [
        0,
        value,
      ];
      this.chart?.update();
    });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Gesamtkosten [€]'
        },
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'start',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public barChartData: ChartData<'bar'> = {
    labels: ['Investition', 'Finanzierung'],
    datasets: [
      { data: [this.zuschuss, null], label: 'Zuschuss' },
      { data: [this.investitionskosten, null], label: 'Investitionskosten' },
      { data: [null, this.finanzierungskostenMarkt], label: 'Finanzierungskosten Markt' },
      { data: [null, this.finanzierungskostenKfW], label: 'Finanzierungskosten KfW' },
      { data: [null, this.bankKredit], label: 'Bank-Kredit' },
      { data: [null, this.kfwKredit], label: 'kfw-Kredit' },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }
}
