import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Chart } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungProjekt } from '../sanierung/sanierungprojekt';
import { SanierungService } from '../sanierung.service';

@Component({
  selector: 'app-chart-finanzierungskosten',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-finanzierungskosten.component.html',
  styleUrl: './chart-finanzierungskosten.component.css',
  host: {
    class: 'ng-chart'
  }
})
export class ChartFinanzierungskostenComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: SanierungProjekt;

  constructor(private sanierungService: SanierungService) { }

  ngOnInit(): void {
    this.sanierungService.currentOutput$.subscribe((value) => {
      this.output = value;
      this.barChartData.datasets[0].data = [Math.round(this.output['ohneKfw']), Math.round(this.output['mitKfw'])];
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
          text: 'Finanzierungskosten [€]'
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