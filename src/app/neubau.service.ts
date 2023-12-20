import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NeubauProjekt } from './neubauprojekt';
import { neubau } from './constants';

@Injectable({
  providedIn: 'root'
})
export class NeubauService {

  // Declare output object
  output!: NeubauProjekt;
  // Observable
  private outputSource = new BehaviorSubject<NeubauProjekt>(this.output);
  currentOutput$ = this.outputSource.asObservable();

  // Projekt form parameters
  wohnflaeche: number = 5000;
  anzahlWohnungen: number = 50;
  energiestandard: Energiestandard = "EH 40";
  konstruktion: Konstruktion = "Konventionell";
  zertifizierung: Zertifizierung = "Keine Zertifizierung";

  // Observable for wohnflaeche
  private wohnflaecheSource = new BehaviorSubject<number>(this.wohnflaeche);
  currentwohnflaeche$ = this.wohnflaecheSource.asObservable();



  // This method is used inside the form component and is triggered everytime the form changes
  public setWohnflaeche(value: number) {
    // It gets the form value
    this.wohnflaeche = value;
    this.wohnflaecheSource.next(value);
    // And trigger the update() method which cascade triggering all methods
    this.update();
  }

  // I repeated this for all form inputs
  public setAnzahlWohnungen(value: number) {
    this.anzahlWohnungen = value;
    this.update();
  }

  public setEnergiestandard(text: Energiestandard) {
    this.energiestandard = text;
    this.update();
  }

  public setKonstruktion(text: Konstruktion) {
    this.konstruktion = text;
    this.update();
  }

  public setZertifizierung(text: Zertifizierung) {
    this.zertifizierung = text;
    this.update();
  }

  // Neubau form parameters
  kellergeschossIn: Kellergeschoss = 'Vorhanden';
  stellplaetzeIn: Stellplaetze = 'Tiefgarage';
  aufzugsanlageIn: Aufzugsanlage = 'Vorhanden';
  barrierefreiheitIn: BarrierefreiesBauen = 'Barrierereduziert';
  dachbegruenungIn: Dachbegruenung = 'Vorhanden';
  baustellenlogistikIn: AnspruchsvolleBaustellenlogistik = 'Vorhanden';
  aussenanlagenIn: Aussenanlagen = 'Gering';
  grundstuecksbezogeneKosten: number = 0;
  baunebenkostenKeinFin: number = 0;

  public setKellergeschoss(text: Kellergeschoss) {
    this.kellergeschossIn = text;
    this.update();
  }

  public setStellplaetzeIn(text: Stellplaetze) {
    this.stellplaetzeIn = text;
    this.update();
  }

  public setAufzugsanlageIn(text: Aufzugsanlage) {
    this.aufzugsanlageIn = text;
    this.update();
  }

  public setBarrierefreiheitIn(text: BarrierefreiesBauen) {
    this.barrierefreiheitIn = text;
    this.update();
  }

  public setDachbegruenungIn(text: Dachbegruenung) {
    this.dachbegruenungIn = text;
    this.update();
  }

  public setBaustellenlogistikIn(text: AnspruchsvolleBaustellenlogistik) {
    this.baustellenlogistikIn = text;
    this.update();
  }

  public setAussenanlagenIn(text: Aussenanlagen) {
    this.aussenanlagenIn = text;
    this.update();
  }

  public setGrundstuecksbezogeneKosten(value: number) {
    this.grundstuecksbezogeneKosten = value;
    this.update();
  }

  public setBaunebenkostenKeinFin(value: number) {
    this.baunebenkostenKeinFin = value;
    this.update();
  }

  // Darlehen parameters
  kalkRealzins = 4;
  kreditlaufzeit = 20;
  kfWDarlehen: KfWDarlehen = 'Annuitäten';
  bankDarlehen: BankDarlehen = 'Annuitäten';

  public setKalkRealzins(value: number) {
    this.kalkRealzins = value;
    this.update();
  }

  public setKreditlaufzeit(value: number) {
    this.kreditlaufzeit = value;
    this.update();
  }

  public setKfWDarlehen(text: KfWDarlehen) {
    this.kfWDarlehen = text;
    this.update();
  }

  public setBankDarlehen(text: BankDarlehen) {
    this.bankDarlehen = text;
    this.update();
  }

  // Formulas
  // #01
  // Neubau output
  private _kellergeschossOut = 0;
  private updateKellergeschossOut() {
    if (this.kellergeschossIn === 'Vorhanden') {
      this._kellergeschossOut = this.constants.kellerVorhanden;
    }
  }

