import { Injectable } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Injectable({
  providedIn: 'root',
})
export class ChartsSettingsService {
  primary = 'rgba(255, 255, 255, 1)';
  primary90 = 'rgba(255, 255, 255, 0.9)';
  primary80 = 'rgba(255, 255, 255, 0.8)';
  primary70 = 'rgba(255, 255, 255, 0.7)';
  primary50 = 'rgba(255, 255, 255, 0.5)';
  primary30 = 'rgba(255, 255, 255, 0.3)';
  primary20 = 'rgba(255, 255, 255, 0.2)';
  primary10 = 'rgba(255, 255, 255, 0.1)';
  secondary = 'rgba(127, 255, 212, 1)';
  bgPrimary = '#1a1a1a';
  bgPrimary75 = 'rgba(26, 26, 26, 0.75)';
  bgSecondary = '#252525';
  bgTertiary = '#333';
  bgTertiary95 = 'rgba(51, 51, 51, 0.95)';

  public ticks = {
    color: this.primary50,
    font: {
      family: 'ABC Diatype',
      size: 12,
      weight: 300,
    },
  };

  public grid = {
    color: this.primary10,
  };

  public title = {
    color: 'white',
    font: {
      family: 'ABC Diatype',
      size: 18,
      weight: 500,
    },
  };

  public labels = {
    color: this.primary90,
    font: {
      size: 14,
      family: 'ABC Diatype',
      weight: 300,
    },
    boxWidth: 6,
    boxHeight: 6,
    usePointStyle: true,
    pointStyle: 'circle',
  };

  public datasets = {
    borderWidth: 1,
    color01: {
      backgroundColor: 'rgba(58, 149, 194, 0.3)',
      borderColor: 'rgb(58, 149, 194)',
      hoverBackgroundColor: 'rgb(58, 149, 194, 0.7)',
    },
    color02: {
      backgroundColor: 'rgba(255, 150, 130, 0.3)',
      borderColor: 'rgba(255, 179, 153)',
      hoverBackgroundColor: 'rgba(255, 150, 130, 0.7)',
    },
    color03: {
      backgroundColor01: 'rgba(249, 220, 130, 0.3)',
      backgroundColor02: 'rgba(249, 220, 97, 0.2)',
      borderColor: 'rgba(249, 220, 97)',
      hoverBackgroundColor: 'rgba(249, 220, 97, 0.7)',
    },
    color04: {
      backgroundColor01: 'rgba(58, 194, 150, 0.3)',
      backgroundColor02: 'rgba(58, 194, 150, 0.1)',
      borderColor: 'rgb(58, 194, 150)',
      hoverBackgroundColor: 'rgb(58, 194, 150, 0.7)',
    },
    color05: {
      backgroundColor: 'rgba(57, 190, 193, 0.3)',
      borderColor: 'rgb(57, 190, 193)',
      hoverBackgroundColor: 'rgb(57, 190, 193, 0.7)',
    },
    color06: {
      backgroundColor: 'rgba(58, 194, 104, 0.3)',
      borderColor: 'rgb(58, 194, 104)',
      hoverBackgroundColor: 'rgb(58, 194, 104, 0.7)',
    },
  };

  public applyLinearGradient(
    barBottom: number,
    barTop: number,
    color01: string,
    color02: string
  ) {
    const ctx = document.createElement('canvas').getContext('2d');
    const gradient = ctx!.createLinearGradient(0, barBottom, 0, barTop);
    gradient.addColorStop(0, color01);
    gradient.addColorStop(1, color02);
    return gradient;
  }

  constructor() {}
}
