export interface SanierungProjekt {
  // Projekt
  title: string;
  id: number | undefined;
  projektType: SanierungProjektType;
  userPriceDisabled: boolean;
  userPrice: number;
  wohnflaeche: number;
  anzahlWohnungen: number;
  energiestandard: EnergiestandardSanierung;
  // Sanierung
  worstPerformingBuilding: boolean;
  serielleSanierung: boolean;
  umfangModernisierung: UmfangModernisierung;
  foerderbonus: Foerderbonus;
  // Dalehen
  zinssatzBank: number;
  kreditlaufzeit: number;
  kfwDarlehen: KfwDarlehen;
  bankDarlehen: BankDarlehen;
  // Output
  tilgungszuschuss: number;
  eeBonus: number;
  nhBonus: number;
  wpbBonus: number;
  serSanBonus: number;
  gestehungskosten: number;
  nrKredit: number;
  zinssatzKfw: number;
  kfwKreditschwelleProWe: number;
  maxKfwKredit: number;
  baukosten: number;
  baukostenProBau: number;
  foerdersumme: number;
  afKfw: number;
  afBank: number;
  annuitaetKfw: number;
  annuitaetBank: number;
  efKfw: number;
  efBank: number;
  gbAnnuitaet: number;
  gbEndfaelliges: number;
  // Zusammenfassung Ergebnisse
  kfwKredit: number;
  kfwKreditM2: number;
  kfwKreditProBau: number;
  bankKredit: number;
  bankKreditM2: number;
  bankKreditProBau: number;
  finanzierungskostenKfw: number;
  finanzierungskostenKfwM2: number;
  finanzierungskostenBank: number;
  finanzierungskostenBankM2: number;
  kfwZuschussPercentage: number;
  kfwZuschuss: number;
  kfwZuschussM2: number;
  kfwZuschussProBau: number;
  // Vergleichsrechnung
  finKostenOhneKfw: number;
  finKostenOhneKfwM2: number;
  finKostenMitKfw: number;
  finKostenMitKfwM2: number;
}