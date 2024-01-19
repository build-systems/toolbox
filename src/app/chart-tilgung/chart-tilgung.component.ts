import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungService } from '../pages/sanierung/sanierung.service';
import { DashboardOutput } from '../dashboard-output';
import { NeubauService } from '../pages/neubau/neubau.service';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ChartsSettingsService } from '../charts-settings.service';

@Component({
  selector: 'app-chart-tilgung',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-tilgung.component.html',
  styleUrl: './chart-tilgung.component.css',
  host: {
    class: 'host-chart host-chart4',
  },
})
export class ChartTilgungComponent {
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
    private router: Router,
    private styleService: ChartsSettingsService

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
                this.annuitaeten[i] +
                this.output['efKfW'] / this.kreditlaufzeit;
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
                this.annuitaeten[i] +
                this.output['efBank'] / this.kreditlaufzeit;
            }
          }
        }
        this.repaymentTotal = [];
        // Insert 0 for current year
        this.repaymentTotal.push(0);
        // Insert other values
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          this.repaymentTotal.push(
            this.annuitaeten[i] + this.repaymentTotal[i]
          );
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
                this.annuitaeten[i] +
                this.output['efKfW'] / this.kreditlaufzeit;
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
                this.annuitaeten[i] +
                this.output['efBank'] / this.kreditlaufzeit;
            }
          }
        }
        this.repaymentTotal = [];
        // Insert 0 for current year
        this.repaymentTotal.push(0);
        // Insert other values
        for (var i = 0; i < this.kreditlaufzeit; i++) {
          this.repaymentTotal.push(
            this.annuitaeten[i] + this.repaymentTotal[i]
          );
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
        hoverBackgroundColor: this.styleService.datasets.color04.hoverBackgroundColor,
        pointStyle: 'circle',
        pointRadius: 2,
        pointBorderColor: this.styleService.datasets.color04.borderColor,
        pointBackgroundColor: this.styleService.datasets.color04.backgroundColor,
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
