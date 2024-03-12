import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeubauService } from './neubau.service';
import { FormProjektNeubauComponent } from './form-projekt-neubau/form-projekt-neubau.component';
import { FormDarlehenNeubauComponent } from './form-darlehen-neubau/form-darlehen-neubau.component';
import { ChartsProjektNeubauComponent } from './charts-projekt-neubau/charts-projekt-neubau.component';
import { ChartsDarlehenNeubauComponent } from './charts-darlehen-neubau/charts-darlehen-neubau.component';
import { NumbersProjektNeubauComponent } from './numbers-projekt-neubau/numbers-projekt-neubau.component';
import { NumbersDarlehenNeubauComponent } from './numbers-darlehen-neubau/numbers-darlehen-neubau.component';
import { TitleComponent } from '../../title/title.component';
import { fadeInAnimation } from '../../shared/animations';
import { HelpComponent } from '../../help/help.component';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FormProjektNeubauComponent,
    FormDarlehenNeubauComponent,
    ChartsProjektNeubauComponent,
    ChartsDarlehenNeubauComponent,
    NumbersProjektNeubauComponent,
    NumbersDarlehenNeubauComponent,
    HelpComponent
  ],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'host-tool',
  },
  animations: [
    fadeInAnimation
  ]
})
export class NeubauComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at neubauprojekt.ts

  // Information for the title section
  title = 'Klimafreundlicher Neubau von Wohngebäuden';
  kfwId = '297/298';
  kfwH2 = 'Bundesförderung für Effiziente Gebäude';
  kfwH3 = 'Haus und Wohnung energieeffizient und nachhaltig bauen';
  kfwDescription = 'Gefördert wird der Neubau von energieeffizienten und nachhaltigen Wohngebäuden Erreichen Sie die Effizienz­haus-Stufe 40 mit der Zertifizierung klimafreundlicher Neubau, fördern wir Ihr Vorhaben mit einem Kredit­betrag von bis zu 100.000 Euro je Wohneinheit. Der maximale Kredit­betrag steigt auf 150.000 Euro je Wohn­einheit, wenn Ihre Immobilie zusätzlich ein Qualitätssigel Nachhaltiges Gebäude vorweisen kann. Aktuell sind die entsprechenden Haushaltsmittel erschöpft, deshalb ist keine Antragstellung möglich. <a target="_blank" rel="noopener noreferrer" href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/F%C3%B6rderprodukte/Klimafreundlicher-Neubau-Wohngeb%C3%A4ude-(297-298)">kfw.de ↗</a> <br /><br /><p><u>Datengrundlage:</u> Die vom Tool generierten Daten und Kosten­kennwerte basieren auf der Forschungs­arbeit der <a target="_blank" rel="noopener noreferrer" href="https://arge-ev.de/arge-ev/publikationen/studien/">Arge e.V. ↗</a> und stammen spezifisch aus den Untersuchungen zu Wohnungsbau // Die Zukunft des Bestandes, Bauforschungs­bericht Nr. 82 und Status und Prognose: So baut Deutschland – so wohnt Deutschland, Der Chancen-Check für den Wohnungsbau, Bauforschungs­bericht Nr. 86. Die Kosten von Holz­bauten werden in der Kostens­chätzung gemäß [TAB-Kurzstudie Nr 3 “Urbaner Holzbau”; S. Kind, C. Bogenstahl, T. Jetzke, S. Richter; Juni 2022; Büro für Technikfolgen-Abschätzung beim Deutschen Bundestag] im Vergleich zu Massivbauten ca. 5% höher angesetzt.</p>';

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  constructor(public neubauService: NeubauService) {
    // Reset was created to make sure the outputs match the form values
    // After doing some changes, going to another route and then coming back the outputs were the same
    // while the form had reset to default values
    // Another solution would be to restore the previous values. But that would require more work.
    // The main problem is that the forms are being reused across different projects/routes
    // So it would require separating the forms.
    // I think it could easily be done using signals
    // neubauService.reset();
  }
}
