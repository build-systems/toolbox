import { Injectable } from '@angular/core';

// KfW 298, Checked on 2024/02/21
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
    lessThan11: 1.14,
    between11And25: 1.98,
    moreThan25: 2.11,
  };
  public sollzinsKfw_Endfälliges = 2.18;
  public kfwKreditLimit = {
    lower: 100_000,
    higher: 150_000,
  };
  public holzbauBonus = 1.05;
}

// KfW 261, Checked on 2024/02/21
// https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Bundesf%C3%B6rderung-f%C3%BCr-effiziente-Geb%C3%A4ude-Wohngeb%C3%A4ude-Kredit-(261-262)/
// https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger
@Injectable({
  providedIn: 'root',
})
export class sanierung {
  public tilgungszuschuss = {
    EH40: 20,
    EH55: 15,
    EH70: 10,
    EH85: 5,
  };
  eeBonusPossible = 5;
  nhBonusPossible = 5;
  wpbBonusPossible = 10;
  // Seriellen Sanierung
  serSanBonusPossible = 15;
  public nrKredit = {
    lessThan11: 1.64,
    between11And20: 2.26,
    moreThan20: 2.41,
  };
  sollzinsKfw_Endfälliges = 2.49;
  public kfwKreditLimit = {
    lower: 120_000,
    higher: 150_000,
  };
  // Percentages are also influenced by year the repayment start. Check on kfw page above
  public kfwZuschussMaxMultiplier = 0.45;
}
