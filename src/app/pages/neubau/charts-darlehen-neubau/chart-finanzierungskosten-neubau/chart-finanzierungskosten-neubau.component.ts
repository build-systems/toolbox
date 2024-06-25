import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { NeubauService } from '../../neubau.service';
import { ChartsSettingsService } from '../../../../shared/charts-settings.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { NeubauProjekt } from '../../../../shared/neubauprojekt';

@Component({
  selector: 'app-chart-finanzierungskosten-neubau',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-finanzierungskosten-neubau.component.html',
  styleUrl: './chart-finanzierungskosten-neubau.component.css',
  host: {
    class: 'host-chart host-chart4',
  },
})
export class ChartFinanzierungskostenNeubauComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private neubauService: NeubauService,
    private styleService: ChartsSettingsService
  ) {}

  // Here I made a copy of the subscription to both observables.
  // It is a lot of repetitive code, but I run out of time
  ngOnInit(): void {
    this.neubauService.currentOutputNeubau$.subscribe(
      (projekt: NeubauProjekt) => {
        this.barChartData.datasets[0].data = [
          Math.round(projekt.finKostenOhneKfw),
          Math.round(projekt.finKostenMitKfw),
        ];
        this.chart?.update();
      }
    );
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
          callback: function (value) {
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
          label: (item) =>
            `${item.dataset.label}: ${Intl.NumberFormat('de', {
              style: 'currency',
              currency: 'EUR',
              maximumFractionDigits: 0,
            }).format(item.parsed.y)}`,
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
        backgroundColor: this.styleService.datasets.colors[3].backgroundColor,
        borderColor: this.styleService.datasets.colors[3].borderColor,
        hoverBackgroundColor:
          this.styleService.datasets.colors[3].hoverBackgroundColor,
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
