import { Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormProjektNeubauService {
  // User price
  // Wohnfläche centralized form values
  eigeneKosten: eigeneKostenObj = {
    value: 5000,
    min: 100,
    max: 20000,
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

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    value: 10,
    max: 100,
    step: 1,
    title: 'Anzahl Wohnungen',
    disabled: false,
  };

  // Energiestandard centralized form values
  energiestandard: EnergiestandardNeubauObj = {
    options: [
      { id: 'enstd1', value: 'EH 40', disabled: false },
      { id: 'enstd2', value: 'GEG', disabled: false },
      // { id: 'enstd3', value: 'EH 70', disabled: false },
      // { id: 'enstd4', value: 'EH 100' },
      // { id: 'enstd5', value: 'EH 115' },
    ],
    title: 'Stufe Energieeffizienzhaus',
  };

  // Konstruktion centralized form values
  konstruktion: KonstruktionObj = {
    options: [
      { id: 'konst1', value: 'Holzbau', disabled: false },
      { id: 'konst2', value: 'Konventionell', disabled: false },
    ],
    title: 'Konstruktion',
  };

  // Zertifizierung centralized form values
  zertifizierung: ZertifizierungNeubauObj = {
    options: [
      {
        id: 'zert1',
        value: 'Keine',
        text: 'Keine Zertifizierung',
        disabled: false,
      },
      {
        id: 'zert2',
        value: 'ohne QNG',
        text: 'ohne QNG Siegel',
        disabled: false,
      },
      {
        id: 'zert3',
        value: 'mit QNG',
        text: 'mit QNG Siegel',
        disabled: false,
      },
    ],
    title: 'Zertifizierung klimafreundlicher Neubau',
  };
  // Signal to edit the disable property
  zertifizierungWarningMessage$i = signal('');

  // Details
  // Kellergeschoss
  kellergeschoss: KellergeschossObj = {
    options: [
      { id: 'kelgesc1', value: 'Geplant', disabled: false },
      { id: 'kelgesc2', value: 'Nicht geplant', disabled: false },
    ],
    title: 'Kellergeschoss',
  };

  stellplaetze: StellplaetzeObj = {
    options: [
      { id: 'stpl1', value: 'Tiefgarage', disabled: false },
      { id: 'stpl2', value: 'Garage', disabled: false },
      { id: 'stpl3', value: 'Parkpalette', disabled: false },
    ],
    title: 'Stellplätze',
  };

  // Aufzugsanlage
  aufzugsanlage: AufzugsanlageObj = {
    options: [
      { id: 'aufanl1', value: 'Geplant', disabled: false },
      { id: 'aufanl2', value: 'Nicht geplant', disabled: false },
    ],
    title: 'Aufzugsanlage',
  };

  // Barrierefreiheit
  barrierefreiheit: BarrierefreiesBauenObj = {
    options: [
      {
        id: 'barfre1',
        value: 'Barrierereduziert',
        text: 'Reduziert',
        disabled: false,
      },
      { id: 'barfre2', value: 'Barrierefrei', text: 'Frei', disabled: false },
      {
        id: 'barfre3',
        value: 'Barrierefrei (R)',
        text: 'Frei (R)',
        disabled: false,
      },
      {
        id: 'barfre4',
        value: 'Keine Anforderungen',
        text: 'Keine',
        disabled: false,
      },
    ],
    title: 'Barrierefreies Gebäude',
  };

  // Dachbegruenung
  dachbegruenung: DachbegruenungObj = {
    options: [
      { id: 'dachbe1', value: 'Geplant', disabled: false },
      { id: 'dachbe2', value: 'Nicht geplant', disabled: false },
    ],
    title: 'Dachbegrünung',
  };

  // Baustellenlogistik
  baustellenlogistik: BaustellenlogistikObj = {
    options: [
      { id: 'baulog1', value: 'Vorhanden', disabled: false },
      { id: 'baulog2', value: 'Nicht Vorhanden', disabled: false },
    ],
    title: 'Anspruchsvolle Baustellenlogistik',
  };

  // Aussenanlagen
  aussenanlagen: AussenanlagenObj = {
    options: [
      { id: 'ausanl1', value: 'Gering', disabled: false },
      { id: 'ausanl2', value: 'Mittel', disabled: false },
      { id: 'ausanl3', value: 'Hoch', disabled: false },
    ],
    title: 'Aufwand Außenanlagen',
  };

  // Grundstücksbezogene Kosten
  grundstKosten: grundstKostenObj = {
    value: 0,
    min: 0,
    max: 1000,
    step: 1,
    title: 'Grundstücksbezogene Kosten [€/m²]',
    disabled: false,
  };

  // Baunebenkosten (excl. Finanzierung)
  baunebenkostenOhneFin: BaunebenkostenOhneFinObj = {
    value: 20,
    min: 0,
    max: 100,
    step: 1,
    title: 'Baunebenkosten [%]',
    // title: 'Baunebenkosten ohne Finanzierungskosten [%]',
    disabled: false,
  };

  // Control for kellergeschoss and stellplätze
  public noKellergeschoss: boolean = false;

  projektFormNeu = this.fb.group({
    eigeneKostenToggle: [!this.eigeneKosten.disabled, Validators.required],
    eigeneKostenRange: [
      this.eigeneKosten.value, // init
      [Validators.min(this.eigeneKosten.min), Validators.max(this.eigeneKosten.max)],
    ],
    eigeneKosten: [
      this.eigeneKosten.value, // init
      {
        Validators: [
          Validators.min(this.eigeneKosten.min),
          Validators.max(this.eigeneKosten.max),
        ],
        updateOn: 'blur',
      },
    ],
    wohnflaecheRange: [
      // The values come from the FormProjektService
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
    konstruktion: this.konstruktion.options[0].value,
    energiestandard: this.energiestandard.options[0].value,
    zertifizierung: this.zertifizierung.options[0].value,
    // Details
    kellergeschossIn: this.kellergeschoss.options[0].value,
    stellplaetzeIn: this.stellplaetze.options[0].value,
    aufzugsanlageIn: this.aufzugsanlage.options[0].value,
    barrierefreiheitIn: this.barrierefreiheit.options[0].value,
    dachbegruenungIn: this.dachbegruenung.options[0].value,
    baustellenlogistikIn: this.baustellenlogistik.options[0].value,
    aussenanlagenIn: this.aussenanlagen.options[0].value,
    grundstuecksbezogeneKostenRange: [
      this.grundstKosten.value,
      [
        Validators.required,
        Validators.min(this.grundstKosten.min),
        Validators.max(this.grundstKosten.max),
      ],
    ],
    grundstuecksbezogeneKosten: [
      this.grundstKosten.value,
      {
        Validators: [
          Validators.required,
          Validators.min(this.grundstKosten.min),
          Validators.max(this.grundstKosten.max),
        ],
        updateOn: 'blur',
      },
    ],
    baunebenkostenOhneFinRange: [
      this.baunebenkostenOhneFin.value,
      [
        Validators.required,
        Validators.min(this.baunebenkostenOhneFin.min),
        Validators.max(this.baunebenkostenOhneFin.max),
      ],
    ],
    baunebenkostenOhneFin: [
      this.baunebenkostenOhneFin.value,
      {
        Validators: [
          Validators.required,
          Validators.min(this.baunebenkostenOhneFin.min),
          Validators.max(this.baunebenkostenOhneFin.max),
        ],
        updateOn: 'blur',
      },
    ],
  });

  constructor(private fb: FormBuilder) {
    this.projektFormNeu
      .get('eigeneKostenToggle')
      ?.valueChanges.subscribe((value) => {
        this.kellergeschoss.options.forEach((obj) => (obj.disabled = value!));
        this.stellplaetze.options.forEach((obj) => (obj.disabled = value!));
        this.aufzugsanlage.options.forEach((obj) => (obj.disabled = value!));
        this.barrierefreiheit.options.forEach((obj) => (obj.disabled = value!));
        this.dachbegruenung.options.forEach((obj) => (obj.disabled = value!));
        this.baustellenlogistik.options.forEach(
          (obj) => (obj.disabled = value!)
        );
        this.aussenanlagen.options.forEach((obj) => (obj.disabled = value!));
        this.grundstKosten.disabled = value!;
        this.baunebenkostenOhneFin.disabled = value!;
    });

     // User Price
     this.projektFormNeu
     .get('eigeneKostenRange')
     ?.valueChanges.subscribe((value) => {
       // Update number input when range changes
       this.projektFormNeu
         .get('eigeneKosten')
         ?.setValue(value, { emitEvent: false });
     });

   this.projektFormNeu
     .get('eigeneKosten')
     ?.valueChanges.subscribe((value) => {
       // Condition to avoid non-numeric or numbers unrealistically small
       if (value && value >= this.eigeneKosten.min) {
         // Update range input when number changes
         this.projektFormNeu
           .get('eigeneKostenRange')
           ?.setValue(value, { emitEvent: false });
       } else {
         this.projektFormNeu
           .get('eigeneKostenRange')
           ?.setValue(this.eigeneKosten.min, { emitEvent: false });
         this.projektFormNeu
           .get('eigeneKosten')
           ?.setValue(this.eigeneKosten.min, { emitEvent: false });
       }
     });

    // Wohnflaeche
    this.projektFormNeu
      .get('wohnflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormNeu
          .get('wohnflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.projektFormNeu.get('wohnflaeche')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      if (value && value >= this.wohnflaeche.min) {
        this.projektFormNeu
          .get('wohnflaecheRange')
          ?.setValue(value, { emitEvent: false });
      } else {
        // Prevent non-realistic values
        this.projektFormNeu
          .get('wohnflaeche')
          ?.setValue(this.wohnflaeche.min, { emitEvent: false });
        this.projektFormNeu
          .get('wohnflaecheRange')
          ?.setValue(this.wohnflaeche.min, { emitEvent: false });
      }
    });

    // Anzahl WohnungenRange
    this.projektFormNeu
      .get('anzahlWohnungenRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormNeu
          .get('anzahlWohnungen')
          ?.setValue(value, { emitEvent: false });
      });

    this.projektFormNeu
      .get('anzahlWohnungen')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.anzahlWohnungen.min) {
          // Update range input when number input changes
          this.projektFormNeu
            .get('anzahlWohnungenRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormNeu
            .get('anzahlWohnungen')
            ?.setValue(this.anzahlWohnungen.min, { emitEvent: false });
          this.projektFormNeu
            .get('anzahlWohnungenRange')
            ?.setValue(this.anzahlWohnungen.min, { emitEvent: false });
        }
      });

    // Energiestandard
    this.projektFormNeu
      .get('energiestandard')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        const zertifizierung = this.projektFormNeu.get('zertifizierung');
        const konstruktion = this.projektFormNeu.get('konstruktion');
        if (value != 'EH 40') {
          zertifizierung?.setValue('Keine');
          this.zertifizierung.options[1].disabled = true;
          this.zertifizierung.options[2].disabled = true;
          this.zertifizierungWarningMessage$i.set(
            '* Zertifizierung ist nur mit EH 40 möglich'
          );
        } else if (value === 'EH 40' && konstruktion?.value === 'Holzbau') {
          this.zertifizierung.options[1].disabled = false;
          this.zertifizierung.options[2].disabled = false;
        } else if (
          value === 'EH 40' &&
          konstruktion?.value === 'Konventionell'
        ) {
          this.zertifizierung.options[1].disabled = false;
          this.zertifizierung.options[2].disabled = true;
          this.zertifizierungWarningMessage$i.set(
            '* QNG-Zertifizierung ist nur mit Holzbau möglich'
          );
        }
      });

    // Konstruktion
    this.projektFormNeu.get('konstruktion')?.valueChanges.subscribe((value) => {
      // Relationship with Zertifizierung
      const energiestandard = this.projektFormNeu.get('energiestandard');
      const zertifizierung = this.projektFormNeu.get('zertifizierung');
      if (value === 'Konventionell' && energiestandard?.value === 'EH 40') {
        if (zertifizierung?.value === 'mit QNG') {
          zertifizierung?.setValue('Keine');
        }
        this.zertifizierung.options[1].disabled = false;
        this.zertifizierung.options[2].disabled = true;
        this.zertifizierungWarningMessage$i.set(
          '* QNG-Zertifizierung ist nur mit Holzbau möglich'
        );
      } else if (
        value === 'Konventionell' &&
        energiestandard?.value != 'EH 40'
      ) {
        this.zertifizierung.options[1].disabled = true;
        this.zertifizierung.options[2].disabled = true;
      } else if (value === 'Holzbau' && energiestandard?.value === 'EH 40') {
        this.zertifizierung.options[1].disabled = false;
        this.zertifizierung.options[2].disabled = false;
      }
    });

    // Susbscribe to form changes
    this.projektFormNeu
      .get('kellergeschossIn')
      ?.valueChanges.subscribe((value) => {
        // If 'Nicht Vorhanden' is selected, then Tiefgarage is unsellected
        const stellplaetzeIn = this.projektFormNeu.get('stellplaetzeIn');
        if (value === 'Nicht geplant') {
          stellplaetzeIn?.setValue('Garage');
          this.stellplaetze.options[0].disabled = true;
          this.noKellergeschoss = true;
        } else {
          this.stellplaetze.options[0].disabled = false;
          this.noKellergeschoss = false;
        }
      });

    this.projektFormNeu
      .get('stellplaetzeIn')
      ?.valueChanges.subscribe((value) => {
        // If 'Tiefgarage' is selected, then 'Nicht Vorhanden' is unsellected
        const kellergeschossIn = this.projektFormNeu.get('kellergeschossIn');
        if (
          value === 'Tiefgarage' &&
          kellergeschossIn?.value === 'Nicht geplant'
        ) {
          kellergeschossIn?.setValue('Geplant');
        }
      });

    this.projektFormNeu
      .get('grundstuecksbezogeneKostenRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.projektFormNeu
            .get('grundstuecksbezogeneKosten')
            ?.setValue(value, { emitEvent: false });
        }
      });

    this.projektFormNeu
      .get('grundstuecksbezogeneKosten')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.grundstKosten.min) {
          this.projektFormNeu
            .get('grundstuecksbezogeneKostenRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormNeu
            .get('grundstuecksbezogeneKosten')
            ?.setValue(this.grundstKosten.min, { emitEvent: false });
          this.projektFormNeu
            .get('grundstuecksbezogeneKostenRange')
            ?.setValue(this.grundstKosten.min, { emitEvent: false });
        }
      });

    this.projektFormNeu
      .get('baunebenkostenOhneFinRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.projektFormNeu
            .get('baunebenkostenOhneFin')
            ?.setValue(value, { emitEvent: false });
        }
      });

    this.projektFormNeu
      .get('baunebenkostenOhneFin')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.baunebenkostenOhneFin.min) {
          this.projektFormNeu
            .get('baunebenkostenOhneFinRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormNeu
            .get('baunebenkostenOhneFin')
            ?.setValue(this.baunebenkostenOhneFin.min, { emitEvent: false });
          this.projektFormNeu
            .get('baunebenkostenOhneFinRange')
            ?.setValue(this.baunebenkostenOhneFin.min, { emitEvent: false });
        }
      });
  }
}
