import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanierungService } from './sanierung.service';
import { FormProjektSanierungComponent } from './form-projekt-sanierung/form-projekt-sanierung.component';
import { FormDarlehenSanierungComponent } from './form-darlehen-sanierung/form-darlehen-sanierung.component';
import { ChartsProjektSanierungComponent } from './charts-projekt-sanierung/charts-projekt-sanierung.component';
import { ChartsDarlehenSanierungComponent } from './charts-darlehen-sanierung/charts-darlehen-sanierung.component';
import { NumbersProjektSanierungComponent } from './numbers-projekt-sanierung/numbers-projekt-sanierung.component';
import { NumbersDarlehenSanierungComponent } from './numbers-darlehen-sanierung/numbers-darlehen-sanierung.component';
import { TitleComponent } from '../../title/title.component';
import { fadeInAnimation } from '../../shared/animations';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FormProjektSanierungComponent,
    FormDarlehenSanierungComponent,
    ChartsProjektSanierungComponent,
    ChartsDarlehenSanierungComponent,
    NumbersProjektSanierungComponent,
    NumbersDarlehenSanierungComponent
  ],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'host-tool',
  },
  animations: [
    fadeInAnimation
  ]
})
export class SanierungComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at sanierungprojekt.ts

  // Information for the title
  title = 'Sanierung Wohngebäude';
  kfwId = '261';
  kfwH2 = 'Bundesförderung für Effiziente Gebäude';
  kfwH3 = 'Haus und Wohnung energieeffizient sanieren';
  kfwDescription = 'Gefördert wird die Komplettsanierung zum Effizienzhaus oder die Umwidmung von Nichtwohnfläche in Wohnfläche. Erreichen Sie die Effizienz­haus-Stufe 85 oder besser, fördern wir Ihr Vorhaben mit einem Kredit­betrag von bis zu 120.000 Euro je Wohneinheit. Der maximale Kredit­betrag steigt auf 150.000 Euro je Wohn­einheit, wenn Ihre Immobilie zusätzlich die Kriterien für eine Erneuerbare-Energien-Klasse oder eine Nachhaltigkeits-Klasse erreicht. In Abhängigkeit zur Effizienzhaus-Stufe erhalten sie zudem einen Tilgungs­zuschuss von bis zu 30%. <a target="_blank" rel="noopener noreferrer" href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Bundesf%C3%B6rderung-f%C3%BCr-effiziente-Geb%C3%A4ude-Wohngeb%C3%A4ude-Kredit-(261-262)">kfw.de ↗</a><br /><br /><p><u>Datengrundlage:</u> Die vom Tool generierten Daten und Kosten­kennwerte basieren auf der Forschungs­arbeit der <a target="_blank" rel="noopener noreferrer" href="https://arge-ev.de/arge-ev/publikationen/studien/">Arge e.V. ↗</a> und stammen spezifisch aus den Untersuchungen zu Wohnungsbau // Die Zukunft des Bestandes, Bauforschungs­bericht Nr. 82 und Status und Prognose: So baut Deutschland – so wohnt Deutschland, Der Chancen-Check für den Wohnungsbau, Bauforschungs­bericht Nr. 86. Die KfW relevanten Daten­kennwerte zu Zinsen und Zuschüssen stammen von der Webseite der KfW und werden in regelmäßigen Abständen aktualisiert.</p>';

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  constructor(public sanierungService: SanierungService) {
    // Service is used to check the current tab (Projekt or Darlehen).
  }
}
