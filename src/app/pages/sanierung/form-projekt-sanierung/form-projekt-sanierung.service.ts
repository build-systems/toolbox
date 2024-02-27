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
    title: 'Kostenberechnung [€/m²]',
    disabled: true,
  };

  // Wohnfläche centralized form values
  wohnflaeche: wohnflaecheObj = {
    min: 20,
    value: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²]',
    disabled: false,
  };
  // Wohnflächenverordnung - WoFlV https://www.gesetze-im-internet.de/woflv/

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    value: 10,
    max: 100,
    step: 1,
    title: 'Anzahl Wohnungen',
    disabled: false,
  };

  energiestandard: EnergiestandardSanierungObj = {
    options: [
      { id: 'enstd1', value: 'EH 40', disabled: false },
      { id: 'enstd2', value: 'EH 55', disabled: false },
      { id: 'enstd3', value: 'EH 70', disabled: false },
      { id: 'enstd4', value: 'EH 85', disabled: false },
    ],
    title: 'Stufe Energieeffizienzhaus',
  };
  // Effizienz­haus https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/Energieeffizient-sanieren/Das-Effizienzhaus/
  
  // Zusätzliche Nachhaltigkeitskriterien
  foerderbonus: FoerderbonusObj = {
    options: [
      { id: 'kn', value: 'Keine', text: 'Keine', disabled: false },
      { id: 'ee', value: 'EE', text: 'EE-Klasse', disabled: false },
      { id: 'nh', value: 'NH', text: 'NH-Klasse', disabled: false },
    ],
    title: 'Förderbonus',
  };

  worstPerformingBuilding: WorstPerformingBuildingObj = {
    value: false,
    title: 'Worst Performing Building',
    disabled: false,
  };

  // Martin metioned this is more for big enterprises?
  // Should it be activated after a certain square meters?
  serielleSanierung: SerielleSanierungObj = {
    value: false,
    title: 'Serielle Sanierung',
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
