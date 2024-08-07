import { effect, Injectable, signal } from '@angular/core';
import { allgemein, einzelmassnahmen } from '../../../shared/tooltips';

@Injectable({
  providedIn: 'root',
})
export class FormEinzelmassnahmenService {
  // Bauteil
  bauteilObj: BauteilObj = {
    options: [
      {
        id: 'bauteil01',
        value: 'Außenwand',
        text: 'Außenwand (WDVS)',
        disabled: false,
      },
      { id: 'bauteil02', value: 'Bodenplatte', disabled: false },
      { id: 'bauteil03', value: 'Dach', disabled: false },
      { id: 'bauteil04', value: 'Dachflächenfenster', disabled: false },
      {
        id: 'bauteil05',
        value: 'Fenster',
        text: 'Einzelfensterfläche in Durchschnittliche Fenstergröße je Fenster',
        disabled: false,
      },
      {
        id: 'bauteil06',
        value: 'Innenwand',
        text: 'Innenwanddämmung',
        disabled: false,
      },
      { id: 'bauteil07', value: 'Kellerdecke', disabled: false },
      {
        id: 'bauteil08',
        value: 'ObersteGeschossdecke',
        text: 'Oberste Geschossdecke',
        disabled: false,
      },
      // Removing temporarily
      // { id: 'bauteil09', value: 'Steildach', disabled: false },
      {
        id: 'bauteil10',
        value: 'Steildachgauben',
        text: 'Neue Steildachgauben',
        disabled: false,
      },
      { id: 'bauteil11', value: 'Türen', disabled: false },
      { id: 'bauteil12', value: 'Rollladen', disabled: false },
    ],
    title: 'Bauteil',
  };
  bauteilSelected = signal<string>('');

  getTextOrValue(value: string) {
    const option = this.bauteilObj.options.find(
      (option) => option.value === value
    );
    if (option) {
      return option.text || option.value;
    }
    return null; // Or handle the case when the value is not found
  }

  getTooltip() {
    switch (this.bauteilSelected()) {
      case 'Außenwand':
        return this.einzelmassnahmenTooltips.aussenwand;
      case 'Bodenplatte':
        return this.einzelmassnahmenTooltips.bodenplatte;
      case 'Dach':
        return this.einzelmassnahmenTooltips.dach;
      case 'Fenster':
        return this.einzelmassnahmenTooltips.fenster;
      case 'Innenwand':
        return this.einzelmassnahmenTooltips.innenwand;
      case 'Kellerdecke':
        return this.einzelmassnahmenTooltips.kellerdecke;
      case 'ObersteGeschossdecke':
        return this.einzelmassnahmenTooltips.obersteGeschossdecke;
      case 'Steildachgauben':
        return this.einzelmassnahmenTooltips.steildachgaube;
      case 'Türen':
        return this.einzelmassnahmenTooltips.tueren;
      case 'Rollladen':
        return this.einzelmassnahmenTooltips.rollladen;
      default:
        return null;
    }
  }

  // Haus
  hausObj = signal<EinzelmaßnahmenProjektTypeObj>({
    title: 'Haus typ',
    options: [
      {
        id: 'haus1',
        value: 'Einfamilienhaus',
        disabled: false,
      },
      {
        id: 'haus2',
        value: 'Mehrfamilienhaus',
        disabled: false,
      },
    ],
  });
  hausSelected = signal<EinzelmaßnahmenProjektType>('Einfamilienhaus');

