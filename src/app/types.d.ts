// I added the optional text variable to be
// able to change how it is displayed without affecting the formulas

// Projekt
type SanierungProjektType = 'Einfamilienhaus' | 'Mehrfamilienhaus';
type SanierungProjektTypeOptions = {
  id: string;
  value: SanierungProjektType;
  text?: string;
  disabled: boolean;
};
type SanierungProjektTypeObj = {
  options: SanierungProjektTypeOptions[];
  title: string;
};

// Wohnflaeche
type SliderNumberObj = {
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
};
type FoerderbonusObj = {
  options: FoerderbonusOptions[];
  title: string;
};

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

// Darlehen
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

type WaermeerzeugerEinzelmassnahmenOptions = {
  id: string;
  value: string;
  disabled: boolean;
};

// Einzelmaßnahmen
// Bauteil
type Bauteil =
  | 'Flachdach'
  | 'Steildach'
  | 'Dachflächenfenster'
  | 'Oberste Geschossdecke'
  | 'Außenwand'
  | 'Bodenplatte'
  | 'Fenster'
  | 'Türen'
  | 'WDVS'
  | 'Innenwand'
  | 'Vorbaurollladen'
  | 'Keller';
type BauteilOptions = {
  id: string;
  value: Bauteil;
  disabled: boolean;
};
type BauteilObj = {
  options: BauteilOptions[];
  title: string;
};

// Wärmeerzeuger (Bestand)
type WaermeerzeugerEinzelmassnahmenObj = {
  options: WaermeerzeugerEinzelmassnahmenOptions[];
  title: string;
};

type Fenster = '3WSV Passivhaus' | '3WSV konv.' | '2WSV konv.';
type FensterOptions = {
  id: string;
  value: Fenster;
  disabled: boolean;
};
type FensterObj = {
  options: FensterOptions[];
  title: string;
};
type Dachflaechenfenster = 'Einfamilienhaus' | 'Mehrfamilienhaus';
type DachflaechenfensterOptions = {
  id: string;
  value: Dachflaechenfenster;
  disabled: boolean;
};
type DachflaechenfensterObj = {
  options: DachflaechenfensterOptions[];
  title: string;
};

type Tuer = 'Einfamilienhaus' | 'Mehrfamilienhaus';
type TuerOptions = {
  id: string;
  value: Tuer;
  disabled: boolean;
};
type TuerObj = {
  options: TuerOptions[];
  title: string;
};

type Keller =
  | 'unterseitig ohne Bekleidung'
  | 'unterseitig mit Bekleidung'
  | 'oberseitig';
type KellerOptions = {
  id: string;
  value: Keller;
  disabled: boolean;
};
type KellerObj = {
  options: KellerOptions[];
  title: string;
};

type ObersteGeschossdecke = 'begehbar' | 'nicht begehbar';
type ObersteGeschossdeckeOptions = {
  id: string;
  value: ObersteGeschossdecke;
  disabled: boolean;
};
type ObersteGeschossdeckeObj = {
  options: ObersteGeschossdeckeOptions[];
  title: string;
};

type Flachdach =
  | 'ohne Lichtkuppeln'
  | 'mit Lichtkuppeln Einfamilienhaus'
  | 'mit Lichtkuppeln Mehrfamilienhaus';
type FlachdachOptions = {
  id: string;
  value: Flachdach;
  disabled: boolean;
};
type FlachdachObj = {
  options: FlachdachOptions[];
  title: string;
};

type Vorbaurollladen =
  | 'Kunststoff, Gurt'
  | 'Kunststoff, Elektro'
  | 'Alu, Gurt'
  | 'Alu, Elektro';
type VorbaurollladenOptions = {
  id: string;
  value: Vorbaurollladen;
  disabled: boolean;
};
type VorbaurollladenObj = {
  options: VorbaurollladenOptions[];
  title: string;
};
