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
    description: 'Price estimation description',
    disabled: true,
  };

  // Wohnfläche centralized form values
  wohnflaeche: wohnflaecheObj = {
    min: 20,
    value: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²] ',
    description: 'Wohnflaeche description',
    disabled: false,
  };

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    value: 10,
    max: 100,
    step: 1,
    title: 'Anzahl Wohnungen ',
    description: 'Anzahl Wohnungen description',
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
    description: 'Stufe Energieeffizienzhaus description',
  };

  // Zusätzliche Nachhaltigkeitskriterien
  foerderbonus: FoerderbonusObj = {
    options: [
      { id: 'kn', value: 'Keine', text: 'Keine', disabled: false },
      { id: 'ee', value: 'EE', text: 'EE-Klasse', disabled: false },
      { id: 'nh', value: 'NH', text: 'NH-Klasse', disabled: false },
    ],
    title: 'Förderbonus ',
    description:
      'Förderbonus description. Erneuerbare-Energien-Klasse und Nachhaltigkeits-Klasse',
  };

  worstPerformingBuilding: WorstPerformingBuildingObj = {
    value: false,
    title: 'Worst Performing Building ',
    description:
      'Ein "Worst Performing Building" ist ein Gebäude, das hinsichtlich des energetischen Sanierungs\u00ADzustands zu den schlechtesten 25% der Gebäude in Deutschland gehört. Erfüllen Sie mit Ihrer Immobilie die Anforderungen an ein Worst Performing Building? Dann steigt Ihr Tilgungs\u00ADzuschuss um 10 Prozentpunkte (kfw.de)',
    disabled: false,
  };

  // Martin metioned this is more for big enterprises?
  // Should it be activated after a certain square meters?
  serielleSanierung: SerielleSanierungObj = {
    value: false,
    title: 'Serielle Sanierung ',
    description:
      'Das heißt, Sie verwenden vorgefertigte Bauele\u00ADmente für Fassa\u00ADde und gegebenen\u00ADfalls Dach. Erreicht Ihre Immobilie im Rahmen der Seriellen Sanierung die Effizienzhaus-Stufe 40 oder 55? Dann steigt Ihr Tilgungs\u00ADzuschuss um 15 Prozentpunkte (kfw.de)',
    disabled: false,
  };

  // Umfänglichkeit bisher durchgeführter Modernisierung (old Zustand Bestand)
  umfangModernisierung: UmfangModernisierungObj = {
    options: [
      { id: 'zusbest1', value: 'Nicht/gering', disabled: false },
      { id: 'zusbest2', value: 'Größtenteils', disabled: false },
      { id: 'zusbest3', value: 'Umfassend', disabled: false },
    ],
    title: 'Umfänglichkeit bisher durchgeführter Modernisierung ',
    description: 'Umfänglichkeit bisher durchgeführter Modernisierung description',
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
