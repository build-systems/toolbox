export interface NeubauProjekt {
  title: string;
  // Projekt
  eigeneKostenDisabled: boolean;
  eigeneKosten: number;
  wohnflaeche: number;
  anzahlWohnungen: number;
  energiestandard: EnergiestandardNeubau;
  konstruktion: Konstruktion;
  zertifizierung: ZertifizierungNeubau;
  // Neubau input
  kellergeschossIn: Kellergeschoss;
  stellplaetzeIn: Stellplaetze;
  aufzugsanlageIn: Aufzugsanlage;
  barrierefreiheitIn: BarrierefreiesBauen;
  dachbegruenungIn: Dachbegruenung;
  baustellenlogistikIn: Baustellenlogistik;
  aussenanlagenIn: Aussenanlagen;
  grundstuecksbezogeneKosten: number;
  baunebenkostenOhneFinIn: number;
  // Neubau output
  kellergeschossOut: number;
  stellplaetzeOut: number;
  redGarageOut: number;
  aufzugsanlageOut: number;
  barrierefreiheitOut: number;
  dachbegruenungOut: number;
  baustellenlogistikOut: number;
  aussenanlagenOut: number;
  energetischerStandard: number;
  baunebenkostenOhneFinOut: number;
  // Dalehen
  zinssatzBank: number;
  kreditlaufzeit: number;
  kfWDarlehen: KfWDarlehen;
  bankDarlehen: BankDarlehen;
  // Output
  gestehungskosten: number;
  nrKredit: number;
  zinssatzKfw: number;
  baukosten: number;
  baukostenProBau: number;
  investitionkosten: number;
  investitionkostenM2: number;
  investitionkostenProBau: number;
  afKfw: number;
  afBank: number;
  annuitaetKfW: number;
  annuitaetBank: number;
  efKfW: number;
  efBank: number;
  gbAnnuitaet: number;
  gbEndfaelliges: number;
  // Zusammenfassung Ergebnisse
  kfwKredit: number;
  kfwKreditM2: number;
  kfwKreditschwelleProWe: number;
  bankKredit: number;
  bankKreditM2: number;
  bankKreditProBau: number;
  finanzierungskostenKfw: number;
  finanzierungskostenKfwM2: number;
  finanzierungskostenBank: number;
  finanzierungskostenBankM2: number;
  // Vergleichsrechnung
  finKostenOhneKfw: number;
  finKostenOhneKfwM2: number;
  finKostenMitKfw: number;
  finKostenMitKfwM2: number;
}
