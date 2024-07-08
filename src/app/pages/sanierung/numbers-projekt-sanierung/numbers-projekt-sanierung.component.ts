import { Component, OnInit } from '@angular/core';
import { SanierungService } from '../sanierung.service';
import { SanierungProjekt } from '../sanierungprojekt';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { allgemein, sanierung } from '../../../shared/tooltips';
import { TooltipDirective } from '../../../shared/tooltip.directive';
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'app-numbers-projekt-sanierung',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './numbers-projekt-sanierung.component.html',
  styleUrl: './numbers-projekt-sanierung.component.css',
  host: {
    class: 'dashboard-numbers',
  },
})
export class NumbersProjektSanierungComponent implements OnInit {
  output!: SanierungProjekt;
  investitionskosten: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  kfwZuschuss: number = 0;
  kfwZuschussPercent: number = 0;
  KfwKreditschwelleProWe: number = 0;

  constructor(
    private sanierungService: SanierungService,
    public allgemeinTooltips: allgemein,
    public sanierungTooltips: sanierung
  ) {}

  ngOnInit(): void {
    this.sanierungService.currentOutputSanierung$.subscribe((value) => {
      this.output = value;
      this.investitionskosten = this.output.baukosten;
      this.bankKredit = this.output.bankKredit;
      this.kfwKredit = this.output.kfwKredit;
      this.kfwZuschuss = this.output.kfwZuschuss;
      this.kfwZuschussPercent = this.output.kfwZuschussPercentage;
      this.KfwKreditschwelleProWe = this.output.kfwKreditschwelleProWe;
    });
  }
}
