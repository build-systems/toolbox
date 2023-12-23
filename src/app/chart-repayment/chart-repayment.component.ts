import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungService } from '../pages/sanierung/sanierung.service';
import { DashboardOutput } from '../dashboard-output';
import { NeubauService } from '../pages/neubau/neubau.service';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-chart-repayment',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-repayment.component.html',
  styleUrl: './chart-repayment.component.css',
  host: {
    class: 'ng-chart chart2'
  }
})
export class ChartRepaymentComponent {
  // ATENTION: The logic is different from chart-annuitaeten.
  // It has one more item in each array so we can start on zero and current year
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: DashboardOutput;

  // Router links. There must be better way to get the strings from app.routes.ts
  currentRoute!: string;
  sanierungRoute = '/sanierung';
  neubauRoute = '/neubau';

  currentYear = new Date().getFullYear();
  chartLabels: number[] = [];
  annuitaeten: number[] = [];
  kreditlaufzeit: number = 0;
  repaymentTotal: number[] = [];

  constructor(
    private sanierungService: SanierungService,
    private neubauService: NeubauService,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      // Check for changes on the url
      if (val instanceof NavigationEnd) {
        // Then assign the url as a string
        this.currentRoute = this.router.url.toString();
      }
    });
  }

  // Here I made a copy of the subscription to both observables.
  // It is a lot of repetitive code, but I run out of time
  ngOnInit(): void {
    this.sanierungService.currentOutputDashboard$
    .pipe(filter(() => this.currentRoute === this.sanierungRoute))
      .subscribe((value) => {
      this.output = value;
      // If kreditlaufzeit was updated assign new value and create labels 
      if (this.kreditlaufzeit != value['kreditlaufzeit']) {
        this.kreditlaufzeit = value['kreditlaufzeit'];
        this.chartLabels = [];
        // Create labels
        for (var i = 0; i <= this.kreditlaufzeit; i++) {
          this.chartLabels.push(this.currentYear + i)
        }
        // Update labels
        this.barChartData.labels = this.chartLabels;
      }
      // Monthly KfW-Darlehen
      this.annuitaeten = new Array(this.kreditlaufzeit).fill(0);
      // KfW-Darlehen
      if (this.output['kfWDarlehen'] === "Annuitäten") {
        this.annuitaeten = this.annuitaeten.map((num) => num + this.output['annuitaetKfW']);
      } else if (this.output['kfWDarlehen'] === "Endfälliges") {
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          // If it is the last installment, add Annuität and KfW-Kredit
          if (i === this.kreditlaufzeit - 1) {
            this.annuitaeten[i] = this.annuitaeten[i] + (this.output['efKfW'] / this.kreditlaufzeit) + this.output['kfwKredit'];
            // Otherwise add just Annuität
          } else {
            this.annuitaeten[i] = this.annuitaeten[i] + (this.output['efKfW'] / this.kreditlaufzeit);
          }
        }
      }
      // If KfW-Darlehen === Endfälliges, then EF KFW / years (array years -1, last item (KfW-Kredit + EF KFW / years)
      if (this.output['bankDarlehen'] === 'Annuitäten') {
        this.annuitaeten = this.annuitaeten.map((num) => num + this.output['annuitaetBank']);
      } else if (this.output['bankDarlehen'] === 'Endfälliges') {
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          if (i === this.kreditlaufzeit - 1) {
            this.annuitaeten[i] = this.annuitaeten[i] + (this.output['efBank'] / this.kreditlaufzeit) + this.output['bankKredit'];
          } else {
            this.annuitaeten[i] = this.annuitaeten[i] + (this.output['efBank'] / this.kreditlaufzeit);
          }
        }
      }
      this.repaymentTotal = [];
      // Insert 0 for current year
      this.repaymentTotal.push(0);
      // Insert other values
      for (var i = 0; i < this.kreditlaufzeit; i++) {
        this.repaymentTotal.push(this.annuitaeten[i] + this.repaymentTotal[i])
      }
      // Update chart data
      this.barChartData.datasets[0].data = this.repaymentTotal;
      // If KfW-Darlehen === kein Darlehen
      this.chart?.update();
    });

    this.neubauService.currentOutputDashboard$
    .pipe(filter(() => this.currentRoute === this.neubauRoute))
      .subscribe((value) => {
      this.output = value;
      // If kreditlaufzeit was updated assign new value and create labels 
      if (this.kreditlaufzeit != value['kreditlaufzeit']) {
        this.kreditlaufzeit = value['kreditlaufzeit'];
        this.chartLabels = [];
        // Create labels
        for (var i = 0; i <= this.kreditlaufzeit; i++) {
          this.chartLabels.push(this.currentYear + i)
        }
        // Update labels
        this.barChartData.labels = this.chartLabels;
      }
      // Monthly KfW-Darlehen
      this.annuitaeten = new Array(this.kreditlaufzeit).fill(0);
      // KfW-Darlehen
      if (this.output['kfWDarlehen'] === "Annuitäten") {
        this.annuitaeten = this.annuitaeten.map((num) => num + this.output['annuitaetKfW']);
      } else if (this.output['kfWDarlehen'] === "Endfälliges") {
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          // If it is the last installment, add Annuität and KfW-Kredit
          if (i === this.kreditlaufzeit - 1) {
            this.annuitaeten[i] = this.annuitaeten[i] + (this.output['efKfW'] / this.kreditlaufzeit) + this.output['kfwKredit'];
            // Otherwise add just Annuität
          } else {
            this.annuitaeten[i] = this.annuitaeten[i] + (this.output['efKfW'] / this.kreditlaufzeit);
          }
        }
      }
      // If KfW-Darlehen === Endfälliges, then EF KFW / years (array years -1, last item (KfW-Kredit + EF KFW / years)
      if (this.output['bankDarlehen'] === 'Annuitäten') {
        this.annuitaeten = this.annuitaeten.map((num) => num + this.output['annuitaetBank']);
      } else if (this.output['bankDarlehen'] === 'Endfälliges') {
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          if (i === this.kreditlaufzeit - 1) {
            this.annuitaeten[i] = this.annuitaeten[i] + (this.output['efBank'] / this.kreditlaufzeit) + this.output['bankKredit'];
          } else {
            this.annuitaeten[i] = this.annuitaeten[i] + (this.output['efBank'] / this.kreditlaufzeit);
          }
        }
      }
      this.repaymentTotal = [];
      // Insert 0 for current year
      this.repaymentTotal.push(0);
      // Insert other values
      for (var i = 0; i < this.kreditlaufzeit; i++) {
        this.repaymentTotal.push(this.annuitaeten[i] + this.repaymentTotal[i])
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
          color: '#999',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
          },
        }
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
    interaction: {
      intersect: false,
      mode: 'index',
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
          text: 'Repayment [€]'
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
        }
      },
      tooltip: {
        callbacks: {
          label: (item) =>
            `${item.dataset.label}: ${item.formattedValue} €`,
        },
        usePointStyle: true,
      },
    },
  };
  // I duplicated the options and the data to use as a placeholder for a smoother page load
  // I couldn't find a better way at the time
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
          color: '#999',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
          },
        }
      },
      y: {
        max: 3_000_000,
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
    interaction: {
      intersect: false,
      mode: 'index',
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
          text: 'Repayment [€]'
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
        }
      },
      tooltip: {
        callbacks: {
          label: (item) =>
            `${item.dataset.label}: ${item.formattedValue} €`,
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
        backgroundColor: 'rgba(58, 194, 150, 0.6)',
        borderColor: 'rgb(58, 194, 150)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 194, 150)',
        pointStyle: 'circle',
        pointRadius: 2,
        pointBorderColor: 'rgb(58, 194, 150)',
        pointBackgroundColor: 'rgba(58, 194, 150, 0.6)'
      },
    ],
  };
  // I duplicated the options and the data to use as a placeholder for a smoother page load
  // I couldn't find a better way at the time
  public barChartDataPlaceholder: ChartData<'line'> = {
    labels: [
      2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
      2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043
    ],
    datasets: [
      {
        label: 'Summe',
        data: [0],
        fill: 'start',
        backgroundColor: 'rgba(58, 194, 150, 0.6)',
        borderColor: 'rgb(58, 194, 150)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 194, 150)',
        pointStyle: 'circle',
        pointRadius: 2,
        pointBorderColor: 'rgb(58, 194, 150)',
        pointBackgroundColor: 'rgba(58, 194, 150, 0.6)'
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
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
  }
}