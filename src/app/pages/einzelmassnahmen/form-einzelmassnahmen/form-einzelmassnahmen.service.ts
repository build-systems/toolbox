import { Injectable, signal } from '@angular/core';
import { allgemein, einzelmassnahmen } from '../../../shared/tooltips';

@Injectable({
  providedIn: 'root',
})
export class FormEinzelmassnahmenService {
  // Bauteil
  bauteilObj = signal<BauteilObj>({
    options: [
      { id: 'bauteil01', value: 'Außenwand', disabled: false },
      { id: 'bauteil02', value: 'Bodenplatte', disabled: false },
      { id: 'bauteil03', value: 'Dachflächenfenster', disabled: false },
      { id: 'bauteil04', value: 'Fenster', disabled: false },
      { id: 'bauteil05', value: 'Flachdach', disabled: false },
      { id: 'bauteil06', value: 'Innenwand', disabled: false },
      { id: 'bauteil07', value: 'Keller', disabled: false },
      {
        id: 'bauteil08',
        value: 'ObersteGeschossdecke',
        text: 'Oberste Geschossdecke',
        disabled: false,
      },
      { id: 'bauteil09', value: 'Steildach', disabled: false },
      { id: 'bauteil10', value: 'Steildachgauben', disabled: false },
      { id: 'bauteil11', value: 'Türen', disabled: false },
      { id: 'bauteil12', value: 'Vorbaurollladen', disabled: false },
      { id: 'bauteil13', value: 'WDVS', disabled: false },
    ],
    title: 'Bauteil',
  });
  bauteilSelected = signal<string>('');

  // C3 → Wohnfläche [m²]
  // Wohnfläche centralized form values
  // This one is not necessary for the first version
  wohnflaeche: SliderNumberObj = {
    min: 20,
    value: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²]',
    tooltip: this.einzelmassnahmenTooltips.placeholder,
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
    tooltip: this.einzelmassnahmenTooltips.placeholder,
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

  // C19 → Eingabe Fläche Einzelfenster [m²]
  fensterflaeche = signal<SliderNumberObj>({
    min: 0.1,
    value: 1,
    max: 100,
    step: 0.1,
    title: 'Einzelfensterfläche [m²]',
    tooltip: this.einzelmassnahmenTooltips.placeholder,
    disabled: false,
  });
  fensterflaecheValue = signal<number>(1);

  // C20 → Eingabe Fensterfläche gesamt [m²]
  gesamtFensterflaeche = signal<SliderNumberObj>({
    min: 1,
    value: 1,
    max: 1000,
    step: 1,
    title: 'Gesamt Fensterfläche [m²]',
    tooltip: this.einzelmassnahmenTooltips.placeholder,
    disabled: false,
  });
  gesamtFensterflaecheValue = signal<number>(1);

  // Fenster
  fensterObj = signal<FensterObj>({
    title: 'Fenster Typ',
    tooltip: this.einzelmassnahmenTooltips.placeholder,
    options: [
      { id: 'fenst1', value: '3WSV Passivhaus', disabled: false },
      { id: 'fenst2', value: '3WSV konventionell', disabled: false },
      { id: 'fenst3', value: '2WSV konventionell', disabled: false },
    ],
  });
  fensterSelected = signal<Fenster>(this.fensterObj().options[0].value);

  // Dachflaechenfenster
  dachflaechenfensterObj = signal<DachflaechenfensterObj>({
    title: 'Dachflächenfenster Typ',
    options: [
      { id: 'dachfenst1', value: 'Einfamilienhaus', disabled: false },
      { id: 'dachfenst2', value: 'Mehrfamilienhaus', disabled: false },
    ],
    tooltip: this.einzelmassnahmenTooltips.placeholder,
  });
  dachflaechenfenster = signal<Dachflaechenfenster>(
    this.dachflaechenfensterObj().options[0].value
  );

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

  tuerObj = signal<TuerObj>({
    title: 'Tür Typ',
    options: [
      { id: 'tuer1', value: 'Einfamilienhaus', disabled: false },
      { id: 'tuer2', value: 'Mehrfamilienhaus', disabled: false },
    ],
    tooltip: this.einzelmassnahmenTooltips.placeholder,
  });
  tuerSelected = signal<Tuer>('Einfamilienhaus');

  isOpakeVisible(): boolean {
    const allowedBauteile: Bauteil[] = [
      'Außenwand',
      'Bodenplatte',
      'Flachdach',
      'Innenwand',
      'Keller',
      'ObersteGeschossdecke',
      'Steildach',
      'WDVS',
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
    max: 100,
    step: 0.1,
    title: 'Dämmstoffdicke [cm]',
    disabled: false,
  });
  daemmstoffdickeValue = signal<number>(10);

  kellerObj = signal<KellerObj>({
    title: 'Keller Typ',
    options: [
      { id: 'keller1', value: 'unterseitig ohne Bekleidung', disabled: false },
      { id: 'keller2', value: 'unterseitig mit Bekleidung', disabled: false },
      {
        id: 'keller3',
        value: 'oberseitig',
        disabled: false,
      },
    ],
    tooltip: this.einzelmassnahmenTooltips.placeholder,
  });
  kellerSelected = signal<Keller>('unterseitig ohne Bekleidung');

  obersteGeschossdeckeObj = signal<ObersteGeschossdeckeObj>({
    title: 'Oberste Geschossdecke',
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
    tooltip: this.einzelmassnahmenTooltips.placeholder,
  });
  obersteGeschossdeckeSelected = signal<ObersteGeschossdecke>('begehbar');

  flachdachObj = signal<FlachdachObj>({
    title: 'Flachdach Typ',
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
    tooltip: this.einzelmassnahmenTooltips.placeholder,
  });
  flachdachSelected = signal<Flachdach>('ohne Lichtkuppeln');

  // C42 → Fläche der Gaube(n) [m²]
  gaubeflaecheObj = signal<SliderNumberObj>({
    min: 1,
    value: 100,
    max: 1000,
    step: 1,
    title: 'Fläche der Gaube(n) [m²]',
    disabled: false,
  });
  gaubeflaecheValue = signal<number>(100);

  // C44 → Fläche Rollladen [m²]
  rollladenflaecheObj = signal<SliderNumberObj>({
    min: 1,
    value: 100,
    max: 1000,
    step: 1,
    title: 'Fläche Rollladen [m²]',
    disabled: false,
  });
  rollladenflaecheValue = signal<number>(100);

  constructor(public einzelmassnahmenTooltips: einzelmassnahmen) {}
}
