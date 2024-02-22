// I added the optional text variable to be
// able to change how it is displayed without affecting the formulas

// General
type ProjektTyp = 'Neubau' | 'Sanierung';

// Projekt
// User price
type userPriceObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  description: string;
  disabled: boolean;
};

// Wohnflaeche
type wohnflaecheObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  description: string;
  disabled: boolean;
};

// Anzahl Wohnungen
type anzahlWohnungenObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  description: string;
  disabled: boolean;
};

// Energiestandard Neubau
type EnergiestandardNeubau = 'EH 40' | 'GEG' | 'EH 70';
type EnergiestandardNeubauOptions = {
  id: string;
  value: EnergiestandardNeubau;
  text?: string;
  disabled: boolean;
};
type EnergiestandardNeubauObj = {
  options: EnergiestandardNeubauOptions[];
  title: string;
  description: string;
};

// Energiestandard Sanierung
type EnergiestandardSanierung = 'EH 40' | 'EH 55' | 'EH 70' | 'EH 85';
type EnergiestandardSanierungOptions = {
  id: string;
  value: EnergiestandardSanierung;
  text?: string;
  disabled: boolean;
};
type EnergiestandardSanierungObj = {
  options: EnergiestandardSanierungOptions[];
  title: string;
  description: string;
};

// Konstruktion typ
type Konstruktion = 'Konventionell' | 'Holzbau';
type KonstruktionOptions = {
  id: string;
  value: Konstruktion;
  text?: string;
  disabled: boolean;
};
type KonstruktionObj = {
  options: KonstruktionOptions[];
  title: string;
  description: string;
};

// Zertifizierung Neubau
type ZertifizierungNeubau = 'Keine' | 'ohne QNG' | 'mit QNG';
type ZertifizierungNeubauOptions = {
  id: string;
  value: ZertifizierungNeubau;
  text?: string;
  disabled: boolean;
};
type ZertifizierungNeubauObj = {
  options: ZertifizierungNeubauOptions[];
  title: string;
  description: string;
};

// Zusätzliche Nachhaltigkeitskriterien
type Nachhaltigkeitskriterien = 'EE' | 'NH' | 'Keine';
type NachhaltigkeitskriterienOptions = {
  id: string;
  value: Nachhaltigkeitskriterien;
  text?: string;
  disabled: boolean;
}
type NachhaltigkeitskriterienObj = {
  options: NachhaltigkeitskriterienOptions[];
  title: string;
  description: string;
}

// Zustand Bestand
type ZustandBestand = 'Unsaniert' | 'Teilsaniert' | 'Umfassend saniert';
type ZustandBestandOptions = {
  id: string;
  value: ZustandBestand;
  text?: string;
  disabled: boolean;
};
type ZustandBestandObj = {
  options: ZustandBestandOptions[];
  title: string;
  description: string;
};

// Kellergeschoss
type Kellergeschoss = 'Vorhanden' | 'Nicht Vorhanden';
type KellergeschossOptions = {
  id: string;
  value: Kellergeschoss;
  text?: string;
  disabled: boolean;
};
type KellergeschossObj = {
  options: KellergeschossOptions[];
  title: string;
  description: string;
};

// Stellplaetze
type Stellplaetze = 'Garage' | 'Parkpalette' | 'Tiefgarage';
type StellplaetzeOptions = {
  id: string;
  value: Stellplaetze;
  text?: string;
  disabled: boolean;
};
type StellplaetzeObj = {
  options: StellplaetzeOptions[];
  title: string;
  description: string;
};

// Aufzugsanlage
type Aufzugsanlage = 'Vorhanden' | 'Nicht Vorhanden';
type AufzugsanlageOptions = {
  id: string;
  value: Aufzugsanlage;
  text?: string;
  disabled: boolean;
};
type AufzugsanlageObj = {
  options: AufzugsanlageOptions[];
  title: string;
  description: string;
};

// Barrierefreies Bauen
type BarrierefreiesBauen =
  | 'Keine Anforderungen'
  | 'Barrierereduziert'
  | 'Barrierefrei'
  | 'Barrierefrei (R)';
type BarrierefreiesBauenOptions = {
  id: string;
  value: BarrierefreiesBauen;
  text?: string;
  disabled: boolean;
};
type BarrierefreiesBauenObj = {
  options: BarrierefreiesBauenOptions[];
  title: string;
  description: string;
};

// Dachbegruenung
type Dachbegruenung = 'Vorhanden' | 'Nicht Vorhanden';
type DachbegruenungOptions = {
  id: string;
  value: Dachbegruenung;
  text?: string;
  disabled: boolean;
};
type DachbegruenungObj = {
  options: DachbegruenungOptions[];
  title: string;
  description: string;
};

// Anspruchsvolle Baustellenlogistik
type Baustellenlogistik = 'Vorhanden' | 'Nicht Vorhanden';
type BaustellenlogistikOptions = {
  id: string;
  value: Baustellenlogistik;
  text?: string;
  disabled: boolean;
};
type BaustellenlogistikObj = {
  options: BaustellenlogistikOptions[];
  title: string;
  description: string;
};

// Außenanlagen
type Aussenanlagen = 'Gering' | 'Mittel' | 'Hoch';
type AussenanlagenOptions = {
  id: string;
  value: Aussenanlagen;
  text?: string;
  disabled: boolean;
};
type AussenanlagenObj = {
  options: AussenanlagenOptions[];
  title: string;
  description: string;
};

// Grundstuecksbezogene Kosten
type grundstKostenObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  description: string;
  disabled: boolean;
};

type baunebenkostenKeinFinObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  description: string;
  disabled: boolean;
};

// Darlehen
// Kalkulationszinssatz (Realzins)
type KalkRealzinsObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  description: string;
  disabled: boolean;
};

// Kreditlaufzeit
type KreditlaufzeitObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  description: string;
  disabled: boolean;
};

// KfW Darlehen
type KfWDarlehen = 'Annuitäten' | 'Endfälliges'; // | 'kein';
type KfWDarlehenOptions = {
  id: string;
  value: KfWDarlehen;
  text?: string;
  disabled: boolean;
};
type KfWDarlehenObj = {
  options: KfWDarlehenOptions[];
  title: string;
  description: string;
};

// Bank Darlehen
type BankDarlehen = 'Annuitäten' | 'Endfälliges';
type BankDarlehenOptions = {
  id: string;
  value: BankDarlehen;
  text?: string;
  disabled: boolean;
};
type BankDarlehenObj = {
  options: BankDarlehenOptions[];
  title: string;
  description: string;
};

// Worst Performing Building
type WorstPerformingBuildingObj = {
  value: boolean;
  title: string;
  description: string;
  disabled: boolean;
};

// Serielle Sanierung
type SerielleSanierungObj = {
  value: boolean;
  title: string;
  description: string;
  disabled: boolean;
};
