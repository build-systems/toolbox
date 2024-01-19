import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class neubau {
  public kellerVorhanden = 192 - 45;
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
    reduziertR: 348,
  };
  public dachbegruenungVorhanden = 55;
  public baustellenlogistikVorhanden = 212;
  public aussenanlagen = {
    gering: 62,
    mittel: 150,
    hoch: 277,
  };
  public energetischerStandardPrice = {
    EH40: 294 - 138,
    EH55: 0,
    EH70: 0,
    EH85: 0,
  };
  public nrKredit = {
    lessThan10: 0.01,
    between10And25: 0.79,
    moreThan25: 1.02,
  };
  public sollzinsKfw_Endfälliges = 1.14; // KfW 298 offline. 2024-01-19
  public kfwKreditLimit = {
    lower: 100_000,
    higher: 150_000,
  };
  public restsummeHolzbau = 1.05;
  public gestehungskostenBase = 2436;
}

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
  serSanBonusPossible = 15;
  // KfW 261, Checked on 2024/01/19 at https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger
  public nrKredit = {
    lessThan10: 0.99,
    between10And20: 1.78,
    moreThan20: 1.97,
  };
  // KfW 261, Checked on 2024/01/19 at https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger
  sollzinsKfw_Endfälliges = 2.06; 
  public kfwKreditLimit = {
    lower: 100_000,
    higher: 150_000,
  };
  // Percentages are also influenced by year the repayment start:
  // https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Bundesf%C3%B6rderung-f%C3%BCr-effiziente-Geb%C3%A4ude-Wohngeb%C3%A4ude-Kredit-(261-262)/
}
