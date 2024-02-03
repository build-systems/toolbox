export interface DashboardOutput {
  typ: ProjektTyp;
  // Darlehen
  kreditlaufzeit: number;
  kfWDarlehen: KfWDarlehen;
  bankDarlehen: BankDarlehen;
  // Zusammenfassung Ergebnisse
  annuitaetKfW: number;
  annuitaetBank: number;
  efKfW: number;
  efBank: number;
  kfwKredit: number;
  kfwKreditM2: number;
  kfwKreditProBau: number;
  bankKredit: number;
  bankKreditM2: number;
  bankKreditProBau: number;
  finanzierungskostenKfw: number;
  finanzierungskostenKfwM2: number;
  finanzierungskostenFinanzmarkt: number;
  finanzierungskostenFinanzmarktM2: number;
  investitionskosten: number;
  investitionskostenM2: number;
  investitionskostenProBau: number;
  kfwZuschuss: number;
  kfwZuschussM2: number;
  kfwZuschussProBau: number;
  ohneKfw: number;
  ohneKfwM2: number;
  mitKfw: number;
  mitKfwM2: number;
}