import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { SanierungService } from '../sanierung.service';

@Component({
  selector: 'app-chart-gkosten-m2',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-gkosten-m2.component.html',
  styleUrl: './chart-gkosten-m2.component.css'
})
export class ChartGkostenM2Component implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  wohnungsflaeche!: number;
  zuschuss!: number;
  investitionskosten!: number;
  finanzierungskostenMarkt!: number;
  finanzierungskostenKfW!: number;
  bankKredit!: number;
  kfwKredit!: number;

  constructor(private sanierungService: SanierungService) { }

  ngOnInit(): void {
    // I am doing the calculation in this component instead of the service
    // So I am using the same structure as the other chart, but then dividing by the wohnungsflaeche so it is €/m²
    this.sanierungService.currentwohnflaeche$.subscribe((value) => this.wohnungsflaeche = value);
    this.sanierungService.currentZuschuss$.subscribe((value) => {
      this.zuschuss = value;
      this.barChartData.datasets[0].data = [
        -Math.round(value / this.wohnungsflaeche),
        0,
      ];
      this.chart?.update();
    });
    this.sanierungService.currentInvestitionskosten$.subscribe((value) => {
      this.investitionskosten = value;
      this.barChartData.datasets[1].data = [
        Math.round(value / this.wohnungsflaeche),
        0,
      ];
      this.chart?.update();
    });
    this.sanierungService.currentFinanzierungskostenMarkt$.subscribe((value) => {
      this.finanzierungskostenMarkt = value;
      this.barChartData.datasets[2].data = [
        0,
        Math.round(value / this.wohnungsflaeche),
      ];
      this.chart?.update();
    });
    this.sanierungService.currentFinanzierungskostenKfw$.subscribe((value) => {
      this.finanzierungskostenKfW = value;
      this.barChartData.datasets[3].data = [
        0,
        Math.round(value / this.wohnungsflaeche),
      ];
      this.chart?.update();
    });
    this.sanierungService.currentBankKredit$.subscribe((value) => {
      this.bankKredit = value;
      this.barChartData.datasets[4].data = [
        0,
        Math.round(value / this.wohnungsflaeche),
      ];
      this.chart?.update();
    });
    this.sanierungService.currentKfwKredit$.subscribe((value) => {
      this.kfwKredit = value;
      this.barChartData.datasets[5].data = [
        0,
        Math.round(value / this.wohnungsflaeche),
      ];
      this.chart?.update();
    });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
          }
        }
      },
    },
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Gesamtkosten [€/m²]'
        },
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'start',
      },
      tooltip: {
        callbacks: {
          label: (item) =>
            `${item.dataset.label}: ${item.formattedValue} €/m²`,
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public barChartData: ChartData<'bar'> = {
    labels: ['Investition', 'Finanzierung'],
    datasets: [
      {
        data: [Math.round(this.zuschuss / this.wohnungsflaeche), null],
        label: 'Zuschuss',
        backgroundColor: '#20e074',
        borderColor: 'white',
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.7)',
        hoverBorderColor: 'aquamarine',
      },
      {
        data: [Math.round(this.investitionskosten / this.wohnungsflaeche), null],
        label: 'Investitionskosten',
        backgroundColor: '#01c698',
      },
      {
        data: [null, Math.round(this.finanzierungskostenMarkt / this.wohnungsflaeche)],
        label: 'Finanzierungskosten Markt',
        backgroundColor: '#00a9b5',
      },
      {
        data: [null, Math.round(this.finanzierungskostenKfW / this.wohnungsflaeche)],
        label: 'Finanzierungskosten KfW',
        backgroundColor: '#008ac5',
      },
      {
        data: [null, Math.round(this.bankKredit / this.wohnungsflaeche)],
        label: 'Bank-Kredit',
        backgroundColor: '#0069c0',
      },
      {
        data: [null, Math.round(this.kfwKredit / this.wohnungsflaeche)],
        label: 'kfw-Kredit',
        backgroundColor: '#0045a5',
      },
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