  private _stellplaetzeOut = 0;
  private updateStellplaetzeOut() {
    if (this.stellplaetzeIn === 'Garage') {
      this._stellplaetzeOut = this.constants.stellplaetzeGarage;
    } else if (this.stellplaetzeIn === 'Parkpalette') {
      this._stellplaetzeOut = this.constants.stellplaetzeParkpalette;
    } else if (this.stellplaetzeIn === 'Tiefgarage') {
      this._stellplaetzeOut = this.constants.stellplaetzeTiefgarage;
    }
  }

  private _redGarageOut = 0;
  private updateRedGarageOut() {
    if (this.kellergeschossIn === 'Vorhanden' && this.stellplaetzeIn === 'Tiefgarage') {
      this._redGarageOut = this.constants.redGarageTrue;
    }
  }

  private _aufzugsanlageOut = 0;
  private updateAufzugsanlageOut() {
    if (this.aufzugsanlageIn === 'Vorhanden') {
      this._aufzugsanlageOut = this.constants.aufzugsanlageVorhanden;
    }
  }

  private _barrierefreiheitOut = 0;
  private updateBarrierefreiheitOut() {
    if (this.barrierefreiheitIn === 'Barrierereduziert') {
      this._barrierefreiheitOut = this.constants.barrierereduziert;
    } else if (this.barrierefreiheitIn === 'Barrierefrei') {
      this._barrierefreiheitOut = this.constants.barrierefrei;
    } else if (this.barrierefreiheitIn === 'Barrierefrei (R)') {
      this._barrierefreiheitOut = this.constants.barrierereduziertR;
    }
  }

  private _dachbegruenungOut = 0;
  private updateDachbegruenungOut() {
    if (this.dachbegruenungIn === 'Vorhanden') {
      this._dachbegruenungOut = this.constants.dachbegruenungVorhanden;
    }
  }

  private _baustellenlogistikOut = 0;
  private updateBaustellenlogistikOut() {
    if (this.baustellenlogistikIn === 'Vorhanden') {
      this._baustellenlogistikOut = this.constants.baustellenlogistikVorhanden;
    }
  }

  private _aussenanlagenOut = 0;
  private updateAussenanlagenOut() {
    if (this.aussenanlagenIn === 'Gering') {
      this._aussenanlagenOut = this.constants.aussenanlagenGering;
    } else if (this.aussenanlagenIn === 'Mittel') {
      this._aussenanlagenOut = this.constants.aussenanlagenMittel;
    } else if (this.aussenanlagenIn === 'Hoch') {
      this._aussenanlagenOut = this.constants.aussenanlagenHoch;
    }
  }

  private _energetischerStandardOut = 0;
  private updateEnergetischerStandard() {
    if (this.energiestandard === 'EH 40') {
      this._energetischerStandardOut = this.constants.energiestandardEH40;
    }
  }

  // #02
  // Gestehungskosten [€/m²]
  private _gestehungskosten = 0;
  private updateGestehungskosten() {
    this._gestehungskosten = 2436 + this._kellergeschossOut + this._stellplaetzeOut + this._redGarageOut + this._aufzugsanlageOut + this._barrierefreiheitOut + this._dachbegruenungOut + this._baustellenlogistikOut + this._energetischerStandardOut + this._aussenanlagenOut + this.grundstuecksbezogeneKosten + this.baunebenkostenKeinFin;
  }

  // NR-Kredit [%]
  private _nrKredit = this.constants.nrLessThan10;
  private updateNrKredit() {
    if (this.kreditlaufzeit < 10) {
      this._nrKredit = this.constants.nrLessThan10;
    } else if (this.kreditlaufzeit >= 10 && this.kreditlaufzeit <= 25) {
      this._nrKredit = this.constants.nr10To25
    } else {
      this._nrKredit = this.constants.nrMoreThan25
    }
  }

  // Sollzins KFW [%]
  private _sollzinsKfw = 0;
  private updateSollzinsKfw() {
    if (this.kfWDarlehen === "Endfälliges") {
      this._sollzinsKfw = this.constants.sollzinsKfw_Endfälliges;
    } else if (this.kfWDarlehen === "Annuitäten") {
      this._sollzinsKfw = this._nrKredit;
    }
  }

  // Gesamtgestehungskosten [€]
  private _gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  private updateGesamtgestehungskosten() {
    this._gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  }



  // KfW-Kredit [€]
  private _kfwKredit = 0;
  private updateKfwKredit() {
    if (this.zertifizierung === 'Keine Zertifizierung' && this.energiestandard === 'EH 40') {
      this._kfwKredit = this.constants.kfwKredit_Lower * this.anzahlWohnungen;
    } else if (this.zertifizierung === 'QNG' && this.energiestandard === 'EH 40') {
      this._kfwKredit = this.constants.kfwKredit_Higher * this.anzahlWohnungen;
    }
  }

