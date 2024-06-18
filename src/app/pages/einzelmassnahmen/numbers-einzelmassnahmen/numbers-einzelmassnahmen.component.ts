import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { einzelmassnahmen } from '../../../shared/tooltips';
import { EinzelmassnahmenService } from '../einzelmassnahmen.service';
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'app-numbers-einzelmassnahmen',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './numbers-einzelmassnahmen.component.html',
  styleUrl: './numbers-einzelmassnahmen.component.css',
  host: {
    class: 'dashboard-numbers',
  },
})
export class NumbersEinzelmassnahmenComponent {
  kostenM2 = 1000;
  kosten = 1000;
  sowiesoKosten = 1000;
  energetischMehrkosten = 1000;

  constructor(
    private einzelmassnahmenService: EinzelmassnahmenService,
    public einzelmassnahmenTooltips: einzelmassnahmen
  ) {}
}