  // Has keller
  hasKellerObj = signal<HasKellerObj>({
    title: 'Keller',
    options: [
      {
        id: 'hasKeller1',
        value: 'Mit Keller',
        disabled: false,
      },
      {
        id: 'hasKeller2',
        value: 'Ohne Keller',
        disabled: false,
      },
    ],
  });
  hasKellerSelected = signal<HasKeller>('Mit Keller');

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
  waermeerzeuger: WaermeerzeugerObj = {
    title: 'Wärmeerzeuger (Bestand)',
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
      { id: 'w17', value: 'Solar für WW&H mit Gaskessel', disabled: false },
      { id: 'w18', value: 'Solar für WW&H mit Ölkessel', disabled: false },
      { id: 'w19', value: 'Solar für WW&H mit Pelletkessel', disabled: false },
      {
        id: 'w20',
        value: 'Alter Bestandskessel (Heizöl/Gas)',
        disabled: false,
      },
    ],
  };

  baupreisindexAktuellObj: SliderNumberObj = {
    min: 1,
    value: 161.3,
    max: 200,
    step: 1,
    title: 'Baupreisindex aktuell',
    tooltip: this.einzelmassnahmenTooltips.baupreisindexAktuell,
    disabled: false,
  };
  baupreisindexAktuellValue = signal<number>(161.3);

  ortsfaktorObj: SliderNumberObj = {
    min: 0.1,
    value: 1,
    max: 2,
    step: 0.01,
    title: 'Ortsfaktor',
    tooltip: this.einzelmassnahmenTooltips.ortsfaktor,
    disabled: false,
  };
  ortsfaktorValue = signal<number>(1);

  // C19 → Eingabe Fläche Einzelfenster [m²]
  fensterflaeche = signal<SliderNumberObj>({
    min: 0.1,
    value: 1,
    max: 100,
    step: 0.1,
    title: 'Einzelfensterfläche [m²]',
    disabled: false,
  });
  fensterflaecheValue = signal<number>(1);

  // C20 → Eingabe Fensterfläche gesamt [m²]
  anzahlFenster = signal<SliderNumberObj>({
    min: 1,
    value: 1,
    max: 100,
    step: 1,
    title: 'Anzahl der Fenster',
    disabled: false,
  });
  anzahlFensterValue = signal<number>(1);

  // Fenster
  fensterObj = signal<FensterObj>({
    title: 'Fenster Typ',
    tooltip: this.einzelmassnahmenTooltips.fensterTyp,
    options: [
      { id: 'fenst1', value: '3WSV Passivhaus', disabled: false },
      { id: 'fenst2', value: '3WSV konventionell', disabled: false },
      { id: 'fenst3', value: '2WSV konventionell', disabled: false },
    ],
  });
  fensterSelected = signal<Fenster>(this.fensterObj().options[0].value);

  // C20 → Eingabe Fensterfläche gesamt [m²]
  tuerflaecheObj = signal<SliderNumberObj>({
    min: 0.1,
    value: 2,
    max: 100,
    step: 0.1,
    title: 'Fläche Haustür [m²]',
    disabled: false,
  });
  tuerflaecheValue = signal<number>(1);

  anzahlTuerObj = signal<SliderNumberObj>({
    min: 1,
    value: 1,
    max: 100,
    step: 1,
    title: 'Anzahl der Fenster',
    disabled: false,
  });
  anzahlTuerValue = signal<number>(1);

  isOpakeVisible(): boolean {
    const allowedBauteile: Bauteil[] = [
      'Außenwand',
      'Bodenplatte',
      'Dach',
      'Flachdach',
      'Innenwand',
      'Kellerdecke',
      'ObersteGeschossdecke',
      'Steildach',
    ];
    return allowedBauteile.includes(this.bauteilSelected() as Bauteil);
  }

  // C29 → Eingabe gedämmte Fläche [m²]
  gedaemmteflaecheObj = signal<SliderNumberObj>({
    min: 1,
    value: 180,
    max: 1000,
    step: 1,
    title: 'Gedämmte Fläche [m²]',
    disabled: false,
  });
  gedaemmteflaecheValue = signal<number>(180);

  // C30 → Dämmstoffdicke [cm]
  daemmstoffdickeObj = signal<SliderNumberObj>({
    min: 1,
    value: 10,
    max: 40,
    step: 0.1,
    title: 'Dämmstoffdicke [cm]',
    disabled: false,
  });
  daemmstoffdickeValue = signal<number>(10);

  // Anforderungen Qualität
  qualitaetBauteilObjArray: QualitaetBauteilObj[] = [
    {
      title: 'Außenwand',
      options: [
        { id: 'qualAu1', value: 14, text: 'Mindestqualität', disabled: false },
        { id: 'qualAu2', value: 30, text: 'Hohe Qualität', disabled: false },
      ],
    },
    {
      title: 'Bodenplatte',
      options: [
        { id: 'qualBo1', value: 8, text: 'Mindestqualität', disabled: false },
        { id: 'qualBo2', value: 16, text: 'Hohe Qualität', disabled: false },
      ],
    },
    {
      title: 'Steildach',
      options: [
        { id: 'qualSt1', value: 14, text: 'Mindestqualität', disabled: false },
        { id: 'qualSt2', value: 30, text: 'Hohe Qualität', disabled: false },
      ],
    },
    {
      title: 'Flachdach',
      options: [
        { id: 'qualFl1', value: 18, text: 'Mindestqualität', disabled: false },
        { id: 'qualFl2', value: 36, text: 'Hohe Qualität', disabled: false },
      ],
    },
    {
      title: 'Innenwand',
      options: [
        { id: 'qualIn1', value: 8, text: 'Mindestqualität', disabled: false },
        { id: 'qualIn2', value: 10, text: 'Hohe Qualität', disabled: false },
      ],
    },
    {
      title: 'Kellerdecke',
      options: [
        { id: 'qualKe1', value: 12, text: 'Mindestqualität', disabled: false },
        { id: 'qualKe2', value: 20, text: 'Hohe Qualität', disabled: false },
      ],
    },
    {
      title: 'ObersteGeschossdecke',
      options: [
        { id: 'qualOG1', value: 14, text: 'Mindestqualität', disabled: false },
        { id: 'qualOG2', value: 36, text: 'Hohe Qualität', disabled: false },
      ],
    },
  ];
  selectedQualitaetBauteilObj: QualitaetBauteilObj | null = null;
  selectedQualitaet = signal<number>(0);

  kellerObj = signal<KellerObj>({
    title: 'Art der Dämmung ',
    options: [
      { id: 'keller1', value: 'unterseitig ohne Bekleidung', disabled: false },
      { id: 'keller2', value: 'unterseitig mit Bekleidung', disabled: false },
      {
        id: 'keller3',
        value: 'oberseitig',
        disabled: false,
      },
    ],
    tooltip: this.einzelmassnahmenTooltips.artDerDaemmungKellerdecke,
  });
  kellerSelected = signal<Keller>('unterseitig ohne Bekleidung');

  obersteGeschossdeckeObj = signal<ObersteGeschossdeckeObj>({
    title: 'Art der Dämmung',
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
    tooltip: this.einzelmassnahmenTooltips.artDerDaemmungObersteGeschossdecke,
  });
  obersteGeschossdeckeSelected = signal<ObersteGeschossdecke>('begehbar');

  dachObj = signal<DachObj>({
    title: 'Dach Typ',
    options: [
      { id: 'dach1', value: 'Steildach', disabled: false },
      { id: 'dach2', value: 'Flachdach', disabled: false },
    ],
  });
  dachSelected = signal<Dach>('Steildach');

  flachdachObj = signal<FlachdachObj>({
    title: 'Flachdach',
    options: [
      {
        id: 'flachdach1',
        value: 'ohne Lichtkuppeln',
        disabled: false,
      },
      {
        id: 'flachdach2',
        value: 'mit Lichtkuppeln',
        disabled: false,
      },
    ],
  });
  flachdachSelected = signal<Flachdach>('ohne Lichtkuppeln');

  anzahlDachflaechenfensterObj = signal<SliderNumberObj>({
    min: 1,
    value: 1,
    max: 100,
    step: 1,
    title: 'Anzahl der Dachflächenfenster',
    disabled: false,
  });
  anzahlDachflaechenfensterValue = signal<number>(1);

  // C42 → Fläche der Gaube(n) [m²]
  gaubeflaecheObj = signal<SliderNumberObj>({
    min: 0.1,
    value: 11,
    max: 100,
    step: 0.1,
    title: 'Fläche der Gaube [m²]',
    disabled: false,
  });
  gaubeflaecheValue = signal<number>(11);

  anzahlSteildachgaubenObj = signal<SliderNumberObj>({
    min: 1,
    value: 1,
    max: 100,
    step: 1,
    title: 'Anzahl der Gauben',
    disabled: false,
  });
  anzahlSteildachgaubenValue = signal<number>(1);

  // C44 → Fläche Rollladen [m²]
  rollladenflaecheObj = signal<SliderNumberObj>({
    min: 1,
    value: 3,
    max: 100,
    step: 0.1,
    title: 'Fläche Rollladen [m²]',
    disabled: false,
  });
  rollladenflaecheValue = signal<number>(this.rollladenflaecheObj().value);

  // Rollladen Typ
  // To be implemented
  rollladenObj = signal<RollladenObj>({
    title: 'Rollladen Typ',
    options: [
      { id: 'rollladen1', value: 'Kunststoff Gurt', disabled: false },
      { id: 'rollladen2', value: 'Kunststoff Elektro', disabled: false },
      { id: 'rollladen3', value: 'Alu Gurt', disabled: false },
      { id: 'rollladen4', value: 'Alu Elektro', disabled: false },
    ],
    tooltip: this.einzelmassnahmenTooltips.rolladenTyp,
  });
  rollladenSelected = signal<Rollladen>('Kunststoff Gurt');

  constructor(public einzelmassnahmenTooltips: einzelmassnahmen) {
    const valuesToEdit = ['Kellerdecke', 'Innenwand'];
    effect(
      () => {
        if (this.hasKellerSelected() === 'Ohne Keller') {
          const bauteilOptionsUpdated = this.bauteilObj.options.filter(
            (item) => !valuesToEdit.includes(item.value)
          );
          this.bauteilObj.options = bauteilOptionsUpdated;
          if (valuesToEdit.includes(this.bauteilSelected())) {
            this.bauteilSelected.set('');
          }
        } else {
          if (
            !this.bauteilObj.options.find(
              (item) => item.value === 'Kellerdecke'
            )
          ) {
            let index = this.bauteilObj.options.findIndex(
              (item) => item.id > 'bauteil07'
            );
            if (index === -1) {
              index = this.bauteilObj.options.length;
            }
            this.bauteilObj.options.splice(index, 0, {
              id: 'bauteil07',
              value: 'Kellerdecke',
              disabled: false,
            });
          }
          if (
            !this.bauteilObj.options.find((item) => item.value === 'Innenwand')
          ) {
            let index = this.bauteilObj.options.findIndex(
              (item) => item.id > 'bauteil06'
            );
            if (index === -1) {
              index = this.bauteilObj.options.length;
            }
            this.bauteilObj.options.splice(index, 0, {
              id: 'bauteil06',
              value: 'Innenwand',
              disabled: false,
            });
          }
        }
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      let bauteil = '';
      if (this.bauteilSelected() === 'Dach') {
        bauteil = this.dachSelected();
      } else {
        bauteil = this.bauteilSelected();
      }
      let obj = this.qualitaetBauteilObjArray.filter(
        (item) => item.title === bauteil
      )[0];
      if (obj) {
        this.selectedQualitaetBauteilObj = obj;
      } else {
        this.selectedQualitaetBauteilObj = null;
      }
    });

    effect(
      () => {
        this.daemmstoffdickeValue.set(this.selectedQualitaet());
      },
      { allowSignalWrites: true }
    );
  }
}
