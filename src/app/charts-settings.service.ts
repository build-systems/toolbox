import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartsSettingsService {
  public ticks = {
    color: '#999',
    font: {
      family: 'system-ui',
      size: 12,
      weight: 400,
    },
  };

  public grid = {
    color: '#333',
  }

  public title = {
    color: 'white',
    font: {
      family: 'Montserrat',
      size: 18,
      weight: 400,
    },
  };

  public labels = {
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
  };

  public datasets = {
    borderWidth: 1,
    color01: {
      backgroundColor: 'rgba(58, 149, 194, 0.6)',
      borderColor: 'rgb(58, 149, 194)',
      hoverBackgroundColor: 'rgb(58, 149, 194)',
    },
    color02: {
      backgroundColor: 'rgba(144, 141, 194, 0.6)',
      borderColor: 'rgb(144, 141, 194)',
      hoverBackgroundColor: 'rgb(144, 141, 194)',
    },
    color03: {
      backgroundColor: 'rgba(52, 103, 194, 0.6)',
      borderColor: 'rgb(52, 103, 194)',
      hoverBackgroundColor: 'rgb(52, 103, 194)',
    },
    color04: {
      backgroundColor: 'rgba(58, 194, 150, 0.6)',
      borderColor: 'rgb(58, 194, 150)',
      hoverBackgroundColor: 'rgb(58, 194, 150)',
    },
    color05: {
      backgroundColor: 'rgba(57, 190, 193, 0.6)',
      borderColor: 'rgb(57, 190, 193)',
      hoverBackgroundColor: 'rgb(57, 190, 193)',
    },
    color06: {
      backgroundColor: 'rgba(58, 194, 104, 0.6)',
      borderColor: 'rgb(58, 194, 104)',
      hoverBackgroundColor: 'rgb(58, 194, 104)',
    },
  };

  constructor() {}
}
