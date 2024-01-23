// I added the optional text variable to be
// able to change how it is displayed without affecting the formulas

// General
type ProjektTyp = 'Neubau' | 'Sanierung';

// Projekt
// User price
type userPriceObj = {
  min: number;
  init: number;
  max: number;
  step: number;
  title: string;
  description: string;
};

// Wohnflaeche
type wohnflaecheObj = {
  min: number;
  init: number;
  max: number;
  step: number;
  title: string;
  description: string;
};

// Anzahl Wohnungen
type anzahlWohnungenObj = {
  min: number;
  init: number;
  max: number;
  step: number;
  title: string;
  description: string;
};

// Energiestandard Neubau
type EnergiestandardNeubau = 'EH 40' | 'GEG' | 'EH 70';
type EnergiestandardNeubauOptions = {
  id: string;
  value: EnergiestandardNeubau;
  text?: string;
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
};
type ZertifizierungNeubauObj = {
  options: ZertifizierungNeubauOptions[];
  title: string;
  description: string;
};

// Zertifizierung Sanierung
type ZertifizierungSanierung = 'Keine Zertifizierung' | 'QNG';
type ZertifizierungSanierungOptions = {
  id: string;
  value: ZertifizierungSanierung;
  text?: string;
};
type ZertifizierungSanierungObj = {
  options: ZertifizierungSanierungOptions[];
  title: string;
  description: string;
};

// Zustand Bestand
type ZustandBestand = 'Unsaniert' | 'Teilsaniert' | 'Umfassend saniert';
type ZustandBestandOptions = {
  id: string;
  value: ZustandBestand;
  text?: string;
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
};
type AussenanlagenObj = {
  options: AussenanlagenOptions[];
  title: string;
  description: string;
};

// Grundstuecksbezogene Kosten
type grundstKostenObj = {
  init: number;
  min: number;
  max: number;
  step: number;
  title: string;
  description: string;
};

// Darlehen
// Kalkulationszinssatz (Realzins)
type KalkRealzinsObj = {
  min: number;
  init: number;
  max: number;
  step: number;
  title: string;
  description: string;
};

// Kreditlaufzeit
type KreditlaufzeitObj = {
  min: number;
  init: number;
  max: number;
  step: number;
  title: string;
  description: string;
};

// KfW Darlehen
type KfWDarlehen = 'Annuitäten' | 'Endfälliges' | 'kein';
type KfWDarlehenOptions = {
  id: string;
  value: KfWDarlehen;
  text?: string;
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
};

// Serielle Sanierung
type SerielleSanierungObj = {
  value: boolean;
  title: string;
  description: string;
};

// EE Klasse
type EeKlasseObj = {
  value: boolean;
  title: string;
  description: string;
};
