import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungService } from '../../sanierung.service';
import { ChartsSettingsService } from '../../../../shared/charts-settings.service';
import { SanierungProjekt } from '../../../../shared/sanierungprojekt';

@Component({
  selector: 'app-chart-tilgung-sanierung',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-tilgung-sanierung.component.html',
  styleUrl: './chart-tilgung-sanierung.component.css',
  host: {
    class: 'host-chart host-chart4',
  },
})
export class ChartTilgungSanierungComponent {
  // ATENTION: The logic is different from chart-annuitaeten.
  // It has one more item in each array so we can start on zero and current year
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  currentYear = new Date().getFullYear();
  chartLabels: number[] = [];
  annuitaeten: number[] = [];
  kreditlaufzeit: number = 0;
  repaymentTotal: number[] = [];

  constructor(
    private sanierungService: SanierungService,
    private styleService: ChartsSettingsService
  ) {}

  ngOnInit(): void {
    this.sanierungService.currentOutputSanierung$.subscribe((projekt: SanierungProjekt) => {
      // If kreditlaufzeit was updated assign new value and create labels
      if (this.kreditlaufzeit != projekt.kreditlaufzeit) {
        this.kreditlaufzeit = projekt.kreditlaufzeit;
        this.chartLabels = [];
        // Create labels
        for (var i = 0; i <= this.kreditlaufzeit; i++) {
          this.chartLabels.push(this.currentYear + i);
        }
        // Update labels
        this.barChartData.labels = this.chartLabels;
      }
      // Monthly KfW-Darlehen
      this.annuitaeten = new Array(this.kreditlaufzeit).fill(0);
      // KfW-Darlehen
      if (projekt.kfWDarlehen === 'Annuitäten') {
        this.annuitaeten = this.annuitaeten.map(
          (num) => num + projekt.annuitaetKfW
        );
      } else if (projekt.kfWDarlehen === 'Endfälliges') {
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          // If it is the last installment, add Annuität and KfW-Kredit
          if (i === this.kreditlaufzeit - 1) {
            this.annuitaeten[i] =
              this.annuitaeten[i] +
              projekt.efKfW / this.kreditlaufzeit +
              projekt.kfwKredit;
            // Otherwise add just Annuität
          } else {
            this.annuitaeten[i] =
              this.annuitaeten[i] + projekt.efKfW / this.kreditlaufzeit;
          }
        }
      }
      // If KfW-Darlehen === Endfälliges, then EF KFW / years (array years -1, last item (KfW-Kredit + EF KFW / years)
      if (projekt.bankDarlehen === 'Annuitäten') {
        this.annuitaeten = this.annuitaeten.map(
          (num) => num + projekt.annuitaetBank
        );
      } else if (projekt.bankDarlehen === 'Endfälliges') {
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          if (i === this.kreditlaufzeit - 1) {
            this.annuitaeten[i] =
              this.annuitaeten[i] +
              projekt.efBank / this.kreditlaufzeit +
              projekt.bankKredit;
          } else {
            this.annuitaeten[i] =
              this.annuitaeten[i] + projekt.efBank / this.kreditlaufzeit;
          }
        }
      }
      this.repaymentTotal = [];
      // Insert 0 for current year
      this.repaymentTotal.push(0);
      // Insert other values
      for (var i = 0; i < this.kreditlaufzeit; i++) {
        this.repaymentTotal.push(this.annuitaeten[i] + this.repaymentTotal[i]);
      }
      // Update chart data
      this.barChartData.datasets[0].data = this.repaymentTotal;
      // If KfW-Darlehen === kein Darlehen
      this.chart?.update();
    });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    scales: {
      x: {
        alignToPixels: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: this.styleService.ticks.color,
          font: {
            size: this.styleService.ticks.font.size,
            family: this.styleService.ticks.font.family,
            weight: this.styleService.ticks.font.weight,
          },
        },
      },
      y: {
        alignToPixels: true,
        border: {
          display: false,
        },
        title: {
          display: false,
        },
        grid: {
          color: this.styleService.grid.color,
        },
        ticks: {
          color: this.styleService.ticks.color,
          font: {
            size: this.styleService.ticks.font.size,
            family: this.styleService.ticks.font.family,
            weight: this.styleService.ticks.font.weight,
          },
          callback: function (value, index, values) {
            return value.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        title: {
          color: this.styleService.title.color,
          display: true,
          font: {
            family: this.styleService.title.font.family,
            size: this.styleService.title.font.size,
            weight: this.styleService.title.font.weight,
          },
          text: 'Tilgung [€]',
        },
        display: true,
        labels: {
          color: this.styleService.labels.color,
          font: {
            size: this.styleService.labels.font.size,
            family: this.styleService.labels.font.family,
            weight: this.styleService.labels.font.weight,
          },
          usePointStyle: true,
          boxWidth: this.styleService.labels.boxWidth,
          boxHeight: this.styleService.labels.boxHeight,
          pointStyle: this.styleService.labels.pointStyle,
        },
      },
      tooltip: {
        callbacks: {
          label: (item) => `${item.dataset.label}: ${item.formattedValue} €`,
        },
        usePointStyle: true,
      },
    },
  };
  public barChartType: ChartType = 'line';

  public barChartData: ChartData<'line'> = {
    labels: this.chartLabels,
    datasets: [
      {
        label: 'Summe',
        data: this.repaymentTotal,
        fill: 'start',
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.color04.backgroundColor,
        borderColor: this.styleService.datasets.color04.borderColor,
        hoverBackgroundColor:
          this.styleService.datasets.color04.hoverBackgroundColor,
        pointStyle: 'circle',
        pointRadius: 2,
        pointBorderColor: this.styleService.datasets.color04.borderColor,
        pointBackgroundColor:
          this.styleService.datasets.color04.backgroundColor,
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
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}
}
