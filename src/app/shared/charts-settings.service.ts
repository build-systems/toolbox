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
    // Original
    color01: {
      backgroundColor: 'rgba(58, 149, 194, 0.3)',
      borderColor: 'rgb(58, 149, 194)',
      hoverBackgroundColor: 'rgb(58, 149, 194)',
    },
    // 	0 106 255
    // Var 01 - Normal pallete
    // color01: {
    //   backgroundColor: 'rgba(0, 106, 255)',
    //   borderColor: 'rgb(0, 106, 255)',
    //   hoverBackgroundColor: 'rgb(0, 106, 255)',
    // },
    // Var 02 - Normal pallete with transparency
    // color01: {
    //   backgroundColor: 'rgba(0, 106, 255, 0.6)',
    //   borderColor: 'rgb(0, 106, 255)',
    //   hoverBackgroundColor: 'rgb(0, 106, 255)',
    // },
    // 0 84 204
    // Var 03 - Darker
    // color01: {
    //   backgroundColor: 'rgba(0, 84, 204)',
    //   borderColor: 'rgb(0, 84, 204)',
    //   hoverBackgroundColor: 'rgb(0, 84, 204)',
    // },
    // Var 04 - Darker with transparency
    // color01: {
    //   backgroundColor: 'rgba(0, 84, 204, 0.6)',
    //   borderColor: 'rgb(0, 84, 204)',
    //   hoverBackgroundColor: 'rgb(0, 84, 204)',
    // },
    // 11 104 220
    // Var 05 - Figma colors 01
    // color01: {
    //   backgroundColor: 'rgba(11, 104, 220)',
    //   borderColor: 'rgb(11, 104, 220)',
    //   hoverBackgroundColor: 'rgb(11, 104, 220)',
    // },
    // Var 06 - Figma colors 01 with transparency
    // color01: {
    //   backgroundColor: 'rgba(11, 104, 220, 0.6)',
    //   borderColor: 'rgb(11, 104, 220)',
    //   hoverBackgroundColor: 'rgb(11, 104, 220)',
    // },
    // 133 179 237
    // Var 07 - Figma colors 02
    // color01: {
    //   backgroundColor: 'rgba(133, 179, 237)',
    //   borderColor: 'rgb(133, 179, 237)',
    //   hoverBackgroundColor: 'rgb(133, 179, 237)',
    // },
    // Var 08 - Figma colors 02 with transparency
    // color01: {
    //   backgroundColor: 'rgba(133, 179, 237, 0.6)',
    //   borderColor: 'rgb(133, 179, 237)',
    //   hoverBackgroundColor: 'rgb(133, 179, 237)',
    // },


    // Original
    // color02: {
    //   backgroundColor: 'rgba(144, 141, 194, 0.6)',
    //   borderColor: 'rgb(144, 141, 194)',
    //   hoverBackgroundColor: 'rgb(144, 141, 194)',
    // },
    // 255 104 52
    // Var 01 - Normal pallete
    // color02: {
    //   backgroundColor: 'rgba(255, 104, 52)',
    //   borderColor: 'rgb(255, 104, 52)',
    //   hoverBackgroundColor: 'rgb(255, 104, 52)',
    // },
    // Var 02 - Normal pallete with transparency
    // color02: {
    //   backgroundColor: 'rgba(255, 104, 52, 0.6)',
    //   borderColor: 'rgb(255, 104, 52)',
    //   hoverBackgroundColor: 'rgb(255, 104, 52)',
    // },
    // 204 83 41
    // Var 03 - Darker
    // color02: {
    //   backgroundColor: 'rgba(204, 83, 41)',
    //   borderColor: 'rgb(204, 83, 41)',
    //   hoverBackgroundColor: 'rgb(204, 83, 41)',
    // },
    // Var 04 - Darker with transparency
    // color02: {
    //   backgroundColor: 'rgba(204, 83, 41, 0.6)',
    //   borderColor: 'rgb(204, 83, 41)',
    //   hoverBackgroundColor: 'rgb(204, 83, 41)',
    // },
    // 252 103 51
    // Var 05 - Figma colors 01
    // color02: {
    //   backgroundColor: 'rgba(252, 103, 51)',
    //   borderColor: 'rgb(252, 103, 51)',
    //   hoverBackgroundColor: 'rgb(252, 103, 51)',
    // },
    // Var 06 - Figma colors 01 with transparency
    // color02: {
    //   backgroundColor: 'rgba(252, 103, 51, 0.6)',
    //   borderColor: 'rgb(252, 103, 51)',
    //   hoverBackgroundColor: 'rgb(252, 103, 51)',
    // },
    // 253 179 153
    // Var 07 - Figma colors 02
    // color02: {
    //   backgroundColor: 'rgba(253, 179, 153)',
    //   borderColor: 'rgba(253, 179, 153)',
    //   hoverBackgroundColor: 'rgba(253, 179, 153)',
    // },
    // Var 08 - Figma colors 02 with transparency
    color02: {
      backgroundColor: 'rgba(253, 179, 153, 0.3)',
      borderColor: 'rgba(253, 179, 153)',
      hoverBackgroundColor: 'rgba(253, 179, 153)',
    },

    // Original
    // color03: {
    //   backgroundColor01: 'rgba(52, 103, 194, 0.6)',
    //   backgroundColor02: 'rgba(52, 103, 194, 0.2)',
    //   borderColor: 'rgb(52, 103, 194)',
    //   hoverBackgroundColor: 'rgb(52, 103, 194)',
    // },
    // 255 230 32
    // Var 01 -Normal pallete
    // color03: {
    //   backgroundColor: 'rgba(255, 230, 32)',
    //   borderColor: 'rgba(255, 230, 32)',
    //   hoverBackgroundColor: 'rgba(255, 230, 32)',
    // },
    // 255 230 32
    // Var 02 -Normal pallete with transparency
    // color03: {
    //   backgroundColor: 'rgba(255, 230, 32, 0.6)',
    //   borderColor: 'rgba(255, 230, 32)',
    //   hoverBackgroundColor: 'rgba(255, 230, 32)',
    // },
    // 204 184 25
    // Var 03 - Darker
    // color03: {
    //   backgroundColor: 'rgba(204, 184, 25)',
    //   borderColor: 'rgba(204, 184, 25)',
    //   hoverBackgroundColor: 'rgba(204, 184, 25)',
    // },
    // Var 04 - Darker with transparency
    // color03: {
    //   backgroundColor: 'rgba(204, 184, 25, 0.6)',
    //   borderColor: 'rgba(204, 184, 25)',
    //   hoverBackgroundColor: 'rgba(204, 184, 25)',
    // },
    // 249 220 97
    // Var 05 - Figma colors 01
    // color03: {
    //   backgroundColor: 'rgba(249, 220, 97)',
    //   borderColor: 'rgba(249, 220, 97)',
    //   hoverBackgroundColor: 'rgba(249, 220, 97)',
    // },
    // Var 06 - Figma colors 01 with transparency
    // color03: {
    //   backgroundColor: 'rgba(249, 220, 97, 0.6)',
    //   borderColor: 'rgba(249, 220, 97)',
    //   hoverBackgroundColor: 'rgba(249, 220, 97)',
    // },
    // Var 07 - Figma colors 02
    // color03: {
    //   backgroundColor: 'rgba(252, 237, 176)',
    //   borderColor: 'rgba(252, 237, 176)',
    //   hoverBackgroundColor: 'rgba(252, 237, 176)',
    // },
    // Var 08 - Figma colors 02 with transparency
    // color03: {
    //   backgroundColor: 'rgba(252, 237, 176, 0.6)',
    //   borderColor: 'rgba(252, 237, 176)',
    //   hoverBackgroundColor: 'rgba(252, 237, 176)',
    // },
    color03: {
      backgroundColor01: 'rgba(249, 220, 130, 0.3)',
      backgroundColor02: 'rgba(249, 220, 97, 0.2)',
      borderColor: 'rgba(249, 220, 97)',
      hoverBackgroundColor: 'rgba(249, 220, 97)',
    },

    // Original
    color04: {
      backgroundColor01: 'rgba(58, 194, 150, 0.3)',
      backgroundColor02: 'rgba(58, 194, 150, 0.1)',
      borderColor: 'rgb(58, 194, 150)',
      hoverBackgroundColor: 'rgb(58, 194, 150)',
    },
    // 0	180	30
    // Var 01 - Normal pallete
    // color04: {
    //   backgroundColor: 'rgba(0, 180, 30)',
    //   borderColor: 'rgb(0, 180, 30)',
    //   hoverBackgroundColor: 'rgb(0, 180, 30)',
    // },
    // Var 02 - Normal pallete with transparency
    // color04: {
    //   backgroundColor: 'rgba(0, 180, 30, 0.6)',
    //   borderColor: 'rgb(0, 180, 30)',
    //   hoverBackgroundColor: 'rgb(0, 180, 30)',
    // },
    // 0 100 16
    // Var 03 - Darker
    // color04: {
    //   backgroundColor: 'rgba(0, 100, 16)',
    //   borderColor: 'rgb(0, 100, 16)',
    //   hoverBackgroundColor: 'rgb(0, 100, 16)',
    // },
    // Var 04 - Darker with transparency
    // color04: {
    //   backgroundColor: 'rgba(0, 100, 16, 0.6)',
    //   borderColor: 'rgb(0, 100, 16)',
    //   hoverBackgroundColor: 'rgb(0, 100, 16)',
    // },
    // 36 181 74
    // Var 05 - Figma colors 01
    // color04: {
    //   backgroundColor: 'rgba(36, 181, 74)',
    //   borderColor: 'rgb(36, 181, 74)',
    //   hoverBackgroundColor: 'rgb(36, 181, 74)',
    // },
    // Var 06 - Figma colors 01 with transparency
    // color04: {
    //   backgroundColor: 'rgba(36, 181, 74, 0.6)',
    //   borderColor: 'rgb(36, 181, 74)',
    //   hoverBackgroundColor: 'rgb(36, 181, 74)',
    // },
    // Var 07 - Figma colors 02
    // color04: {
    //   backgroundColor: 'rgba(145, 218, 164)',
    //   borderColor: 'rgba(145, 218, 164)',
    //   hoverBackgroundColor: 'rgba(145, 218, 164)',
    // },
    // Var 08 - Figma colors 02 with transparency
    // color04: {
    //   backgroundColor: 'rgba(145, 218, 164, 0.6)',
    //   borderColor: 'rgba(145, 218, 164)',
    //   hoverBackgroundColor: 'rgba(145, 218, 164)',
    // },
    // color04: {
    //   backgroundColor01: 'rgba(36, 181, 74, 1)',
    //   backgroundColor02: 'rgba(36, 181, 74, 0)',
    //   borderColor: 'rgb(36, 181, 74)',
    //   hoverBackgroundColor: 'rgb(36, 181, 74)',
    // },

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
  
  public applyLinearGradient(barBottom: number, barTop: number, color01: string, color02: string){
    const ctx = document.createElement('canvas').getContext('2d');
    const gradient = ctx!.createLinearGradient(0, barBottom, 0, barTop);
    gradient.addColorStop(0, color01);
    gradient.addColorStop(1, color02);
    return gradient;
  }

  constructor() {}
}
