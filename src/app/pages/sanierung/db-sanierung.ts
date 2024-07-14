export interface DbSanierung {
  // Projekt
  projekt_type: SanierungProjektType;
  id: number;
  title: string;
  created_by: string; // UUID
  created_at: string; // timestamp with time zone
  owned_by: string; // UUID
  last_edited_by: string; // UUID
  last_edited_at: string; // timestamp with time zone
  user_price_disabled: boolean;
  user_price: number;
  wohnflaeche: number;
  anzahl_wohnungen: number;
  energiestandard: EnergiestandardSanierung;

  // Sanierung
  worst_performing_building: boolean;
  serielle_sanierung: boolean;
  umfang_modernisierung: UmfangModernisierung;
  foerderbonus: Foerderbonus;

  // Dalehen
  zinssatz_bank: number;
  kreditlaufzeit: number;
  kfw_darlehen: KfwDarlehen;
  bank_darlehen: BankDarlehen;

  // Output
  tilgungszuschuss: number;
  ee_bonus: number;
  nh_bonus: number;
  wpb_bonus: number;
  ser_san_bonus: number;
  gestehungskosten: number;
  nr_kredit: number;
  zinssatz_kfw: number;
  kfw_kreditschwelle_pro_we: number;
  max_kfw_kredit: number;
  baukosten: number;
  baukosten_pro_bau: number;
  foerdersumme: number;
  af_kfw: number;
  af_bank: number;
  annuitaet_kfw: number;
  annuitaet_bank: number;
  ef_kfw: number;
  ef_bank: number;
  gb_annuitaet: number;
  gb_endfaelliges: number;

  // Zusammenfassung Ergebnisse
  kfw_kredit: number;
  kfw_kredit_m2: number;
  kfw_kredit_pro_bau: number;
  bank_kredit: number;
  bank_kredit_m2: number;
  bank_kredit_pro_bau: number;
  finanzierungskosten_kfw: number;
  finanzierungskosten_kfw_m2: number;
  finanzierungskosten_bank: number;
  finanzierungskosten_bank_m2: number;
  kfw_zuschuss_percentage: number;
  kfw_zuschuss: number;
  kfw_zuschuss_m2: number;
  kfw_zuschuss_pro_bau: number;

  // Vergleichsrechnung
  fin_kosten_ohne_kfw: number;
  fin_kosten_ohne_kfw_m2: number;
  fin_kosten_mit_kfw: number;
  fin_kosten_mit_kfw_m2: number;
}
