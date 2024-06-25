import { Component, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartsSettingsService } from '../../../shared/charts-settings.service';
import { EinzelmassnahmenService } from '../einzelmassnahmen.service';

@Component({
  selector: 'app-chart-gkosten-einzelmassnahmen',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-gkosten-einzelmassnahmen.component.html',
  styleUrl: './chart-gkosten-einzelmassnahmen.component.css',
  host: {
    class: 'host-chart',
  },
})
export class ChartGkostenEinzelmassnahmenComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    // private neubauService: NeubauService,
    private styleService: ChartsSettingsService,
    private einzelmassnahmenService: EinzelmassnahmenService
  ) {
    effect(() => {
      this.barChartData.datasets = [];
      for (
        let i = 0;
        i < einzelmassnahmenService.listEinzelmassnahmen().length;
        i++
      ) {
        let colorIndex = i % this.styleService.datasets.colors.length;
        const kosten = einzelmassnahmenService.findValueByTitle(
          einzelmassnahmenService.listEinzelmassnahmen()[i],
          'Vollkosten'
        );
        const kostenBafa = kosten * 0.8;
        this.barChartData.datasets.push({
          data: [kosten, kostenBafa],
          label: einzelmassnahmenService.listEinzelmassnahmen()[i].title,
          borderWidth: this.styleService.datasets.borderWidth,
          backgroundColor:
            this.styleService.datasets.colors[colorIndex].backgroundColor,
          borderColor:
            this.styleService.datasets.colors[colorIndex].borderColor,
          hoverBackgroundColor:
            this.styleService.datasets.colors[colorIndex].hoverBackgroundColor,
        });
      }
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
    labels: ['Kosten ohne Förderung', 'Kosten mit Förderung'],
    datasets: [],
  };

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}
}
