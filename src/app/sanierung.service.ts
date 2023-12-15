import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanierungService {

  // Project parameters
  wohnflaeche = 5000;
  anzahlWohnungen = 50;
  energiestandard = "EH 40";
  konstruktion = "Konventionell";
  zertifizierung = "Keine Zertifizierung";

  // This method is used inside the form component and is triggered everytime the form changes
  public setWohnflaeche(value: number) {
    // It gets the form value
    this.wohnflaeche = value;
    // And trigger the update() method which cascade triggering all methods
    this.update();
  }

  // It does the same for all form inputs
  public setAnzahlWohnungen(value: number) {
    this.anzahlWohnungen = value;
    this.update();
  }

  public setEnergiestandard(text: string) {
    this.energiestandard = text;
    this.update();
  }

  public setKonstruktion(text: string) {
    this.konstruktion = text;
    this.update();
  }
  
  public setZertifizierung(text: string) {
    this.zertifizierung = text;
    this.update();
  }

  // Sanierung parameters
  worstPerformingBuilding = true;
  serielleSanierung = true;
  zustandBestand = "Unsaniert";
  eeKlasse = true;

  public setWpc(value: boolean) {
    this.worstPerformingBuilding = value;
    this.update();
  }

  public setSerielleSanierung(value: boolean) {
    this.serielleSanierung = value;
    this.update();
  }
  public setZustandBestand(text: string) {
    this.zustandBestand = text;
    this.update();
  }
  public setEeKlasse(value: boolean) {
    this.eeKlasse = value;
    this.update();
  }

  // Darlehen parameters
  kalkRealzins = 4;
  kreditlaufzeit = 20;
  kfWDarlehen = 'Annuitäten';
  bankDarlehen = 'Annuitäten';

  public setKalkRealzins(value: number) {
    this.kalkRealzins = value;
    this.update();
  }

  public setKreditlaufzeit(value: number) {
    this.kreditlaufzeit = value;
    this.update();
  }

  public setKfWDarlehen(text: string) {
    this.kfWDarlehen = text;
    this.update();
  }
  public setBankDarkehen(text: string) {
    this.bankDarlehen = text;
    this.update();
  }

  // 
  tableSanierun = [
    {
      "Energiestandard": "EH 115",
      "ZustandBestand": "Unsaniert",
      "Min": 350,
      "Max": 630
    },
    {
      "Energiestandard": "EH 115",
      "ZustandBestand": "Teilsaniert",
      "Min": 300,
      "Max": 480
    },
    {
      "Energiestandard": "EH 115",
      "ZustandBestand": "Umfassend saniert",
      "Min": null,
      "Max": null
    },
    {
      "Energiestandard": "EH 100",
      "ZustandBestand": "Unsaniert",
      "Min": 430,
      "Max": 700
    },
    {
      "Energiestandard": "EH 100",
      "ZustandBestand": "Teilsaniert",
      "Min": 410,
      "Max": 620
    },
    {
      "Energiestandard": "EH 100",
      "ZustandBestand": "Umfassend saniert",
      "Min": 190,
      "Max": 310
    },
    {
      "Energiestandard": "EH 70",
      "ZustandBestand": "Unsaniert",
      "Min": 520,
      "Max": 730
    },
    {
      "Energiestandard": "EH 70",
      "ZustandBestand": "Teilsaniert",
      "Min": 530,
      "Max": 730
    },
    {
      "Energiestandard": "EH 70",
      "ZustandBestand": "Umfassend saniert",
      "Min": 300,
      "Max": 430
    },
    {
      "Energiestandard": "EH 55",
      "ZustandBestand": "Unsaniert",
      "Min": 650,
      "Max": 850
    },
    {
      "Energiestandard": "EH 55",
      "ZustandBestand": "Teilsaniert",
      "Min": 660,
      "Max": 870
    },
    {
      "Energiestandard": "EH 55",
      "ZustandBestand": "Umfassend saniert",
      "Min": 490,
      "Max": 690
    },
    {
      "Energiestandard": "EH 40",
      "ZustandBestand": "Unsaniert",
      "Min": 760,
      "Max": 970
    },
    {
      "Energiestandard": "EH 40",
      "ZustandBestand": "Teilsaniert",
      "Min": 770,
      "Max": 990
    },
    {
      "Energiestandard": "EH 40",
      "ZustandBestand": "Umfassend saniert",
      "Min": 680,
      "Max": 910
    }
  ]

  // Formulas
  // #01
  // Tilgungszuschuss [%]
  _tilgungszuschuss = 0;
  private updateTilgungszuschuss() {
    if (this.energiestandard === "EH 85") {
      this._tilgungszuschuss = 5;
    } else if (this.energiestandard === "EH 70") {
      this._tilgungszuschuss = 10;
    } else if (this.energiestandard === "EH 55") {
      this._tilgungszuschuss = 15;
    } else if (this.energiestandard === "EH 40") {
      this._tilgungszuschuss = 20;
    } else {
      this._tilgungszuschuss = 0;
    }
  }

  // EE-Bonus [%]
  _eeBonus = 0;
  _eeBonusPossible = 5;
  private updateEeBonus() {
    if (this.eeKlasse === true) {
      this._eeBonus = this._eeBonusPossible;
    } else {
      this._eeBonus = 0;
    }
  }

  // NH-Bonus [%]
  _nhBonus = 0;
  _nhBonusPossible = 5;
  private updateNhBonus() {
    if (this.zertifizierung !== "Keine Zertifizierung") {
      this._nhBonus = this._nhBonusPossible;
    } else {
      this._nhBonus = 0;
    }
  }

  // WPB-Bonus [%]
  _wpbBonus = 0;
  _wpbBonusPossible = 10;
  private updateWpbBonus() {
    if (this.worstPerformingBuilding === true && (this.energiestandard === "EH 70" || this.energiestandard === "EH 55" || this.energiestandard === "EH 40")) {
      this._wpbBonus = this._wpbBonusPossible;
    } else {
      this._wpbBonus = 0;
    }
  }

  // SerSan-Bonus [%]
  _serSanBonus = 0;
  _serSanBonusPossible = 15;
  private updateSerSanBonus() {
    if (this.serielleSanierung === true && (this.energiestandard === "EH 55" || this.energiestandard === "EH 40"))
      this._serSanBonus = this._serSanBonusPossible;
    else
      this._serSanBonus = 0
  }

  // #02
  // Gestehungskosten [€/m²]
  _gestehungskosten = 0;
  updateGestehungskosten() {
    const desiredProperties = {
      "Energiestandard": this.energiestandard,
      "ZustandBestand": this.zustandBestand
    }
    // Callback function
    function filterByProperties(item: any, desiredProperties: any) {
      for (const prop in desiredProperties) {
        if (item[prop] !== desiredProperties[prop]) {
          return false;
        }
      }
      return true;
    }
    // Filter
    const filteredData = this.tableSanierun.filter(item => filterByProperties(item, desiredProperties));
    var tableResult = filteredData[0]["Min"] // Considering only unique results from the filter
    tableResult = (tableResult === null) ? 0 : tableResult;
    this._gestehungskosten = tableResult;
  }

  // NR-Kredit [%]
  _nrLessThan10 = 0.31;
  _nr10To20 = 1.38;
  _nrMoreThan20 = 1.63;
  _nrKredit = this._nrLessThan10;
  updateNrKredit() {
    if (this.kreditlaufzeit < 10) {
      this._nrKredit = this._nrLessThan10;
    } else if (this.kreditlaufzeit >= 10 && this.kreditlaufzeit <= 20) {
      this._nrKredit = this._nr10To20
    } else {
      this._nrKredit = this._nrMoreThan20
    }
  }

  // Sollzins KFW [%]
  _sollzinsKfwEndfälliges = 1.75;
  _sollzinsKfw = 0;
  private updateSollzinsKfw() {
    if (this.kfWDarlehen === "Endfälliges Darlehen") {
      this._sollzinsKfw = this._sollzinsKfwEndfälliges;
    } else if (this.kfWDarlehen === "Annuitäten") {
      this._sollzinsKfw = this._nrKredit;
    } else {
      this._sollzinsKfw = 0
    }
  }

  // Max. KFW-Kredit [€]
  _maxKfwKredit_Higher = 150_000;
  _maxKfwKredit_Lower = 120_000;
  _maxKfwKredit = this.anzahlWohnungen * this._maxKfwKredit_Lower;
  private updateMaxKfwKredit() {
    if (this.eeKlasse === true || this.zertifizierung !== "Keine Zertifizierung") {
      this._maxKfwKredit = this.anzahlWohnungen * this._maxKfwKredit_Higher
    } else {
      this._maxKfwKredit = this.anzahlWohnungen * this._maxKfwKredit_Lower
    }
  }

  // Gesamtgestehungskosten [€]
  _gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  private updateGesamtgestehungskosten() {
    this._gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  }

  // Fördersumme [€]
  _foerdersumme = this._maxKfwKredit;
  private updateFoerdersumme() {
    this._foerdersumme = Math.min(this._maxKfwKredit, this._gesamtgestehungskosten);
  }

  // Restsumme [€]
  _restsumme = 0;
  private updateRestsumme() {
    this._restsumme = Math.max(this._gesamtgestehungskosten - this._maxKfwKredit, 0);
  }

  // #03
  // AF KFW [€]
  _afKfw = 0;
  private updateAfKfW() {
    if (this._sollzinsKfw === 0 || this.kreditlaufzeit === 0) {
      this._afKfw = 0;
    } else {
      this._afKfw = this._sollzinsKfw / 100 * Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) / (Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) - 1);
    }
  }

  // AF B [€]
  _afB = 0;
  private updateAfB() {
    this._afB = (this.kalkRealzins / 100) * Math.pow((1 + this.kalkRealzins / 100), this.kreditlaufzeit) / (Math.pow(1 + this.kalkRealzins / 100, this.kreditlaufzeit) - 1);
  }
  
  // Zuschuss (KfW) [€]
  _zuschuss = 0;
  // Using RxJS to send data to the grphs and cards
  // First creating a behaviorsubject
  private zuschussSource = new BehaviorSubject<number>(0);
  // Then assigning an observable
  currentZuschuss$ = this.zuschussSource.asObservable();
  private updateZuschuss() {
    this._zuschuss = Math.min((this._tilgungszuschuss + this._eeBonus + this._nhBonus + this._wpbBonus + this._serSanBonus) / 100 * this._foerdersumme, (0.4 * this._foerdersumme));
    // Changing the observable here
    this.zuschussSource.next(this._zuschuss);
  }

  // KfW-Kredit [€]
  _kfwKredit = 0;
  // Using RxJS to send data to the grphs and cards
  // First creating a behaviorsubject
  private kfwKreditSource = new BehaviorSubject<number>(0);
  // Then assigning an observable
  currentKfwKredit$ = this.kfwKreditSource.asObservable();
  private updateKfwKredit() {
    this._kfwKredit = this._foerdersumme - this._zuschuss;
    // Changing the observable here
    this.kfwKreditSource.next(this._kfwKredit);
  }
  
  // Bank-Kredit [€]
  _bankKredit = 0;
  // Using RxJS to send data to the grphs and cards
  // First creating a behaviorsubject
  private bankKreditSource = new BehaviorSubject<number>(0);
  // Then assigning an observable
  currentBankKredit$ = this.bankKreditSource.asObservable();
  private updateBankKredit() {
    this._bankKredit = this._restsumme;
    // Changing the observable here
    this.bankKreditSource.next(this._bankKredit);
  }

  // Annuität KfW [€]
  _annuitaetKfW = 0;
  private updateAnnuitaetKfw() {
    this._annuitaetKfW = this._afKfw * this._kfwKredit;
  }

  // Annuität B [€]
  _annuitaetB = 0;
  private updateAnnuitaetB() {
    this._annuitaetB = this._bankKredit * this._afB;
  }

  // EF KFW [€]
  _efKfW = 0;
  private updateEfKfw() {
    this._efKfW = this._kfwKredit * this._sollzinsKfw / 100 * this.kreditlaufzeit;
  }

  // EF B [€]
  _efB = 0;
  private updateEfB() {
    this._efB = this.kalkRealzins * this._restsumme / 100 * this.kreditlaufzeit;
  }

  // Finanzierungskosten (KfW) [€]
  _finanzierungskostenKfw = 0;
  // Using RxJS to send data to the grphs and cards
  // First creating a behaviorsubject
  private finanzierungskostenKfwSource = new BehaviorSubject<number>(0);
  // Then assigning an observable
  currentFinanzierungskostenKfw$ = this.finanzierungskostenKfwSource.asObservable();
  private updateFinanzierungskostenKfw() {
    if (this.kfWDarlehen === "Annuitäten") {
      this._finanzierungskostenKfw = this._annuitaetKfW * this.kreditlaufzeit - this._kfwKredit;
    } else if (this.kfWDarlehen === "Endfälliges Darlehen") {
      this._finanzierungskostenKfw = this._efKfW;
    } else {
      this._finanzierungskostenKfw = 0;
    }
    // Changing the observable here:
    this.finanzierungskostenKfwSource.next(this._finanzierungskostenKfw);
  }

  // Finazierungskosten (Finanzmarkt) [€]
  _finanzierungskostenMarkt = 0;
  // Using RxJS to send data to the graphs and cards
  // First creating a behaviorsubject
  private finanzierungskostenMarktSource = new BehaviorSubject<number>(0);
  // Then assigning an observable
  currentFinanzierungskostenMarkt$ = this.finanzierungskostenMarktSource.asObservable();
  private updateFinanzierungskostenMarkt() {
    if (this.bankDarlehen === "Annuitäten") {
      this._finanzierungskostenMarkt = this._annuitaetB * this.kreditlaufzeit - this._bankKredit;
    } else if (this.bankDarlehen === "Endfälliges Darlehen") {
      this._finanzierungskostenMarkt = this._efB;
    } else {
      this._finanzierungskostenMarkt = 0;
    }
    // Changing the observable here:
    this.finanzierungskostenMarktSource.next(this._finanzierungskostenMarkt);
  }

  // Investitionskosten [€]
  _investitionkosten = 0;
  private investitionskostenSource = new BehaviorSubject<number>(0);
  currentInvestitionskosten$ = this.investitionskostenSource.asObservable();
  private updateInvestitionkosten() {
    this._investitionkosten = this.wohnflaeche * this._gestehungskosten;
    this.investitionskostenSource.next(this._investitionkosten);
  }

  // #04
  // GB: Annuität [€]
  _gbAnnuitaet = 0;
  private updateGbAnnuitaet() {
    this._gbAnnuitaet = (this._foerdersumme + this._restsumme) * this._afB * this.kreditlaufzeit - (this._foerdersumme + this._restsumme);
  }

  // GB: EFD [€]
  _gbEfd = 0;
  private updateGbEfd() {
    this._gbEfd = this.kalkRealzins * (this._foerdersumme + this._restsumme) / 100 * this.kreditlaufzeit;
  }

  // Option 1: ohne KfW [€]
  _ohneKfw = 0;
  private updateOhneKfw() {
    if (this.bankDarlehen === "Endfälliges Darlehen") {
      this._ohneKfw = this._gbEfd;
    } else {
      this._ohneKfw = this._gbAnnuitaet;
    }
  }

  // Option 2: mit KfW [€]
  _mitKfw = 0;
  private updateMitKfw() {
    this._mitKfw = this._finanzierungskostenKfw + this._finanzierungskostenMarkt;
  }

  // Gesamtkosten
  _gInvestition = 0;
  private updateGInvestition() {
    this._gInvestition = this._investitionkosten - this._zuschuss;
  }

  _gFinanzierung = 0;
  private updateGFinanzierung() {
    this._gFinanzierung = this._kfwKredit + this._bankKredit + this._finanzierungskostenKfw + this._finanzierungskostenMarkt;
  }

  update() {
    this.updateTilgungszuschuss();
    this.updateEeBonus();
    this.updateNhBonus();
    this.updateWpbBonus();
    this.updateSerSanBonus();
    this.updateGestehungskosten();
    this.updateNrKredit();
    this.updateSollzinsKfw();
    this.updateMaxKfwKredit();
    this.updateGesamtgestehungskosten();
    this.updateFoerdersumme();
    this.updateRestsumme();
    this.updateAfKfW();
    this.updateAfB();
    this.updateZuschuss();
    this.updateKfwKredit();
    this.updateBankKredit();
    this.updateAnnuitaetKfw();
    this.updateAnnuitaetB();
    this.updateEfKfw();
    this.updateEfB();
    this.updateFinanzierungskostenKfw();
    this.updateFinanzierungskostenMarkt();
    this.updateInvestitionkosten();
    this.updateGbAnnuitaet();
    this.updateGbEfd();
    this.updateOhneKfw();
    this.updateMitKfw();
    this.updateGInvestition();
    this.updateGFinanzierung();
  }



  constructor() {
    this.update();
  }

}
