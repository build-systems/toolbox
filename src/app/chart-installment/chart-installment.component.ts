import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  Chart,
} from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungProjekt } from '../pages/sanierung/sanierungprojekt';
import { SanierungService } from '../pages/sanierung/sanierung.service';
import { FormProjektService } from '../form-projekt/form-projekt.service';
import { FormDarlehenService } from '../form-darlehen/form-darlehen.service';

@Component({
  selector: 'app-chart-installment',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-installment.component.html',
  styleUrl: './chart-installment.component.css',
  host: {
    class: 'ng-chart',
  },
})
export class ChartInstallmentComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: SanierungProjekt;

  currentYear = new Date().getFullYear();
  chartLabels: number[] = [];
  annuitaeten: number[] = [];
  kreditlaufzeit!: number;

  constructor(private sanierungService: SanierungService) {}

  ngOnInit(): void {
    this.sanierungService.currentOutput$.subscribe((value) => {
      this.output = value;
      // console.log("ChartInstallment");
      // If kreditlaufzeit was updated assign new value and create labels
      if (this.kreditlaufzeit != value['kreditlaufzeit']) {
        this.kreditlaufzeit = value['kreditlaufzeit'];
        this.chartLabels = [];
        // Create labels
        for (var i = 1; i <= this.kreditlaufzeit; i++) {
          this.chartLabels.push(this.currentYear + i);
        }
        // Update labels
        this.barChartData.labels = this.chartLabels;
      }

      // Monthly KfW-Darlehen
      this.annuitaeten = new Array(this.kreditlaufzeit).fill(0);

      // KfW-Darlehen
      if (this.output['kfWDarlehen'] === 'Annuitäten') {
        this.annuitaeten = this.annuitaeten.map(
          (num) => num + this.output['annuitaetKfW']
        );
      } else if (this.output['kfWDarlehen'] === 'Endfälliges') {
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          // If it is the last installment, add Annuität and KfW-Kredit
          if (i === this.kreditlaufzeit - 1) {
            this.annuitaeten[i] =
              this.annuitaeten[i] +
              this.output['efKfW'] / this.kreditlaufzeit +
              this.output['kfwKredit'];
            // Otherwise add just Annuität
          } else {
            this.annuitaeten[i] =
              this.annuitaeten[i] + this.output['efKfW'] / this.kreditlaufzeit;
          }
        }
      }

      // If KfW-Darlehen === Endfälliges, then EF KFW / years (array years -1, last item (KfW-Kredit + EF KFW / years)
      if (this.output['bankDarlehen'] === 'Annuitäten') {
        this.annuitaeten = this.annuitaeten.map(
          (num) => num + this.output['annuitaetBank']
        );
      } else if (this.output['bankDarlehen'] === 'Endfälliges') {
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          if (i === this.kreditlaufzeit - 1) {
            this.annuitaeten[i] =
              this.annuitaeten[i] +
              this.output['efBank'] / this.kreditlaufzeit +
              this.output['bankKredit'];
          } else {
            this.annuitaeten[i] =
              this.annuitaeten[i] + this.output['efBank'] / this.kreditlaufzeit;
          }
        }
      }

      // Update chart data
      this.barChartData.datasets[0].data = this.annuitaeten;

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
          color: '#999',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
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
          color: '#333',
        },
        ticks: {
          color: '#999',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
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
    plugins: {
      legend: {
        title: {
          color: 'white',
          display: true,
          font: {
            family: 'Montserrat',
            size: 18,
            weight: 400,
          },
          text: 'Annuitäten [€]',
        },
        display: true,
        labels: {
          color: '#ddd',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
          },
          boxWidth: 6,
          boxHeight: 6,
          usePointStyle: true,
          pointStyle: 'circle',
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

  public barChartOptionsPlaceholder: ChartConfiguration['options'] = {
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
          color: '#999',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
          },
        },
      },
      y: {
        min: 0,
        max: 140000,
        alignToPixels: true,
        border: {
          display: false,
        },
        title: {
          display: false,
        },
        grid: {
          color: '#333',
        },
        ticks: {
          color: '#999',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
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
    plugins: {
      legend: {
        title: {
          color: 'white',
          display: true,
          font: {
            family: 'Montserrat',
            size: 18,
            weight: 400,
          },
          text: 'Annuitäten [€]',
        },
        display: true,
        labels: {
          color: '#ddd',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
          },
          boxWidth: 6,
          boxHeight: 6,
          usePointStyle: true,
          pointStyle: 'circle',
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

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.chartLabels,
    datasets: [
      {
        label: 'Annuität',
        data: this.annuitaeten,
        pointStyle: 'circle',
        backgroundColor: 'rgba(58, 194, 150, 0.6)',
        borderColor: 'rgb(58, 194, 150)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 194, 150)',
      },
    ],
  };

  public barChartDataPlaceholder: ChartData<'bar'> = {
    labels: [
      2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
      2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043
    ],
    datasets: [
      {
        label: 'Annuität',
        data: [0],
        pointStyle: 'circle',
        backgroundColor: 'rgba(58, 194, 150, 0.6)',
        borderColor: 'rgb(58, 194, 150)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 194, 150)',
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