  // Restsumme [€]
  private _restsumme = 0;
  private updateRestsumme() {
    if (this.konstruktion === 'Konventionell') {
      this._restsumme = (this.wohnflaeche * this._gestehungskosten) - this._kfwKredit;
    } else {
      this._restsumme = (this.wohnflaeche * this._gestehungskosten * this.constants.restsummeHolzbau) - this._kfwKredit;
    }
  }

  // #03
  // AF KFW [€]
  private _afKfw = 0;
  private updateAfKfW() {
    this._afKfw = this._sollzinsKfw / 100 * Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) / (Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) - 1);
  }

  // AF Bank [€]
  private _afBank = 0;
  private updateAfBank() {
    this._afBank = (this.kalkRealzins / 100) * Math.pow((1 + this.kalkRealzins / 100), this.kreditlaufzeit) / (Math.pow(1 + this.kalkRealzins / 100, this.kreditlaufzeit) - 1);
  }

  // Annuität KfW [€]
  private _annuitaetKfW = 0;
  private updateAnnuitaetKfw() {
    this._annuitaetKfW = this._afKfw * this._kfwKredit;
  }

  // Annuität Bank [€]
  private _annuitaetBank = 0;
  private updateAnnuitaetB() {
    this._annuitaetBank = this._restsumme * this._afBank;
  }

  // EF KFW [€]
  private _efKfW = 0;
  private updateEfKfw() {
    this._efKfW = this._kfwKredit * this._sollzinsKfw / 100 * this.kreditlaufzeit;
  }

  // EF Bank [€]
  private _efBank = 0;
  private updateEfB() {
    this._efBank = this.kalkRealzins * this._restsumme / 100 * this.kreditlaufzeit;
  }

  // Bank-Kredit [€]
  private _bankKredit = 0;
  private updateBankKredit() {
    this._bankKredit = this._restsumme;
  }

  // Finanzierungskosten (KfW) [€]
  private _finanzierungskostenKfw = 0;
  private updateFinanzierungskostenKfw() {
    if (this.kfWDarlehen === "Annuitäten") {
      this._finanzierungskostenKfw = this._annuitaetKfW * this.kreditlaufzeit - this._kfwKredit;
    } else if (this.kfWDarlehen === "Endfälliges") {
      this._finanzierungskostenKfw = this._efKfW;
    }
  }

  // Finazierungskosten (Finanzmarkt) [€]
  private _finanzierungskostenFinanzmarkt = 0;
  private updateFinanzierungskostenFinanzmarkt() {
    if (this.bankDarlehen === "Annuitäten") {
      this._finanzierungskostenFinanzmarkt = this._annuitaetBank * this.kreditlaufzeit - this._bankKredit;
    } else if (this.bankDarlehen === "Endfälliges") {
      this._finanzierungskostenFinanzmarkt = this._efBank;
    }
  }

  // Investitionskosten [€]
  private _investitionskosten = 0;
  private updateInvestitionkosten() {
    this._investitionskosten = this.wohnflaeche * this._gestehungskosten;
  }

  // #04
  // GB: Annuität [€]
  private _gbAnnuitaet = 0;
  private updateGbAnnuitaet() {
    this._gbAnnuitaet = (this._kfwKredit + this._restsumme) * this._afBank * this.kreditlaufzeit - (this._kfwKredit + this._restsumme);
  }

  // GB: EFD [€]
  private _gbEfd = 0;
  private updateGbEfd() {
    this._gbEfd = this.kalkRealzins * (this._kfwKredit + this._restsumme) / 100 * this.kreditlaufzeit;
  }

  // Option 1: ohne KfW [€]
  private _ohneKfw = 0;
  private updateOhneKfw() {
    if (this.bankDarlehen === "Endfälliges") {
      this._ohneKfw = this._gbEfd;
    } else {
      this._ohneKfw = this._gbAnnuitaet;
    }
  }

  // Option 2: mit KfW [€]
  private _mitKfw = 0;
  private updateMitKfw() {
    this._mitKfw = this._finanzierungskostenKfw + this._finanzierungskostenFinanzmarkt;
  }

  // Gesamtkosten
  private _gInvestition = 0;
  private updateGInvestition() {
    this._gInvestition = this._investitionskosten;
  }

  private _gFinanzierung = 0;
  private updateGFinanzierung() {
    this._gFinanzierung = this._kfwKredit + this._bankKredit + this._finanzierungskostenKfw + this._finanzierungskostenFinanzmarkt;
  }


  update() {
    this.updateKellergeschossOut();
    this.updateStellplaetzeOut();
    this.updateRedGarageOut();
    this.updateAufzugsanlageOut();
    this.updateBarrierefreiheitOut();
    this.updateDachbegruenungOut();
    this.updateBaustellenlogistikOut();
    this.updateAussenanlagenOut();
    this.updateEnergetischerStandard();
    this.updateGestehungskosten();
    this.updateNrKredit();
    this.updateSollzinsKfw();
    this.updateGesamtgestehungskosten();
    this.updateKfwKredit();
    this.updateRestsumme();
    this.updateAfKfW();
    this.updateAfBank();
    this.updateAnnuitaetKfw();
    this.updateAnnuitaetB();
    this.updateEfKfw();
    this.updateEfB();
    this.updateBankKredit();
    this.updateFinanzierungskostenKfw();
    this.updateFinanzierungskostenFinanzmarkt();
    this.updateInvestitionkosten();
    this.updateGbEfd();
    this.updateOhneKfw();
    this.updateMitKfw();
    this.updateGInvestition();
    this.updateGFinanzierung();

    this.outputSource.next(
      this.output = {
        // Projekt
        wohnflaeche: this.wohnflaeche,
        anzahlWohnungen: this.anzahlWohnungen,
        energiestandard: this.energiestandard,
        konstruktion: this.konstruktion,
        zertifizierung: this.zertifizierung,
        // Neubau input
        kellergeschossIn: this.kellergeschossIn,
        stellplaetzeIn: this.stellplaetzeIn,
        aufzugsanlageIn: this.aufzugsanlageIn,
        barrierefreiheitIn: this.barrierefreiheitIn,
        dachbegruenungIn: this.dachbegruenungIn,
        baustellenlogistikIn: this.baustellenlogistikIn,
        aussenanlagenIn: this.aussenanlagenIn,
        grundstuecksbezogeneKosten: this.grundstuecksbezogeneKosten,
        baunebenkostenKeinFin: this.baunebenkostenKeinFin,
        // Neubau output
        kellergeschossOut: this._kellergeschossOut,
        stellplaetzeOut: this._stellplaetzeOut,
        redGarageOut: this._redGarageOut,
        aufzugsanlageOut: this._aufzugsanlageOut,
        barrierefreiheitOut: this._barrierefreiheitOut,
        dachbegruenungOut: this._dachbegruenungOut,
        baustellenlogistikOut: this._baustellenlogistikOut,
        aussenanlagenOut: this._aussenanlagenOut,
        energetischerStandard: this._energetischerStandardOut,
        // Dalehen
        kalkRealzins: this.kalkRealzins,
        kreditlaufzeit: this.kreditlaufzeit,
        kfWDarlehen: this.kfWDarlehen,
        bankDarlehen: this.bankDarlehen,
        // Output
        gestehungskosten: this._gestehungskosten,
        nrKredit: this._nrKredit,
        sollzinsKfw: this._sollzinsKfw,
        gesamtgestehungskosten: this._gesamtgestehungskosten,
        restsumme: this._restsumme,
        afKfw: this._afKfw,
        afBank: this._afBank,
        annuitaetKfW: this._annuitaetKfW,
        annuitaetBank: this._annuitaetBank,
        efKfW: this._efKfW,
        efBank: this._efBank,
        gbAnnuitaet: this._gbAnnuitaet,
        gbEfd: this._gbEfd,
        // Zusammenfassung Ergebnisse
        kfwKredit: this._kfwKredit,
        kfwKreditM2: this._kfwKredit / this.wohnflaeche,
        bankKredit: this._bankKredit,
        bankKreditM2: this._bankKredit / this.wohnflaeche,
        finanzierungskostenKfw: this._finanzierungskostenKfw,
        finanzierungskostenKfwM2: this._finanzierungskostenKfw / this.wohnflaeche,
        finanzierungskostenFinanzmarkt: this._finanzierungskostenFinanzmarkt,
        finanzierungskostenFinanzmarktM2: this._finanzierungskostenFinanzmarkt / this.wohnflaeche,
        investitionskosten: this._investitionskosten,
        investitionskostenM2: this._investitionskosten / this.wohnflaeche,
        gInvestition: this._gInvestition,
        gInvestitionM2: this._gInvestition / this.wohnflaeche,
        gFinanzierung: this._gFinanzierung,
        gFinanzierungM2: this._gFinanzierung / this.wohnflaeche,
        // Vergleichsrechnung
        ohneKfw: this._ohneKfw,
        ohneKfwM2: this._ohneKfw / this.wohnflaeche,
        mitKfw: this._mitKfw,
        mitKfwM2: this._mitKfw / this.wohnflaeche,
        differenzOhneMitKfw: this._ohneKfw - this._mitKfw,
        differenzOhneMitKfwM2: (this._ohneKfw - this._mitKfw) / this.wohnflaeche
      });
  }

  constructor(private constants: neubau) {
    this.update();
  }
}
