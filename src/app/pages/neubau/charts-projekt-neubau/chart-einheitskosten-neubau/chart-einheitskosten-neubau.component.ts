import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { NeubauService } from '../../neubau.service';
import { ChartsSettingsService } from '../../../../shared/charts-settings.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { NeubauProjekt } from '../../neubauprojekt';

@Component({
  selector: 'app-chart-einheitskosten-neubau',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-einheitskosten-neubau.component.html',
  styleUrl: './chart-einheitskosten-neubau.component.css',
  host: {
    class: 'host-chart host-chart3',
  },
})
export class ChartEinheitskostenNeubauComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: NeubauProjekt;

  constructor(
    private neubauService: NeubauService,
    private styleService: ChartsSettingsService
  ) {}

  ngOnInit(): void {
    this.neubauService.currentOutputNeubau$.subscribe((value) => {
      this.output = value;
      this.barChartData.datasets[0].data = [
        Math.round(this.output.investitionkostenProBau),
        0,
      ];
      this.barChartData.datasets[1].data = [
        0,
        Math.round(this.output.bankKreditProBau),
      ];
      this.barChartData.datasets[2].data = [
        0,
        Math.round(this.output.kfwKreditschwelleProWe),
      ];
      // this.barChartData.datasets[3].data = [
      //   0,
      //   Math.round(this.output['finanzierungskostenFinanzmarktM2']),
      // ];
      // this.barChartData.datasets[4].data = [
      //   0,
      //   Math.round(this.output['finanzierungskostenKfwM2']),
      // ];
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
          text: 'Kosten pro Wohneinheit [€]',
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
        data: [null, 0],
        label: 'KfW Kredit',
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.colors[2].backgroundColor,
        borderColor: this.styleService.datasets.colors[2].borderColor,
        hoverBackgroundColor:
          this.styleService.datasets.colors[2].hoverBackgroundColor,
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
