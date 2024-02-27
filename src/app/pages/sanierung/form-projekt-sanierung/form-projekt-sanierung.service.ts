import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormProjektSanierungService {
  userPrice: userPriceObj = {
    min: 100,
    value: 3000,
    max: 10000,
    step: 10,
    title: 'Kostenberechnung [€/m²] ',
    description: 'Geben Sie hier Kosten ein, die Sie selbst oder mit Hilfe Ihrer Expert:innen kalkuliert haben. Dabei sollten folgende Kostengruppen nach DIN276 berücksichtigt werden: KG 300 & 400.',
    disabled: true,
  };

  // Wohnfläche centralized form values
  wohnflaeche: wohnflaecheObj = {
    min: 20,
    value: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²] ',
    description: 'Tragen Sie hier die Wohnfläche Ihrer Immobilie nach "Wohnflächenverordnung - WoFlV" ein.',
    disabled: false,
  };
  // Wohnflächenverordnung - WoFlV https://www.gesetze-im-internet.de/woflv/

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    value: 10,
    max: 100,
    step: 1,
    title: 'Anzahl Wohnungen ',
    description: 'Hier wird bestimmt, wie viele Wohneinheiten sich in Ihrer Immobilien befinden. Zu einer Wohnung oder Wohn­einheit gehört ein eigener Zugang, eine Küche oder Koch­nische, Bade­zimmer und Toilette. Die Wohnung muss zur dauer­haften Wohn­nutzung geeignet und bestimmt sein. Eine Einlieger­wohnung zählt als separate Wohnung, wenn sie abge­schlossen ist. Bei Sanierung berück­sichtigen wir die Anzahl der Wohnungen nach Sanierung.',
    disabled: false,
  };

  energiestandard: EnergiestandardSanierungObj = {
    options: [
      { id: 'enstd1', value: 'EH 40', disabled: false },
      { id: 'enstd2', value: 'EH 55', disabled: false },
      { id: 'enstd3', value: 'EH 70', disabled: false },
      { id: 'enstd4', value: 'EH 85', disabled: false },
    ],
    title: 'Stufe Energieeffizienzhaus ',
    description: 'Das Effizienz­haus ist ein technischer Standard, den die KfW in ihren Förder­produkten nutzt und der entsprechend in der Bundesförderung für effiziente Gebäude (BEG) verankert ist. Die Zahlen­werte 40, 55, 70, 85 geben an, wie viel Primärenergiebedarf ein energie­effizientes Gebäude im Vergleich zu einem Referenz­gebäude (nach Gebäude­energie­gesetz) hat. Es gilt: Je niedriger die Zahl, desto höher ist die Energie­effizienz. Der Standard eines Effizienz­hauses ergibt sich immer aus der Kombination verschiedener baulicher und technischer Maßnahmen, vor allem aus den Bereichen Gebäudehülle und Haustechnik.',
  };
  // Effizienz­haus https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/Energieeffizient-sanieren/Das-Effizienzhaus/
  
  // Zusätzliche Nachhaltigkeitskriterien
  foerderbonus: FoerderbonusObj = {
    options: [
      { id: 'kn', value: 'Keine', text: 'Keine', disabled: false },
      { id: 'ee', value: 'EE', text: 'EE-Klasse', disabled: false },
      { id: 'nh', value: 'NH', text: 'NH-Klasse', disabled: false },
    ],
    title: 'Förderbonus ',
    description:
      'Mit der Erneuerbare-Energien-Klasse steigt der maximale Kredit­betrag von 120.000 Euro auf 150.000 Euro je Wohn­einheit und Sie erhalten 5% mehr Tilgungszuschuss. Diese können Sie in Anspruch nehmen, wenn Sie im Zuge der Sanierung zum Effizienz­haus eine neue Heizungs­anlage auf Basis erneuer­barer Energien einbauen und damit mindestens 65 % des Energie­bedarfs des Gebäudes gedeckt wird. Die höhere Förderung erhalten Sie auch, wenn mindestens 65 % des Energie­bedarfs des Hauses zum Teil oder ganz durch unvermeidbare Abwärme erbracht werden. Sie können die EE- und NH-Klasse nicht miteinander kombinieren. Mit der Nachhaltigkeitsklasse steigt der maximale Kredit­betrag von 120.000 Euro auf 150.000 Euro je Wohn­einheit und Sie erhalten 5% mehr Tilgungszuschuss. Diese können Sie in Anspruch nehmen, wenn Ihr Wohn­gebäude Gebäude die Anforderungen des staatlichen „Qualitäts­siegels Nachhaltiges Gebäude“ erfüllt. Sie können die EE- und NH-Klasse nicht miteinander kombinieren.',
  };

  worstPerformingBuilding: WorstPerformingBuildingObj = {
    value: false,
    title: 'Worst Performing Building ',
    description:
      'Erfüllt Ihre Immobilie diese Anforderung erhalten Sie 10 % mehr Tilgungszuschuss. Ein „Worst Performing Building" ist ein Gebäude, das hinsichtlich des energetischen Sanierungs­zustands zu den schlechtesten 25 % der Gebäude in Deutschland gehört. Ein Wohngebäude definieren wir als Worst Performing Building, wenn das Gebäude laut Energie­ausweis in die Klasse H fällt. Eine Immobilie zählt ebenfalls zu den Worst Performing Buildings, wenn das Gebäude 1957 oder früher gebaut wurde und mindestens 75 % der Außen­wand­fläche nicht energetisch saniert sind.',
    disabled: false,
  };

  // Martin metioned this is more for big enterprises?
  // Should it be activated after a certain square meters?
  serielleSanierung: SerielleSanierungObj = {
    value: false,
    title: 'Serielle Sanierung ',
    description:
      'Wenn Sie mit einer Seriellen Sanierung die Effizienzhaus-Stufe 40 oder 55 erreichen, erhalten Sie 15 % Extra-Tilgungszuschuss. Für eine Serielle Sanierung werden vorgefertigte Bauele­mente für Fassa­de und gegebenen­falls Dach verwendet.',
    disabled: false,
  };

  // Umfänglichkeit bisher durchgeführter Modernisierung (old Zustand Bestand)
  umfangModernisierung: UmfangModernisierungObj = {
    options: [
      { id: 'umfmod1', value: 'Nicht/gering', disabled: false },
      { id: 'umfmod2', value: 'Größtenteils', disabled: false },
      { id: 'umfmod3', value: 'Umfassend', disabled: false },
    ],
    title: 'Umfänglichkeit bisher durchgeführter Modernisierung ',
    description: 'Diese Kategorie beschreibt den aktuellen Modernisierungszustand des Gebäudes zum Zeitpunkt vor der Umsetzung von Maßnahmen, die durch die KfW gefördert werden sollen. Dabei steht der Umfang der energetischen Modernisierungen an wesentlichen Bauteilen der Gebäudehülle und der Anlagentechnik in Verbindung mit dessen Ausführungsqualität wie Umfang, Materialien, Komponenten, Ausführungsart, energetischer Standard etc. im Fokus. Ein Gebäude wird als nicht/gering modernisiert bezeichnet, wenn seit der Errichtung keine energetischen Modernisierungen bzw. nur an einzelnen Bauteilen der Gebäudehülle und/oder Teilen der Anlagentechnik durchgeführt wurden. Größtenteils modernisiert bedeutet, dass energetische Modernisierungen an einigen/mehreren Bauteilen der Gebäudehülle und Anlagentechnik durchgeführt wurden, während der Zustand umfassend modernisiert eine ganzheitliche energetische Modernisierung bedingt. Die Kategorie Größtenteils modernisiert wird mit erhöhten Kostenkennwerten bewertet, da es gegebenenfalls zusätzlich zu Rückbauarbeiten oder Mehraufwand kommen kann.',
  };

  // Zertifizierung warning: if user try to select conflicting
  public noQNG: boolean = false;

  projektFormSanierung = this.fb.group({
    userPriceToggle: false,
    userPriceRange: [
      this.userPrice.value,
      [Validators.min(this.userPrice.min), Validators.max(this.userPrice.max)],
    ],
    userPrice: [
      this.userPrice.value,
      {
        Validators: [
          Validators.min(this.userPrice.min),
          Validators.max(this.userPrice.max),
        ],
        updateOn: 'blur',
      },
    ],
    wohnflaecheRange: [
      this.wohnflaeche.value,
      [
        Validators.required,
        Validators.min(this.wohnflaeche.min),
        Validators.max(this.wohnflaeche.max),
      ],
    ],
    wohnflaeche: [
      this.wohnflaeche.value,
      {
        Validators: [
          Validators.required,
          Validators.min(this.wohnflaeche.min),
          Validators.max(this.wohnflaeche.max),
        ],
        updateOn: 'blur',
      },
    ],
    anzahlWohnungenRange: [
      this.anzahlWohnungen.value,
      [
        Validators.required,
        Validators.min(this.anzahlWohnungen.min),
        Validators.max(this.anzahlWohnungen.max),
      ],
    ],
    anzahlWohnungen: [
      this.anzahlWohnungen.value,
      {
        Validators: [
          Validators.required,
          Validators.min(this.anzahlWohnungen.min),
          Validators.max(this.anzahlWohnungen.max),
        ],
        updateOn: 'blur',
      },
    ],
    energiestandard: this.energiestandard.options[0].value,
    foerderbonus: this.foerderbonus.options[0].value,
    worstPerformingBuilding: this.worstPerformingBuilding.value,
    serielleSanierung: this.serielleSanierung.value,
    umfangModernisierung: this.umfangModernisierung.options[0].value,
  });

  constructor(private fb: FormBuilder) {
    //User price
    this.projektFormSanierung
      .get('userPriceToggle')
      ?.valueChanges.subscribe((value) => {
        this.umfangModernisierung.options.forEach((obj) => (obj.disabled = value!));
      });

    // User Price
    this.projektFormSanierung
      .get('userPriceRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range changes
        this.projektFormSanierung
          .get('userPrice')
          ?.setValue(value, { emitEvent: false });
      });

    this.projektFormSanierung
      .get('userPrice')
      ?.valueChanges.subscribe((value) => {
        // Condition to avoid non-numeric or numbers unrealistically small
        if (value && value >= this.userPrice.min) {
          // Update range input when number changes
          this.projektFormSanierung
            .get('userPriceRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormSanierung
            .get('userPriceRange')
            ?.setValue(this.userPrice.min, { emitEvent: false });
          this.projektFormSanierung
            .get('userPrice')
            ?.setValue(this.userPrice.min, { emitEvent: false });
        }
      });

    // Wohnflaeche
    this.projektFormSanierung
      .get('wohnflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormSanierung
          .get('wohnflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.projektFormSanierung
      .get('wohnflaeche')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.wohnflaeche.min) {
          // Update range input when number input changes
          this.projektFormSanierung
            .get('wohnflaecheRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormSanierung
            .get('wohnflaecheRange')
            ?.setValue(this.wohnflaeche.min, { emitEvent: false });
          this.projektFormSanierung
            .get('wohnflaeche')
            ?.setValue(this.wohnflaeche.min, { emitEvent: false });
        }
      });

    // Anzahl WohnungenRange
    this.projektFormSanierung
      .get('anzahlWohnungenRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormSanierung
          .get('anzahlWohnungen')
          ?.setValue(value, { emitEvent: false });
      });

    this.projektFormSanierung
      .get('anzahlWohnungen')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.anzahlWohnungen.min) {
          // Update range input when number input changes
          this.projektFormSanierung
            .get('anzahlWohnungenRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormSanierung
            .get('anzahlWohnungenRange')
            ?.setValue(this.anzahlWohnungen.min, { emitEvent: false });
          this.projektFormSanierung
            .get('anzahlWohnungen')
            ?.setValue(this.anzahlWohnungen.min, { emitEvent: false });
        }
      });

    // Energiestandard
    this.projektFormSanierung
      .get('energiestandard')
      ?.valueChanges.subscribe((value) => {
        // Relationship with Zertifizierung
        const zertifizierung = this.projektFormSanierung.get('zertifizierung');
        if (value != 'EH 40') {
          // Disable mit QNG Siegel
          // this.zertifizierung.options[0].disabled = true;
          this.noQNG = true;
        } else {
          // Enable mit QNG Siegel
          // this.zertifizierung.options[0].disabled = false;
          this.noQNG = false;
        }
      });
  }
}
