import { Injectable } from '@angular/core';

// KfW 297/298, Checked on 2024/06/07
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
    lessThan11: 0.0266, // 4 bis 10 Jahre
    between11And25: 0.0302, // 11 bis 25 Jahre
    moreThan25: 0.0307, // 26 bis 35 Jahre
  };
  public zinssatzKfw_Endfälliges = 0.0311; // Endfälliges Darlehen
  public kfwKreditLimit = {
    lower: 100_000,
    higher: 150_000,
  };
  public holzbauExtra = 1.05; // Extra 5%
}

// KfW 261, Checked on 2024/06/07
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
    lessThan11: 0.0227, // 4 bis 10 Jahre
    between11And20: 0.0271, // 11 bis 20 Jahre
    moreThan20: 0.0282, // 21 bis 30 Jahre
  };
  sollzinsKfw_Endfälliges = 0.0287; // Endfälliges Darlehen
  public kfwKreditLimit = {
    lower: 120_000,
    higher: 150_000,
  };
  // Percentages are also influenced by year the repayment start. Check on kfw page above
  public kfwZuschussMaxMultiplier = 0.45;
}

@Injectable({
  providedIn: 'root',
})
export class einzelmassnahmen {
  // C5 → Heizlast nach DIN EN 12831 Bbl 2 [kW]
  public heizlastDIN12831 = 12;
  // C9 → Baupreisindex 2015 (Q1)
  public baupreisindex2015 = 99.6;
  // C10 → Baupreisindex aktuell (DESTATIS)
  public baupreisindexAktuell = 161.3;
  // C12 → Ortsfaktor 1,001
  public ortsfaktor = 1.001;
  // C15 → Baunebenkosten [%]
  public baunebenkosten = 15;
  //Schätzwert [€/m²]
  // Daten!D10 → 3WSV, Dreh/Kipp, Passivhaus EFH&MFH für F&Ft = 658,86
  // Daten!D11 → 3WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft = 472,33
  // Daten!D12 → 2WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft = 413,45
  // Daten!E10 → 3WSV, Dreh/Kipp, Passivhaus EFH&MFH für F&Ft = 0,257
  // Daten!E11 → 3WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft = 0,222
  // Daten!E12 → 2WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft = 0,231
  public fenster = {
    '3WSV Passivhaus': {
      SchaetzwertA: 658.86,
      SchaetzwertB: 0.257,
      GeltungsbereichVon: 0.8,
      GeltungsbereichBis: 8.5,
      GeltungsbereichEinheit: 'sqm',
      Lebensjahre: 50,
    },
    '3WSV konventionell': {
      SchaetzwertA: 472.33,
      SchaetzwertB: 0.222,
      GeltungsbereichVon: 0.8,
      GeltungsbereichBis: 8.6,
      GeltungsbereichEinheit: 'sqm',
      Lebensjahre: 50,
    },
    '2WSV konventionell': {
      SchaetzwertA: 413.45,
      SchaetzwertB: 0.231,
      GeltungsbereichVon: 0.8,
      GeltungsbereichBis: 8.7,
      GeltungsbereichEinheit: 'sqm',
      Lebensjahre: 50,
    },
  };
  // Schätzwert [€/ m² Bauteil]
  // Daten!C15 → Dachflächenfenster EFH pro Fenster = 1430
  // Daten!C16 → Dachflächenfenster MFH pro Fenster = 1435
  public dachflaechenfenster = {
    Einfamilienhaus: {
      SchaetzwertA: 1430,
      Lebensjahre: 40,
    },
    Mehrfamilienhaus: {
      SchaetzwertA: 1435,
      Lebensjahre: 40,
    },
  };
  // Schätzwert [€/ m² Bauteil]
  // Daten!C19 → Haustür EFH = 1433
  // Daten!C20 → Haustür MFH = 1222
  public tuer = {
    Einfamilienhaus: {
      SchaetzwertA: 1433,
      Lebensjahre: 50,
    },
    Mehrfamilienhaus: {
      SchaetzwertA: 1222,
      Lebensjahre: 50,
    },
  };
  // C31 → Wärmeleitfähigkeit (λ) [W/mK]
  public warrmeleitfaehigkeit = 0.035;
  // WDVS (zzgl. Gerüstkosten)
  // Daten!B23 → Schätzwert [€/ m² Bauteil]
  // Daten!C23 → Schätzwert
  // Daten!B24 → Schätzwert [€/ m² Bauteil]
  // Daten!C24 → Schätzwert
  public wdvs = {
    Geruestkosten: {
      SchaetzwertA: 2.81,
      SchaetzwertB: 96.88,
    },
    EnergiebedingteMehrkosten: {
      SchaetzwertA: 2.81,
      SchaetzwertB: 19.77,
    },
    GeltungsbereichVon: 8,
    GeltungsbereichBis: 25,
    GeltungsbereichEinheit: 'cm Dämmstoffstärke',
    Lebensjahre: 30,
  };
  // Daten!B25 → Schätzwert [€/ m² Bauteil]
  // Daten!C25 → Schätzwert
  public aussenwand = {
    SchaetzwertA: 1.65,
    SchaetzwertB: 10.37,
    GeltungsbereichVon: 4,
    GeltungsbereichBis: 10,
    GeltungsbereichEinheit: 'cm Dämmstoffstärke',
    Lebensjahre: 30,
  };
  public keller = {
    'unterseitig ohne Bekleidung': {
      SchaetzwertA: 1.25,
      SchaetzwertB: 30.75,
      GeltungsbereichVon: 5,
      GeltungsbereichBis: 18,
      GeltungsbereichEinheit: 'cm Dämmstoffstärke',
      Lebensjahre: 50,
    },
    'unterseitig mit Bekleidung': {
      SchaetzwertA: 1.55,
      SchaetzwertB: 54.25,
      GeltungsbereichVon: 5,
      GeltungsbereichBis: 18,
      GeltungsbereichEinheit: 'cm Dämmstoffstärke',
      Lebensjahre: 50,
    },
    oberseitig: {
      SchaetzwertA: 1.62,
      SchaetzwertB: 8.96,
      GeltungsbereichVon: 4,
      GeltungsbereichBis: 10,
      GeltungsbereichEinheit: 'cm Dämmstoffstärke',
      Lebensjahre: 50,
    },
  };
  public obersteGeschossdecke = {
    begehbar: {
      SchaetzwertA: 1.78,
      SchaetzwertB: 28.03,
      GeltungsbereichVon: 8,
      GeltungsbereichBis: 30,
      GeltungsbereichEinheit: 'cm Dämmstoffstärke',
      Lebensjahre: 50,
    },
    'nicht begehbar': {
      SchaetzwertA: 1.06,
      SchaetzwertB: 3.72,
      GeltungsbereichVon: 8,
      GeltungsbereichBis: 30,
      GeltungsbereichEinheit: 'cm Dämmstoffstärke',
      Lebensjahre: 50,
    },
  };
  public flachdach = {
    'energiebedingte Mehrkosten': {
      SchaetzwertA: 2.9,
      SchaetzwertB: 21.66,
    },
    'ohne Lichtkuppeln': {
      SchaetzwertA: 4.11,
      SchaetzwertB: 104.14,
      GeltungsbereichVon: 6,
      GeltungsbereichBis: 34,
      GeltungsbereichEinheit: 'cm Dämmstoffstärke',
      Lebensjahre: 30,
    },
    'mit Lichtkuppeln Einfamilienhaus': {
      SchaetzwertA: 4.11,
      SchaetzwertB: 118.16,
      GeltungsbereichVon: 6,
      GeltungsbereichBis: 34,
      GeltungsbereichEinheit: 'cm Dämmstoffstärke',
      Lebensjahre: 30,
    },
    'mit Lichtkuppeln Mehrfamilienhaus': {
      SchaetzwertA: 4.11,
      SchaetzwertB: 113.16,
      GeltungsbereichVon: 6,
      GeltungsbereichBis: 34,
      GeltungsbereichEinheit: 'cm Dämmstoffstärke',
      Lebensjahre: 30,
    },
  };
  public steildach = {
    Steildach: {
      SchaetzwertA: 2.77,
      SchaetzwertB: 151.01,
    },
    'energiebedingte Mehrkosten': {
      SchaetzwertA: 2.37,
      SchaetzwertB: 11.31,
    },
    GeltungsbereichVon: 9,
    GeltungsbereichBis: 29,
    GeltungsbereichEinheit: 'cm Dämmstoffstärke',
    Lebensjahre: 30,
  };
  public steildachgauben = {
    Einfamilienhaus: {
      SchaetzwertB: 473,
      Lebensjahre: 30,
    },
    Mehrfamilienhaus: {
      SchaetzwertB: 350,
      Lebensjahre: 30,
    },
  };
  public vorbaurollladen = {
    'Kunststoff Gurt': {
      SchaetzwertB: 141,
      Lebensjahre: 30,
    },
    'Kunststoff Elektro': {
      SchaetzwertB: 197,
      Lebensjahre: 30,
    },
    'Alu Gurt': {
      SchaetzwertB: 182,
      Lebensjahre: 30,
    },
    'Alu Elektro': {
      SchaetzwertB: 271,
      Lebensjahre: 30,
    },
  };
}
