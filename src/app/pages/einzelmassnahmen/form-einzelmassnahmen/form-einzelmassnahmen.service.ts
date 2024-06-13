import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormEinzelmassnahmenService {
  // Bauteil
  bauteil: BauteilObj = {
    options: [
      { id: 'bauteil01', value: 'Außenwand', disabled: false },
      { id: 'bauteil02', value: 'Bodenplatte', disabled: false },
      { id: 'bauteil03', value: 'Dachflächenfenster', disabled: false },
      { id: 'bauteil04', value: 'Fenster', disabled: false },
      { id: 'bauteil05', value: 'Flachdach', disabled: false },
      { id: 'bauteil06', value: 'Innenwand', disabled: false },
      { id: 'bauteil07', value: 'Keller', disabled: false },
      { id: 'bauteil08', value: 'Oberste Geschossdecke', disabled: false },
      { id: 'bauteil09', value: 'Steildach', disabled: false },
      { id: 'bauteil10', value: 'Türen', disabled: false },
      { id: 'bauteil11', value: 'Vorbaurollladen', disabled: false },
      { id: 'bauteil12', value: 'WDVS', disabled: false },
    ],
    title: 'Bauteil',
  };

  // C3 → Wohnfläche [m²]
  // Wohnfläche centralized form values
  // This one is not necessary for the first version
  wohnflaeche: SliderNumberObj = {
    min: 20,
    value: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²]',
    disabled: false,
  };

  // C4 → Anzahl Wohneinheiten
  // Anzahl Wohnungen centralized form values
  // This one is not necessary for the first version
  anzahlWohnungen: SliderNumberObj = {
    min: 1,
    value: 10,
    max: 100,
    step: 1,
    title: 'Anzahl Wohnungen',
    disabled: false,
  };

  // C6 → Wärmeerzeuger (Bestand)
  // This one is not necessary for the first version
  waermeerzeuger: WaermeerzeugerEinzelmassnahmenObj = {
    options: [
      { id: 'w1', value: 'Bestandskessel', disabled: false },
      { id: 'w2', value: 'Gas-BW-Kessel', disabled: false },
      { id: 'w3', value: 'Öl-BW-Kessel', disabled: false },
      { id: 'w4', value: 'Pelletkessel', disabled: false },
      { id: 'w5', value: 'Fernwärme', disabled: false },
      { id: 'w6', value: 'Wärmepumpe (Erdkollektor)', disabled: false },
      { id: 'w7', value: 'Wärmepumpe (Erdsonde)', disabled: false },
      { id: 'w8', value: 'Wärmepumpe (Luft)', disabled: false },
      { id: 'w9', value: 'BHKW Erdgas', disabled: false },
      { id: 'w10', value: 'BHKW Biogas', disabled: false },
      { id: 'w11', value: 'BHKW Klärgas', disabled: false },
      { id: 'w12', value: 'BHKW Flüssiggas', disabled: false },
      { id: 'w13', value: 'BHKW Heizöl', disabled: false },
      { id: 'w14', value: 'Solar für WW mit Gaskessel', disabled: false },
      { id: 'w15', value: 'Solar für WW mit Ölkessel', disabled: false },
      { id: 'w16', value: 'Solar für WW mit Pelletkessel', disabled: false },
      { id: 'w17', value: 'olar für WW&H mit Gaskessel', disabled: false },
      { id: 'w18', value: 'Solar für WW&H mit Ölkessel', disabled: false },
      { id: 'w19', value: 'Solar für WW&H mit Pelletkessel', disabled: false },
      {
        id: 'w20',
        value: 'Alter Bestandskessel (Heizöl/Gas)',
        disabled: false,
      },
    ],
    title: 'Wärmeerzeuger (Bestand)',
  };

  // C19 → Eingabe Fläche Einzelfenster [m²]
  fensterflaeche: SliderNumberObj = {
    min: 0.1,
    value: 1,
    max: 100,
    step: 0.1,
    title: 'Einzelfensterfläche [m²]',
    disabled: false,
  };

  // C20 → Eingabe Fensterfläche gesamt [m²]
  gesamtFensterflaeche: SliderNumberObj = {
    min: 1,
    value: 1,
    max: 1000,
    step: 1,
    title: 'Gesamt Fensterfläche [m²]',
    disabled: false,
  };

  fensterTyp: FensterObj = {
    options: [
      { id: 'fenst1', value: '3WSV Passivhaus', disabled: false },
      { id: 'fenst2', value: '3WSV konv.', disabled: false },
      { id: 'fenst3', value: '2WSV konv.', disabled: false },
    ],
    title: 'Fenster Typ',
  };

  dachflaechenfensterTyp: DachflaechenfensterObj = {
    options: [
      { id: 'dachfenst1', value: 'Einfamilienhaus', disabled: false },
      { id: 'dachfenst2', value: 'Mehrfamilienhaus', disabled: false },
    ],
    title: 'Dachflächenfenster Typ',
  };

  // C20 → Eingabe Fensterfläche gesamt [m²]
  tuerflaeche: SliderNumberObj = {
    min: 0.1,
    value: 2,
    max: 100,
    step: 0.1,
    title: 'Fläche Haustür [m²]',
    disabled: false,
  };

  tuerTyp: TuerObj = {
    options: [
      { id: 'tuer1', value: 'Einfamilienhaus', disabled: false },
      { id: 'tuer2', value: 'Mehrfamilienhaus', disabled: false },
    ],
    title: 'Tür Typ',
  };

  // C29 → Eingabe gedämmte Fläche [m²]
  gedaemmteflaeche: SliderNumberObj = {
    min: 1,
    value: 180,
    max: 1000,
    step: 1,
    title: 'Gedämmte Fläche [m²]',
    disabled: false,
  };

  // C30 → Dämmstoffdicke [cm]
  daemmstoffdicke: SliderNumberObj = {
    min: 1,
    value: 10,
    max: 100,
    step: 0.1,
    title: 'Dämmstoffdicke [cm]',
    disabled: false,
  };

  kellerTyp: KellerObj = {
    options: [
      { id: 'keller1', value: 'unterseitig ohne Bekleidung', disabled: false },
      { id: 'keller2', value: 'unterseitig mit Bekleidung', disabled: false },
      {
        id: 'keller3',
        value: 'oberseitig',
        disabled: false,
      },
    ],
    title: 'Keller Typ',
  };

  obersteGeschossdeckeTyp: ObersteGeschossdeckeObj = {
    options: [
      {
        id: 'oberstegesch1',
        value: 'begehbar',
        disabled: false,
      },
      {
        id: 'oberstegesch2',
        value: 'nicht begehbar',
        disabled: false,
      },
    ],
    title: 'Oberste Geschossdecke',
  };

  flachdachTyp: FlachdachObj = {
    options: [
      {
        id: 'flachdach1',
        value: 'ohne Lichtkuppeln',
        disabled: false,
      },
      {
        id: 'flachdach2',
        value: 'mit Lichtkuppeln Einfamilienhaus',
        disabled: false,
      },
      {
        id: 'flachdach3',
        value: 'mit Lichtkuppeln Mehrfamilienhaus',
        disabled: false,
      },
    ],
    title: 'Flachdach Typ',
  };

  // C42 → Fläche der Gaube(n) [m²]
  gaubeflaeche: SliderNumberObj = {
    min: 1,
    value: 100,
    max: 1000,
    step: 1,
    title: 'Fläche der Gaube(n) [m²]',
    disabled: false,
  };

  // C44 → Fläche Rollladen [m²]
  rollladenflaeche: SliderNumberObj = {
    min: 1,
    value: 100,
    max: 1000,
    step: 1,
    title: 'Fläche Rollladen [m²]',
    disabled: false,
  };

  formEinzelmassnahmen = this.fb.group({
    bauteil: this.bauteil.options[0].value,
    // This one is not necessary for the first version
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
    waermeerzeuger: this.waermeerzeuger.options[0].value,
    fensterflaecheRange: [
      this.fensterflaeche.value,
      [
        Validators.required,
        Validators.min(this.fensterflaeche.min),
        Validators.max(this.fensterflaeche.max),
      ],
    ],
    fensterflaeche: [
      this.fensterflaeche.value,
      {
        validators: [
          Validators.required,
          Validators.min(this.fensterflaeche.min),
          Validators.max(this.fensterflaeche.max),
        ],
        updateOn: 'blur',
      },
    ],
    gesamtFensterflaecheRange: [
      this.gesamtFensterflaeche.value,
      [
        Validators.required,
        Validators.min(this.gesamtFensterflaeche.min),
        Validators.max(this.gesamtFensterflaeche.max),
      ],
    ],
    gesamtFensterflaeche: [
      this.gesamtFensterflaeche.value,
      {
        validators: [
          Validators.required,
          Validators.min(this.gesamtFensterflaeche.min),
          Validators.max(this.gesamtFensterflaeche.max),
        ],
        updateOn: 'blur',
      },
    ],
    fensterTyp: this.fensterTyp.options[0].value,
    dachflaechenfensterTyp: this.dachflaechenfensterTyp.options[0].value,
    tuerflaecheRange: [
      this.tuerflaeche.value,
      [
        Validators.required,
        Validators.min(this.tuerflaeche.min),
        Validators.max(this.tuerflaeche.max),
      ],
    ],
    tuerflaeche: [
      this.tuerflaeche.value,
      {
        validators: [
          Validators.required,
          Validators.min(this.tuerflaeche.min),
          Validators.max(this.tuerflaeche.max),
        ],
        updateOn: 'blur',
      },
    ],
    tuerTyp: this.tuerTyp.options[0].value,
    gedaemmteflaecheRange: [
      this.gedaemmteflaeche.value,
      [
        Validators.required,
        Validators.min(this.gedaemmteflaeche.min),
        Validators.max(this.gedaemmteflaeche.max),
      ],
    ],
    gedaemmteflaeche: [
      this.gedaemmteflaeche.value,
      {
        validators: [
          Validators.required,
          Validators.min(this.gedaemmteflaeche.min),
          Validators.max(this.gedaemmteflaeche.max),
        ],
        updateOn: 'blur',
      },
    ],
    daemmstoffdickeRange: [
      this.daemmstoffdicke.value,
      [
        Validators.required,
        Validators.min(this.daemmstoffdicke.min),
        Validators.max(this.daemmstoffdicke.max),
      ],
    ],
    daemmstoffdicke: [
      this.daemmstoffdicke.value,
      {
        validators: [
          Validators.required,
          Validators.min(this.daemmstoffdicke.min),
          Validators.max(this.daemmstoffdicke.max),
        ],
        updateOn: 'blur',
      },
    ],
    kellerTyp: this.kellerTyp.options[0].value,
    obersteGeschossdeckeTyp: this.obersteGeschossdeckeTyp.options[0].value,
    flachdachTyp: this.flachdachTyp.options[0].value,
    gaubeflaecheRange: [
      this.gaubeflaeche.value,
      [
        Validators.required,
        Validators.min(this.gaubeflaeche.min),
        Validators.max(this.gaubeflaeche.max),
      ],
    ],
    gaubeflaeche: [
      this.gaubeflaeche.value,
      {
        validators: [
          Validators.required,
          Validators.min(this.gaubeflaeche.min),
          Validators.max(this.gaubeflaeche.max),
        ],
        updateOn: 'blur',
      },
    ],
    rollladenflaecheRange: [
      this.rollladenflaeche.value,
      [
        Validators.required,
        Validators.min(this.rollladenflaeche.min),
        Validators.max(this.rollladenflaeche.max),
      ],
    ],
    rollladenflaeche: [
      this.rollladenflaeche.value,
      {
        validators: [
          Validators.required,
          Validators.min(this.rollladenflaeche.min),
          Validators.max(this.rollladenflaeche.max),
        ],
        updateOn: 'blur',
      },
    ],
  });

  constructor(private fb: FormBuilder) {
    // Fensterflaeche
    this.formEinzelmassnahmen
      .get('fensterflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.formEinzelmassnahmen
          .get('fensterflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.formEinzelmassnahmen
      .get('fensterflaeche')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.fensterflaeche.min) {
          // Update range input when number input changes
          this.formEinzelmassnahmen
            .get('fensterflaecheRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.formEinzelmassnahmen
            .get('fensterflaecheRange')
            ?.setValue(this.fensterflaeche.min, { emitEvent: false });
          this.formEinzelmassnahmen
            .get('fensterflaeche')
            ?.setValue(this.fensterflaeche.min, { emitEvent: false });
        }
      });

    // Fensterflaeche
    this.formEinzelmassnahmen
      .get('gesamtFensterflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.formEinzelmassnahmen
          .get('gesamtFensterflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.formEinzelmassnahmen
      .get('gesamtFensterflaeche')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.gesamtFensterflaeche.min) {
          // Update range input when number input changes
          this.formEinzelmassnahmen
            .get('gesamtFensterflaecheRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.formEinzelmassnahmen
            .get('gesamtFensterflaecheRange')
            ?.setValue(this.gesamtFensterflaeche.min, { emitEvent: false });
          this.formEinzelmassnahmen
            .get('gesamtFensterflaeche')
            ?.setValue(this.gesamtFensterflaeche.min, { emitEvent: false });
        }
      });

    // Tuerflaeche
    this.formEinzelmassnahmen
      .get('tuerflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.formEinzelmassnahmen
          .get('tuerflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.formEinzelmassnahmen
      .get('tuerflaeche')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.tuerflaeche.min) {
          // Update range input when number input changes
          this.formEinzelmassnahmen
            .get('tuerflaecheRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.formEinzelmassnahmen
            .get('tuerflaecheRange')
            ?.setValue(this.tuerflaeche.min, { emitEvent: false });
          this.formEinzelmassnahmen
            .get('tuerflaeche')
            ?.setValue(this.tuerflaeche.min, { emitEvent: false });
        }
      });

    // Gedaemmteflaeche
    this.formEinzelmassnahmen
      .get('gedaemmteflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.formEinzelmassnahmen
          .get('gedaemmteflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.formEinzelmassnahmen
      .get('gedaemmteflaeche')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.gedaemmteflaeche.min) {
          // Update range input when number input changes
          this.formEinzelmassnahmen
            .get('gedaemmteflaecheRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.formEinzelmassnahmen
            .get('gedaemmteflaecheRange')
            ?.setValue(this.gedaemmteflaeche.min, { emitEvent: false });
          this.formEinzelmassnahmen
            .get('gedaemmteflaeche')
            ?.setValue(this.gedaemmteflaeche.min, { emitEvent: false });
        }
      });

    // Gedaemmteflaeche
    this.formEinzelmassnahmen
      .get('daemmstoffdickeRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.formEinzelmassnahmen
          .get('daemmstoffdicke')
          ?.setValue(value, { emitEvent: false });
      });

    this.formEinzelmassnahmen
      .get('daemmstoffdicke')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.daemmstoffdicke.min) {
          // Update range input when number input changes
          this.formEinzelmassnahmen
            .get('daemmstoffdickeRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.formEinzelmassnahmen
            .get('daemmstoffdickeRange')
            ?.setValue(this.daemmstoffdicke.min, { emitEvent: false });
          this.formEinzelmassnahmen
            .get('daemmstoffdicke')
            ?.setValue(this.daemmstoffdicke.min, { emitEvent: false });
        }
      });

    // Gedaemmteflaeche
    this.formEinzelmassnahmen
      .get('gaubeflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.formEinzelmassnahmen
          .get('gaubeflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.formEinzelmassnahmen
      .get('gaubeflaeche')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.gaubeflaeche.min) {
          // Update range input when number input changes
          this.formEinzelmassnahmen
            .get('gaubeflaecheRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.formEinzelmassnahmen
            .get('gaubeflaecheRange')
            ?.setValue(this.gaubeflaeche.min, { emitEvent: false });
          this.formEinzelmassnahmen
            .get('gaubeflaeche')
            ?.setValue(this.gaubeflaeche.min, { emitEvent: false });
        }
      });

    // Gedaemmteflaeche
    this.formEinzelmassnahmen
      .get('rollladenflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.formEinzelmassnahmen
          .get('rollladenflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.formEinzelmassnahmen
      .get('rollladenflaeche')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.rollladenflaeche.min) {
          // Update range input when number input changes
          this.formEinzelmassnahmen
            .get('rollladenflaecheRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.formEinzelmassnahmen
            .get('rollladenflaecheRange')
            ?.setValue(this.rollladenflaeche.min, { emitEvent: false });
          this.formEinzelmassnahmen
            .get('rollladenflaeche')
            ?.setValue(this.rollladenflaeche.min, { emitEvent: false });
        }
      });
  }
}
