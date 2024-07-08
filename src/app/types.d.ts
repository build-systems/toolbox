// I added the optional text variable to be
// able to change how it is displayed without affecting the formulas

// Generic type
type SliderNumberObj = {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  tooltip?: string;
  disabled: boolean;
};

type CheckboxObj = {
  value: boolean;
  title: string;
  tooltip?: string;
  disabled: boolean;
};

// Generic type
type Option<T> = {
  id: string;
  value: T;
  text?: string;
  disabled: boolean;
};

type OptionObj<T> = {
  title: string;
  tooltip?: string;
  options: Option<T>[];
};

//Number option (for the output)
type NumberOption = Option<number>;
type NumberOptionsObj = OptionObj<number>;

// Projekt
type SanierungProjektType = 'Einfamilienhaus' | 'Mehrfamilienhaus';
type SanierungProjektTypeOption = Option<SanierungProjektType>;
type SanierungProjektTypeObj = OptionObj<SanierungProjektType>;

// Energiestandard Neubau
type EnergiestandardNeubau = 'EH 40' | 'GEG';
type EnergiestandardNeubauOption = Option<EnergiestandardNeubau>;
type EnergiestandardNeubauObj = OptionObj<EnergiestandardNeubau>;

// Energiestandard Sanierung
type EnergiestandardSanierung = 'EH 40' | 'EH 55' | 'EH 70' | 'EH 85';
type EnergiestandardSanierungOption = Option<EnergiestandardSanierung>;
type EnergiestandardSanierungObj = OptionObj<EnergiestandardSanierung>;

// Konstruktion typ
type Konstruktion = 'Konventionell' | 'Holzbau';
type KonstruktionOption = Option<Konstruktion>;
type KonstruktionObj = OptionObj<Konstruktion>;

// Zertifizierung Neubau
type ZertifizierungNeubau = 'Keine' | 'ohne QNG' | 'mit QNG';
type ZertifizierungNeubauOption = Option<ZertifizierungNeubau>;
type ZertifizierungNeubauObj = OptionObj<ZertifizierungNeubau>;

// Zusätzliche Nachhaltigkeitskriterien
type Foerderbonus = 'EE' | 'NH' | 'Keine';
type FoerderbonusOptions = Option<Foerderbonus>;
type FoerderbonusObj = OptionObj<Foerderbonus>;

// Zustand Bestand
type UmfangModernisierung = 'Nicht/gering' | 'Größtenteils' | 'Umfassend';
type UmfangModernisierungOption = Option<UmfangModernisierung>;
type UmfangModernisierungObj = OptionObj<UmfangModernisierung>;

// Kellergeschoss
type Kellergeschoss = 'Geplant' | 'Nicht geplant';
type KellergeschossOption = Option<Kellergeschoss>;
type KellergeschossObj = OptionObj<Kellergeschoss>;

// Stellplaetze
type Stellplaetze = 'Garage' | 'Parkpalette' | 'Tiefgarage';
type StellplaetzeOption = Option<Stellplaetze>;
type StellplaetzeObj = OptionObj<Stellplaetze>;

// Aufzugsanlage
type Aufzugsanlage = 'Geplant' | 'Nicht geplant';
type AufzugsanlageOption = Option<Aufzugsanlage>;
type AufzugsanlageObj = OptionObj<Aufzugsanlage>;

// Barrierefreies Bauen
type BarrierefreiesBauen =
  | 'Keine Anforderungen'
  | 'Barrierereduziert'
  | 'Barrierefrei'
  | 'Barrierefrei (R)';
type BarrierefreiesBauenOption = Option<BarrierefreiesBauen>;
type BarrierefreiesBauenObj = OptionObj<BarrierefreiesBauen>;

// Dachbegruenung
type Dachbegruenung = 'Geplant' | 'Nicht geplant';
type DachbegruenungOption = Option<Dachbegruenung>;
type DachbegruenungObj = OptionObj<Dachbegruenung>;

// Anspruchsvolle Baustellenlogistik
type Baustellenlogistik = 'Vorhanden' | 'Nicht Vorhanden';
type BaustellenlogistikOption = Option<Baustellenlogistik>;
type BaustellenlogistikObj = OptionObj<Baustellenlogistik>;

// Außenanlagen
type Aussenanlagen = 'Gering' | 'Mittel' | 'Hoch';
type AussenanlagenOption = Option<Aussenanlagen>;
type AussenanlagenObj = OptionObj<Aussenanlagen>;

// Darlehen
// KfW Darlehen
type KfwDarlehen = 'Annuitäten' | 'Endfälliges'; // | 'kein';
type KfWDarlehenOption = Option<KfwDarlehen>;
type KfWDarlehenObj = OptionObj<KfwDarlehen>;

