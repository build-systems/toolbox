import { Injectable } from '@angular/core';

// KfW 297/298, Checked on 2024/04/22
// https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/F%C3%B6rderprodukte/Klimafreundlicher-Neubau-Wohngeb%C3%A4ude-(297-298)/
// https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger
@Injectable({
  providedIn: 'root',
})
export class neubau {
  public kellerVorhanden = 147; // 192 - 45;
  public stellplaetze = {
    tiefgarage: 490,
    garage: 68,
    parkpalette: 95,
  };
  public redGarage = -68;
  public aufzugsanlageVorhanden = 93;
  public barriere = {
    reduziert: 62,
    frei: 199,
    freiR: 348,
  };
  public dachbegruenungVorhanden = 55;
  public baustellenlogistikVorhanden = 212;
  public aussenanlagen = {
    gering: 62,
    mittel: 150,
    hoch: 277,
  };
  public energetischerStandardPrice = {
    EH40: 156, // 294 - 138
    GEG: 0,
    EH70: 0,
    // EH85: 0,
  };
  public gestehungskostenBase = 2436;
  public nrKredit = {
    lessThan11: 0.0256,
    between11And25: 0.0294,
    moreThan25: 0.0301,
  };
  public zinssatzKfw_Endfälliges = 0.0304;
  public kfwKreditLimit = {
    lower: 100_000,
    higher: 150_000,
  };
  public holzbauExtra = 1.05; // Extra 5%
}

// KfW 261, Checked on 2024/04/22
// https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Bundesf%C3%B6rderung-f%C3%BCr-effiziente-Geb%C3%A4ude-Wohngeb%C3%A4ude-Kredit-(261-262)/
// https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger
@Injectable({
  providedIn: 'root',
})
export class sanierung {
  public tilgungszuschuss = {
    EH40: 0.2,
    EH55: 0.15,
    EH70: 0.1,
    EH85: 0.05,
  };
  eeBonusPossible = 0.05;
  nhBonusPossible = 0.05;
  wpbBonusPossible = 0.1;
  // Seriellen Sanierung
  serSanBonusPossible = 0.15;
  public nrKredit = {
    lessThan11: 0.0217,
    between11And20: 0.0263,
    moreThan20: 0.0275,
  };
  sollzinsKfw_Endfälliges = 0.028;
  public kfwKreditLimit = {
    lower: 120_000,
    higher: 150_000,
  };
  // Percentages are also influenced by year the repayment start. Check on kfw page above
  public kfwZuschussMaxMultiplier = 0.45;
}
