// I added the optional text variable to be
// able to change how it is displayed without affecting the formulas

// Projekt
type sanierungProjektType = 'Einfamilienhaus' | 'Mehrfamilienhäuser';
type sanierungProjektTypeOptions = {
  id: string;
  value: sanierungProjektType;
  text?: string;
  disabled: boolean;
};
type sanierungProjektTypeObj = {
  options: sanierungProjektTypeOptions[];
  title: string;
};

// User price
type eigeneKostenObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  disabled: boolean;
};

// Wohnflaeche
type wohnflaecheObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  disabled: boolean;
};

// Anzahl Wohnungen
type anzahlWohnungenObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  disabled: boolean;
};

// Energiestandard Neubau
type EnergiestandardNeubau = 'EH 40' | 'GEG';
type EnergiestandardNeubauOptions = {
  id: string;
  value: EnergiestandardNeubau;
  text?: string;
  disabled: boolean;
};
type EnergiestandardNeubauObj = {
  options: EnergiestandardNeubauOptions[];
  title: string;
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
};

// Zusätzliche Nachhaltigkeitskriterien
type Foerderbonus = 'EE' | 'NH' | 'Keine';
type FoerderbonusOptions = {
  id: string;
  value: Foerderbonus;
  text?: string;
  disabled: boolean;
}
type FoerderbonusObj = {
  options: FoerderbonusOptions[];
  title: string;
}

// Zustand Bestand
type UmfangModernisierung = 'Nicht/gering' | 'Größtenteils' | 'Umfassend';
type UmfangModernisierungOptions = {
  id: string;
  value: UmfangModernisierung;
  text?: string;
  disabled: boolean;
};
type UmfangModernisierungObj = {
  options: UmfangModernisierungOptions[];
  title: string;
};

// Kellergeschoss
type Kellergeschoss = 'Geplant' | 'Nicht geplant';
type KellergeschossOptions = {
  id: string;
  value: Kellergeschoss;
  text?: string;
  disabled: boolean;
};
type KellergeschossObj = {
  options: KellergeschossOptions[];
  title: string;
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
};

// Aufzugsanlage
type Aufzugsanlage = 'Geplant' | 'Nicht geplant';
type AufzugsanlageOptions = {
  id: string;
  value: Aufzugsanlage;
  text?: string;
  disabled: boolean;
};
type AufzugsanlageObj = {
  options: AufzugsanlageOptions[];
  title: string;
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
};

// Dachbegruenung
type Dachbegruenung = 'Geplant' | 'Nicht geplant';
type DachbegruenungOptions = {
  id: string;
  value: Dachbegruenung;
  text?: string;
  disabled: boolean;
};
type DachbegruenungObj = {
  options: DachbegruenungOptions[];
  title: string;
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
};

// Grundstuecksbezogene Kosten
type grundstKostenObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  disabled: boolean;
};

// Baunebenkosten Kein Fin
type BaunebenkostenOhneFinObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  disabled: boolean;
};

// Darlehen
// Zinssatz Hausbank (Sollzins) old Kalkulationszinssatz (Realzins)
type zinssatzBankObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  disabled: boolean;
};

// Kreditlaufzeit
type KreditlaufzeitObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
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
};

// Worst Performing Building
type WorstPerformingBuildingObj = {
  value: boolean;
  title: string;
  disabled: boolean;
};

// Serielle Sanierung
type SerielleSanierungObj = {
  value: boolean;
  title: string;
  disabled: boolean;
};
