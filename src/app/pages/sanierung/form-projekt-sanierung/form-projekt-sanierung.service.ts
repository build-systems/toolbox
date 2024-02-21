import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormProjektSanierungService {
  userPrice: userPriceObj = {
    min: 100,
    value: 3000,
    max: 10000,
    step: 10,
    title: 'Price estimation [€/m²] ',
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
    title: 'Energiestandard ',
    description: 'Energiestandard description',
  };

  // Zertifizierung centralized form values
  zertifizierung: ZertifizierungSanierungObj = {
    options: [
      { id: 'zert1', value: 'QNG', text: 'mit QNG Siegel', disabled: false },
      {
        id: 'zert2',
        value: 'Keine Zertifizierung',
        text: 'Keine',
        disabled: false,
      },
    ],
    title: 'Zertifizierung klimafreundlicher ',
    description: 'Zertifizierung klimafreundlicher description',
  };

  // This will be converted to the ABCDEFGH energieaussweis
  worstPerformingBuilding: WorstPerformingBuildingObj = {
    value: true,
    title: 'Worst Performing Building ',
    description:
      'Ein "Worst Performing Building" ist ein Gebäude, das hinsichtlich des energetischen Sanierungs\u00ADzustands zu den schlechtesten 25% der Gebäude in Deutschland gehört. Erfüllen Sie mit Ihrer Immobilie die Anforderungen an ein Worst Performing Building? Dann steigt Ihr Tilgungs\u00ADzuschuss um 10 Prozentpunkte (kfw.de)',
    disabled: false,
  };

  // Martin metioned this is more for big enterprises?
  // Should it be activated after a certain square meters?
  serielleSanierung: SerielleSanierungObj = {
    value: true,
    title: 'Serielle Sanierung ',
    description:
      'Das heißt, Sie verwenden vorgefertigte Bauele\u00ADmente für Fassa\u00ADde und gegebenen\u00ADfalls Dach. Erreicht Ihre Immobilie im Rahmen der Seriellen Sanierung die Effizienzhaus-Stufe 40 oder 55? Dann steigt Ihr Tilgungs\u00ADzuschuss um 15 Prozentpunkte (kfw.de)',
    disabled: false,
  };

  // Zustand Bestand
  zustandBestand: ZustandBestandObj = {
    options: [
      { id: 'zusbest1', value: 'Unsaniert', disabled: false },
      { id: 'zusbest2', value: 'Teilsaniert', disabled: false },
      { id: 'zusbest3', value: 'Umfassend saniert', disabled: false },
    ],
    title: 'Zustand Bestand',
    description: 'Zustand Bestand description',
  };

  // Erneuerbare-Energien-Klasse
  eeKlasse: EeKlasseObj = {
    value: true,
    // title: 'Erneuerbare-Energien-Klasse ',
    title: 'EE-Klasse ',
    description:
      'Die höhere Förderung für die Erneuerbare-Energien-Klasse können Sie in Anspruch nehmen, wenn Sie im Zuge der Sanierung zum Effizienz\u00ADhaus eine neue Heizungs\u00ADanlage auf Basis erneuer\u00ADbarer Energien einbauen und damit mindestens 65% des Energie\u00ADbedarfs des Gebäudes gedeckt wird. Die höhere Förderung erhalten Sie auch, wenn mindestens 65% des Energie\u00ADbedarfs des Hauses zum Teil oder ganz durch unvermeidbare Abwärme erbracht werden (kfw.de)',
    disabled: false,
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
    zertifizierung: this.zertifizierung.options[0].value,
    worstPerformingBuilding: this.worstPerformingBuilding.value,
    serielleSanierung: this.serielleSanierung.value,
    zustandBestand: this.zustandBestand.options[0].value,
    eeKlasse: this.eeKlasse.value,
  });

  // Observable and set function for user price toggle
  private userPriceToggleSource = new BehaviorSubject<boolean>(
    this.userPrice.disabled
  );
  currentUserPriceToggle$ = this.userPriceToggleSource.asObservable();

  // Here it has to be the oposite of the toggle (!data)
  public setUserPriceToggle(data: boolean) {
    this.userPriceToggleSource.next(!data);
    // Disable all the following form elements
    this.zustandBestand.options.forEach((obj) => (obj.disabled = data));
  }

  constructor(private fb: FormBuilder) {
    //User price
    this.projektFormSanierung
      .get('userPriceToggle')
      ?.valueChanges.subscribe((value) => {
        this.zustandBestand.options.forEach((obj) => (obj.disabled = value!));
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
          if (zertifizierung?.value === 'QNG') {
            zertifizierung?.setValue('Keine Zertifizierung');
          }
          // Disable mit QNG Siegel
          this.zertifizierung.options[0].disabled = true;
          this.noQNG = true;
        } else {
          // Enable mit QNG Siegel
          this.zertifizierung.options[0].disabled = false;
          this.noQNG = false;
        }
      });

    // Zertifizierung
    this.projektFormSanierung
      .get('zertifizierung')
      ?.valueChanges.subscribe((value) => {
        // Relationship with Energiestandard
        const energiestandard =
          this.projektFormSanierung.get('energiestandard');
        if (value === 'QNG' && energiestandard?.value != 'EH 40') {
          energiestandard?.setValue('EH 40');
          this.noQNG = true;
        } else {
          this.noQNG = false;
        }
      });
  }
}
