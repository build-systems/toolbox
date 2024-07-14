import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { einzelmassnahmen as einzelmassnahmenTooltips } from '../../../shared/tooltips';
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
  baupreisindexErrechnet: number = 0;
  gesamtPreisindex: number = 0;

  constructor(
    public einzelmassnahmenService: EinzelmassnahmenService,
    public einzelmassnahmenTooltips: einzelmassnahmenTooltips
  ) {}
}
