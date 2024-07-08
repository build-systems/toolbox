import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungService } from '../../sanierung.service';
import { ChartsSettingsService } from '../../../../shared/charts-settings.service';
import { SanierungProjekt } from '../../sanierungprojekt';

@Component({
  selector: 'app-chart-gkosten-sanierung',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-gkosten-sanierung.component.html',
  styleUrl: './chart-gkosten-sanierung.component.css',
  host: {
    class: 'host-chart host-chart1',
  },
})
export class ChartGkostenSanierungComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private sanierungService: SanierungService,
    private styleService: ChartsSettingsService
  ) {}

  ngOnInit(): void {
    this.sanierungService.currentOutputSanierung$.subscribe(
      (projekt: SanierungProjekt) => {
        this.barChartData.datasets[0].data = [Math.round(projekt.baukosten), 0];
        this.barChartData.datasets[1].data = [
          0,
          Math.round(projekt.bankKredit),
        ];
        this.barChartData.datasets[2].data = [0, Math.round(projekt.kfwKredit)];
        this.barChartData.datasets[3].data = [
          0,
          Math.round(projekt.kfwZuschuss),
        ];
        // this.barChartData.datasets[4].data = [0, Math.round(value.finanzierungskostenFinanzmarkt)];
        // this.barChartData.datasets[5].data = [0, Math.round(value.finanzierungskostenKfw)];
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
        stacked: true,
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
        stacked: true,
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
          text: 'Gesamtkosten [€]',
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
    labels: ['Kosten', 'Fin.'],
    datasets: [
      {
        // Investitionskosten
        data: [0, null],
        label: 'Investitionskosten',
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.colors[0].backgroundColor,
        borderColor: this.styleService.datasets.colors[0].borderColor,
        hoverBackgroundColor:
          this.styleService.datasets.colors[0].hoverBackgroundColor,
      },
      {
        // Bank Kredit
        data: [null, 0],
        label: 'Bank Kredit',
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.colors[1].backgroundColor,
        borderColor: this.styleService.datasets.colors[1].borderColor,
        hoverBackgroundColor:
          this.styleService.datasets.colors[1].hoverBackgroundColor,
      },
      {
        // KfW Kredit
        data: [null, 0],
        label: 'KfW Kredit',
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.colors[2].backgroundColor,
        borderColor: this.styleService.datasets.colors[2].borderColor,
        hoverBackgroundColor:
          this.styleService.datasets.colors[2].hoverBackgroundColor,
      },
      {
        // KfW Zuschuss
        data: [null, 0],
        label: 'KfW Zuschuss',
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
