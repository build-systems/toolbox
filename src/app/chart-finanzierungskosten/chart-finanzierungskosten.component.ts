import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungService } from '../pages/sanierung/sanierung.service';
import { NeubauService } from '../pages/neubau/neubau.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardOutput } from '../dashboard-output';
import { filter } from 'rxjs';

@Component({
  selector: 'app-chart-finanzierungskosten',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-finanzierungskosten.component.html',
  styleUrl: './chart-finanzierungskosten.component.css',
  host: {
    class: 'ng-chart chart2',
  },
})
export class ChartFinanzierungskostenComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: DashboardOutput;

  // Router links. There must be better way to get the strings from app.routes.ts
  currentRoute!: string;
  sanierungRoute = '/sanierung';
  neubauRoute = '/neubau';

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
        this.barChartData.datasets[0].data = [
          Math.round(this.output.ohneKfw),
          Math.round(this.output.mitKfw),
        ];
        this.chart?.update();
      });

    this.neubauService.currentOutputDashboard$
      .pipe(filter(() => this.currentRoute === this.neubauRoute))
      .subscribe((value) => {
        this.output = value;
        this.barChartData.datasets[0].data = [
          Math.round(this.output.ohneKfw),
          Math.round(this.output.mitKfw),
        ];
        this.chart?.update();
      });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
      },
    },
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
          text: 'Finanzierungskosten [€]',
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
      },
    },
  };
  public barChartOptionsPlaceholder: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
      },
    },
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
        },
      },
      y: {
        max: 1_800_000,
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
          text: 'Finanzierungskosten [€]',
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
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['ohne KfW', 'mit KfW'],
    datasets: [
      {
        data: [0, 0],
        label: 'Gesamt',
        backgroundColor: 'rgba(58, 194, 150, 0.6)',
        borderColor: 'rgb(58, 194, 150)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 194, 150)',
      },
    ],
  };
  public barChartDataPlaceholder: ChartData<'bar'> = {
    labels: ['ohne KfW', 'mit KfW'],
    datasets: [
      {
        data: [0, 0],
        label: 'Gesamt',
        backgroundColor: 'rgba(58, 194, 150, 0.6)',
        borderColor: 'rgb(58, 194, 150)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 194, 150)',
      },
    ],
  };

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}
}
