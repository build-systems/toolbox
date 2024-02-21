export interface SanierungProjekt {
  // Projekt
  wohnflaeche: number;
  anzahlWohnungen: number;
  energiestandard: EnergiestandardSanierung;
  konstruktion?: Konstruktion;
  zertifizierung: ZertifizierungSanierung;
  // Sanierung
  worstPerformingBuilding: boolean;
  serielleSanierung: boolean;
  zustandBestand: ZustandBestand;
  eeKlasse: boolean;
  // Dalehen
  kalkRealzins: number;
  kreditlaufzeit: number;
  kfWDarlehen: KfWDarlehen;
  bankDarlehen: BankDarlehen;
  // Output
  tilgungszuschuss: number;
  eeBonus: number;
  nhBonus: number;
  wpbBonus: number;
  serSanBonus: number;
  gestehungskosten: number;
  nrKredit: number;
  sollzinsKfw: number;
  maxKfwKredit: number;
  gesamtgestehungskosten: number;
  foerdersumme: number;
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
  kfwKreditProBau: number;
  bankKredit: number;
  bankKreditM2: number;
  bankKreditProBau: number;
  finanzierungskostenKfw: number;
  finanzierungskostenKfwM2: number;
  finanzierungskostenBank: number;
  finanzierungskostenBankM2: number;
  investitionskosten: number;
  investitionskostenProBau: number;
  kfwZuschuss: number;
  kfwZuschussM2: number;
  kfwZuschussProBau: number;
  // Vergleichsrechnung
  finKostenOhneKfw: number;
  finKostenOhneKfwM2: number;
  finKostenMitKfw: number;
  finKostenMitKfwM2: number;
}