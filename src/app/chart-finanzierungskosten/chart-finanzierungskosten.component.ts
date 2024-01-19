import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungService } from '../pages/sanierung/sanierung.service';
import { NeubauService } from '../pages/neubau/neubau.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardOutput } from '../dashboard-output';
import { filter } from 'rxjs';
import { ChartsSettingsService } from '../charts-settings.service';

@Component({
  selector: 'app-chart-finanzierungskosten',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-finanzierungskosten.component.html',
  styleUrl: './chart-finanzierungskosten.component.css',
  host: {
    class: 'host-chart host-chart3',
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
          text: 'Finanzierungskosten [€]',
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
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.color04.backgroundColor,
        borderColor: this.styleService.datasets.color04.borderColor,
        hoverBackgroundColor: this.styleService.datasets.color04.hoverBackgroundColor,
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
