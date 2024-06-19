import { Component, effect, signal } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { einzelmassnahmen as einzelmassnahmenTooltips } from '../../../shared/tooltips';
import { EinzelmassnahmenService } from '../einzelmassnahmen.service';
import { FormEinzelmassnahmenService } from '../form-einzelmassnahmen/form-einzelmassnahmen.service';
registerLocaleData(localeDe, 'de');
import { einzelmassnahmen } from '../../../shared/constants';

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

  baupreisindexErrechnet: number = 0;
  gesamtPreisindex: number = 0;

  constructor(
    public einzelmassnahmenService: EinzelmassnahmenService,
    private formService: FormEinzelmassnahmenService,
    private constants: einzelmassnahmen,
    public einzelmassnahmenTooltips: einzelmassnahmenTooltips
  ) {
    effect(() => {
      this.baupreisindexErrechnet =
        this.einzelmassnahmenService.calculateBaupreisindexErrechnet(
          this.constants.baupreisindexAktuell,
          this.constants.baupreisindex2015
        );
    });
    effect(() => {
      this.gesamtPreisindex =
        this.einzelmassnahmenService.calculateGesamtPreisindex(
          this.baupreisindexErrechnet,
          this.constants.ortsfaktor
        );
    });
    effect(() => {
      if (this.formService.bauteilSelected() === 'Fenster')
        this.kostenM2 = einzelmassnahmenService.calculateFensterKostenM2(
          this.formService.fensterSelected(),
          this.formService.fensterflaecheValue(),
          this.gesamtPreisindex
        );
    });
  }
}