// Bank Darlehen
type BankDarlehen = 'Annuitäten' | 'Endfälliges';
type BankDarlehenOption = Option<BankDarlehen>;
type BankDarlehenObj = OptionObj<BankDarlehen>;

// Einzelmaßnahmen
// Haus
type Haus = 'Einfamilienhaus' | 'Mehrfamilienhaus';
type HausOption = Option<Haus>;
type HausObj = OptionObj<Haus>;

// Bauteil
type Bauteil =
  | 'Außenwand'
  | 'Bodenplatte'
  | 'Dach' // This is temporary. We need a typology selection step: MFH/EFH, Flach-/Steildach, mit/ohne keller
  | 'Dachflächenfenster'
  | 'Fenster'
  | 'Flachdach'
  | 'Innenwand'
  | 'Keller'
  | 'ObersteGeschossdecke'
  | 'Steildach'
  | 'Steildachgauben'
  | 'Türen'
  | 'Vorbaurollladen'
  | 'Wärmedämmverbundsystem';
type BauteilOption = Option<Bauteil>;
type BauteilObj = OptionObj<Bauteil>;

type BauteilText =
  | 'Außenwand'
  | 'Bodenplatte'
  | 'Dachflächenfenster'
  | 'Fenster'
  | 'Flachdach'
  | 'Innenwand'
  | 'Keller'
  | 'Oberste Geschossdecke'
  | 'Steildach'
  | 'Steildachgauben'
  | 'Tür'
  | 'Vorbaurollladen'
  | 'Wärmedämm­verbundsystem';

type Waermeerzeuger =
  | 'Bestandskessel'
  | 'Gas-BW-Kessel'
  | 'Öl-BW-Kessel'
  | 'Pelletkessel'
  | 'Fernwärme'
  | 'Wärmepumpe (Erdkollektor)'
  | 'Wärmepumpe (Erdsonde)'
  | 'Wärmepumpe (Luft)'
  | 'BHKW Erdgas'
  | 'BHKW Biogas'
  | 'BHKW Klärgas'
  | 'BHKW Flüssiggas'
  | 'BHKW Heizöl'
  | 'Solar für WW mit Gaskessel'
  | 'Solar für WW mit Ölkessel'
  | 'Solar für WW mit Pelletkessel'
  | 'Solar für WW&H mit Gaskessel'
  | 'Solar für WW&H mit Ölkessel'
  | 'Solar für WW&H mit Pelletkessel'
  | 'Alter Bestandskessel (Heizöl/Gas)';
type WaermeerzeugerOption = Option<Waermeerzeuger>;
type WaermeerzeugerObj = OptionObj<Waermeerzeuger>;

type Fenster = '3WSV Passivhaus' | '3WSV konventionell' | '2WSV konventionell';
type FensterOption = Option<Fenster>;
type FensterObj = OptionObj<Fenster>;

type Keller =
  | 'unterseitig ohne Bekleidung'
  | 'unterseitig mit Bekleidung'
  | 'oberseitig';
type KellerOption = Option<Keller>;
type KellerObj = OptionObj<Keller>;

type ObersteGeschossdecke = 'begehbar' | 'nicht begehbar';
type ObersteGeschossdeckeOption = Option<ObersteGeschossdecke>;
type ObersteGeschossdeckeObj = OptionObj<ObersteGeschossdecke>;

type Dach = 'Flachdach' | 'Steildach';
type DachOption = Option<Dach>;
type DachObj = OptionObj<Dach>;

type Flachdach = 'ohne Lichtkuppeln' | 'mit Lichtkuppeln';
type FlachdachOption = Option<Flachdach>;
type FlachdachObj = OptionObj<Flachdach>;

type Vorbaurollladen =
  | 'Kunststoff Gurt'
  | 'Kunststoff Elektro'
  | 'Alu Gurt'
  | 'Alu Elektro';
type VorbaurollladenOption = Option<Vorbaurollladen>;
type VorbaurollladenObj = OptionObj<Vorbaurollladen>;

type OutputTitle =
  | 'Kosten'
  | 'Vollkosten'
  | 'Sowieso-Kosten'
  | 'Energetisch Kosten';

type EinzelmassnahmenOutputValue = {
  title: OutputTitle;
  id: number | undefined;
  description?: string;
  unit: string;
  value: number;
};

type EinzelmassnahmenOutputItem = {
  title: BauteilText | undefined;
  id: number | undefined;
  description?: string;
  values: EinzelmassnahmenOutputValue[];
};

type EinzelmassnahmenOutputProject = {
  title: string;
  id: number | undefined;
  items: EinzelmassnahmenOutputItem[];
};
