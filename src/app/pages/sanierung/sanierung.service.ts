import { Injectable } from '@angular/core';
import { BehaviorSubject, skipWhile } from 'rxjs';
import { SanierungProjekt } from './sanierungprojekt';
import { sanierung } from '../../constants';
import tableSanierung from './tableSanierung.json';
import { FormProjektService } from '../../form-projekt/form-projekt.service';
import { FormDarlehenService } from '../../form-darlehen/form-darlehen.service';
import { FormSanierungService } from '../../form-sanierung/form-sanierung.service';

@Injectable({
  providedIn: 'root',
})
export class SanierungService {
  // Project parameters
  wohnflaeche = this.formProjektService.wohnflaeche.init;
  anzahlWohnungen = this.formProjektService.anzahlWohnungen.init;
  energiestandard: Energiestandard =
    this.formProjektService.energiestandardOptions[0].value;
  konstruktion: Konstruktion =
    this.formProjektService.konstruktionOptions[0].value;
  zertifizierung: Zertifizierung =
    this.formProjektService.zertifizierungOptions[0].value;

  // Sanierung parameters
  worstPerformingBuilding = this.formSanierungService.worstPerformingBuilding;
  serielleSanierung = this.formSanierungService.serielleSanierung;
  zustandBestand: ZustandBestand =
    this.formSanierungService.zustandBestandOptions[0].value;
  eeKlasse = this.formSanierungService.eeKlasse;

  // Darlehen parameters
  kalkRealzins = this.formDarlehenService.kalkRealzins.init;
  kreditlaufzeit: number = this.formDarlehenService.kreditlaufzeit.init;
  kfWDarlehen: KfWDarlehen =
    this.formDarlehenService.kfWDarlehenOptions[0].value;
  bankDarlehen: BankDarlehen =
    this.formDarlehenService.bankDarlehenOptions[0].value;

  constructor(
    private constants: sanierung,
    private formProjektService: FormProjektService,
    private formSanierungService: FormSanierungService,
    private formDarlehenService: FormDarlehenService
  ) {
    // Subscribe to all Projekt Form parameters and update after every change
    this.formProjektService.currentWohnflaeche$
      .pipe(skipWhile((value) => value === this.wohnflaeche))
      .subscribe((value) => {
        this.wohnflaeche = value;
        this.update();
        console.log('Updated');
      });

    this.formProjektService.currentAnzahlWohnungen$
      .pipe(skipWhile((value) => value === this.anzahlWohnungen))
      .subscribe((value) => {
        this.anzahlWohnungen = value;
        this.update();
      });

    this.formProjektService.currentEnergiestandard$
      .pipe(skipWhile((value) => value === this.energiestandard))
      .subscribe((value) => {
        this.energiestandard = value;
        this.update();
      });

    this.formProjektService.currentKonstruktion$
      .pipe(skipWhile((value) => value === this.konstruktion))
      .subscribe((value) => {
        this.konstruktion = value;
        this.update();
      });

    this.formProjektService.currentZertifizierung$
      .pipe(skipWhile((value) => value === this.zertifizierung))
      .subscribe((value) => {
        this.zertifizierung = value;
        this.update();
      });

    // Subscribe to all Sanierung Form parameters and update after every change
    this.formSanierungService.currentWpc$
      .pipe(skipWhile((value) => value === this.worstPerformingBuilding))
      .subscribe((value) => {
        this.worstPerformingBuilding = value;
        this.update();
      });

    this.formSanierungService.currentSerielleSanierung$
      .pipe(skipWhile((value) => value === this.serielleSanierung))
      .subscribe((value) => {
        this.serielleSanierung = value;
        this.update();
      });

    this.formSanierungService.currentZustandBestand$
      .pipe(skipWhile((value) => value === this.zustandBestand))
      .subscribe((value) => {
        this.zustandBestand = value;
        this.update();
      });

    this.formSanierungService.currentEeKlasse$
      .pipe(skipWhile((value) => value === this.eeKlasse))
      .subscribe((value) => {
        this.eeKlasse = value;
        this.update();
      });

    // Subscribe to all Darlehen Form parameters and update after every change
    this.formDarlehenService.currentKalkRealzins$
      .pipe(skipWhile((value) => value === this.kalkRealzins))
      .subscribe((value) => {
        this.kalkRealzins = value;
        this.update();
      });

    this.formDarlehenService.currentKreditlaufzeit$
      .pipe(skipWhile((value) => value === this.kreditlaufzeit))
      .subscribe((value) => {
        this.kreditlaufzeit = value;
        this.update();
      });

    this.formDarlehenService.currentKfWDarlehen$
      .pipe(skipWhile((value) => value === this.kfWDarlehen))
      .subscribe((value) => {
        this.kfWDarlehen = value;
        this.update();
      });

    this.formDarlehenService.currentBankDarlehen$
      .pipe(skipWhile((value) => value === this.bankDarlehen))
      .subscribe((value) => {
        this.bankDarlehen = value;
        this.update();
      });

    this.update();
  }

  // Formulas
  // #01
  // Tilgungszuschuss [%]
  private _tilgungszuschuss = 0;
  private updateTilgungszuschuss() {
    if (this.energiestandard === 'EH 85') {
      this._tilgungszuschuss = this.constants.tilgungszuschussEH85;
    } else if (this.energiestandard === 'EH 70') {
      this._tilgungszuschuss = this.constants.tilgungszuschussEH70;
    } else if (this.energiestandard === 'EH 55') {
      this._tilgungszuschuss = this.constants.tilgungszuschussEH55;
    } else if (this.energiestandard === 'EH 40') {
      this._tilgungszuschuss = this.constants.tilgungszuschussEH40;
    } else {
      this._tilgungszuschuss = 0;
    }
  }

  // EE-Bonus [%]
  private _eeBonus = 0;
  private updateEeBonus() {
    if (this.eeKlasse === true) {
      this._eeBonus = this.constants.eeBonusPossible;
    } else {
      this._eeBonus = 0;
    }
  }

  // NH-Bonus [%]
  private _nhBonus = 0;
  private updateNhBonus() {
    if (this.zertifizierung !== 'Keine Zertifizierung') {
      this._nhBonus = this.constants.nhBonusPossible;
    } else {
      this._nhBonus = 0;
    }
  }

  // WPB-Bonus [%]
  private _wpbBonus = 0;
  private updateWpbBonus() {
    if (
      this.worstPerformingBuilding === true &&
      (this.energiestandard === 'EH 70' ||
        this.energiestandard === 'EH 55' ||
        this.energiestandard === 'EH 40')
    ) {
      this._wpbBonus = this.constants.wpbBonusPossible;
    } else {
      this._wpbBonus = 0;
    }
  }

  // SerSan-Bonus [%]
  private _serSanBonus = 0;
  private updateSerSanBonus() {
    if (
      this.serielleSanierung === true &&
      (this.energiestandard === 'EH 55' || this.energiestandard === 'EH 40')
    )
      this._serSanBonus = this.constants.serSanBonusPossible;
    else this._serSanBonus = 0;
  }

  // #02
  // Gestehungskosten [€/m²]
  private _gestehungskosten = 0;
  updateGestehungskosten() {
    const initialProperties = {
      Energiestandard: this.formProjektService.energiestandardOptions[0].value,
      ZustandBestand: this.formSanierungService.zustandBestandOptions[0].value,
    };
    const desiredProperties = {
      Energiestandard: this.energiestandard,
      ZustandBestand: this.zustandBestand,
    };
    // Callback function
    function filterByProperties(item: any, desiredProperties: any) {
      for (const prop in desiredProperties) {
        if (item[prop] !== desiredProperties[prop]) {
          return false;
        }
      }
      return true;
    }
    try {
      // Filter
      const filteredData = tableSanierung.filter((item) =>
        filterByProperties(item, desiredProperties)
      );
      var tableResult = filteredData[0].Min; // Considering only unique results from the filter
      this._gestehungskosten = tableResult;
    } catch (error) {
      // Filter
      const filteredData = tableSanierung.filter((item) =>
        filterByProperties(item, initialProperties)
      );
      var tableResult = filteredData[0].Min; // Considering only unique results from the filter
      this._gestehungskosten = tableResult;
    }
  }

  // NR-Kredit [%]
  private _nrKredit = this.constants.nrLessThan10;
  updateNrKredit() {
    if (this.kreditlaufzeit < 10) {
      this._nrKredit = this.constants.nrLessThan10;
    } else if (this.kreditlaufzeit >= 10 && this.kreditlaufzeit <= 20) {
      this._nrKredit = this.constants.nr10To20;
    } else {
      this._nrKredit = this.constants.nrMoreThan20;
    }
  }

  // Sollzins KFW [%]
  private _sollzinsKfw = 0;
  private updateSollzinsKfw() {
    if (this.kfWDarlehen === 'Endfälliges') {
      this._sollzinsKfw = this.constants.sollzinsKfw_Endfälliges;
    } else if (this.kfWDarlehen === 'Annuitäten') {
      this._sollzinsKfw = this._nrKredit;
    } else {
      this._sollzinsKfw = 0;
    }
  }

  // Max. KFW-Kredit [€]
  private _maxKfwKredit =
    this.anzahlWohnungen * this.constants.maxKfwKredit_Lower;
  private updateMaxKfwKredit() {
    if (
      this.eeKlasse === true ||
      this.zertifizierung !== 'Keine Zertifizierung'
    ) {
      this._maxKfwKredit =
        this.anzahlWohnungen * this.constants.maxKfwKredit_Higher;
    } else {
      this._maxKfwKredit =
        this.anzahlWohnungen * this.constants.maxKfwKredit_Lower;
    }
  }

  // Gesamtgestehungskosten [€]
  private _gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  private updateGesamtgestehungskosten() {
    this._gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  }

  // Fördersumme [€]
  private _foerdersumme = this._maxKfwKredit;
  private updateFoerdersumme() {
    this._foerdersumme = Math.min(
      this._maxKfwKredit,
      this._gesamtgestehungskosten
    );
  }

  // Restsumme [€]
  private _restsumme = 0;
  private updateRestsumme() {
    this._restsumme = Math.max(
      this._gesamtgestehungskosten - this._maxKfwKredit,
      0
    );
  }

  // #03
  // AF KFW [€]
  private _afKfw = 0;
  private updateAfKfW() {
    if (this._sollzinsKfw === 0 || this.kreditlaufzeit === 0) {
      this._afKfw = 0;
    } else {
      this._afKfw =
        ((this._sollzinsKfw / 100) *
          Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit)) /
        (Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) - 1);
    }
  }

  // AF Bank [€]
  private _afBank = 0;
  private updateAfBank() {
    this._afBank =
      ((this.kalkRealzins / 100) *
        Math.pow(1 + this.kalkRealzins / 100, this.kreditlaufzeit)) /
      (Math.pow(1 + this.kalkRealzins / 100, this.kreditlaufzeit) - 1);
  }

  // Zuschuss (KfW) [€]
  private _kfwZuschuss = 0;
  private updateZuschuss() {
    this._kfwZuschuss = Math.min(
      ((this._tilgungszuschuss +
        this._eeBonus +
        this._nhBonus +
        this._wpbBonus +
        this._serSanBonus) /
        100) *
        this._foerdersumme,
      0.4 * this._foerdersumme
    );
  }

  // KfW-Kredit [€]
  private _kfwKredit = 0;
  private updateKfwKredit() {
    this._kfwKredit = this._foerdersumme - this._kfwZuschuss;
  }

  // Bank-Kredit [€]
  private _bankKredit = 0;
  private updateBankKredit() {
    this._bankKredit = this._restsumme;
  }

  // Annuität KfW [€]
  private _annuitaetKfW = 0;
  private updateAnnuitaetKfw() {
    this._annuitaetKfW = this._afKfw * this._kfwKredit;
  }

  // Annuität Bank [€]
  private _annuitaetBank = 0;
  private updateAnnuitaetB() {
    this._annuitaetBank = this._bankKredit * this._afBank;
  }

  // EF KFW [€]
  private _efKfW = 0;
  private updateEfKfw() {
    this._efKfW =
      ((this._kfwKredit * this._sollzinsKfw) / 100) * this.kreditlaufzeit;
  }

  // EF B [€]
  private _efBank = 0;
  private updateEfB() {
    this._efBank =
      ((this.kalkRealzins * this._restsumme) / 100) * this.kreditlaufzeit;
  }

  // Finanzierungskosten (KfW) [€]
  private _finanzierungskostenKfw = 0;
  private updateFinanzierungskostenKfw() {
    if (this.kfWDarlehen === 'Annuitäten') {
      this._finanzierungskostenKfw =
        this._annuitaetKfW * this.kreditlaufzeit - this._kfwKredit;
    } else if (this.kfWDarlehen === 'Endfälliges') {
      this._finanzierungskostenKfw = this._efKfW;
    } else {
      this._finanzierungskostenKfw = 0;
    }
  }

  // Finazierungskosten (Finanzmarkt) [€]
  private _finanzierungskostenFinanzmarkt = 0;
  private updateFinanzierungskostenFinanzmarkt() {
    if (this.bankDarlehen === 'Annuitäten') {
      this._finanzierungskostenFinanzmarkt =
        this._annuitaetBank * this.kreditlaufzeit - this._bankKredit;
    } else if (this.bankDarlehen === 'Endfälliges') {
      this._finanzierungskostenFinanzmarkt = this._efBank;
    } else {
      this._finanzierungskostenFinanzmarkt = 0;
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
    this._gbAnnuitaet =
      (this._foerdersumme + this._restsumme) *
        this._afBank *
        this.kreditlaufzeit -
      (this._foerdersumme + this._restsumme);
  }

  // GB: EFD [€]
  private _gbEfd = 0;
  private updateGbEfd() {
    this._gbEfd =
      ((this.kalkRealzins * (this._foerdersumme + this._restsumme)) / 100) *
      this.kreditlaufzeit;
  }

  // Option 1: ohne KfW [€]
  private _ohneKfw = 0;
  private updateOhneKfw() {
    if (this.bankDarlehen === 'Endfälliges') {
      this._ohneKfw = this._gbEfd;
    } else {
      this._ohneKfw = this._gbAnnuitaet;
    }
  }

  // Option 2: mit KfW [€]
  private _mitKfw = 0;
  private updateMitKfw() {
    this._mitKfw =
      this._finanzierungskostenKfw + this._finanzierungskostenFinanzmarkt;
  }

  // Gesamtkosten
  private _gInvestition = 0;
  private updateGInvestition() {
    this._gInvestition = this._investitionskosten - this._kfwZuschuss;
  }

  private _gFinanzierung = 0;
  private updateGFinanzierung() {
    this._gFinanzierung =
      this._kfwKredit +
      this._bankKredit +
      this._finanzierungskostenKfw +
      this._finanzierungskostenFinanzmarkt;
  }

  // Create an observable for Sanierung Output to be used in the Save and Export
  outputSanierung!: SanierungProjekt;
  private outputSanierungSource = new BehaviorSubject<SanierungProjekt>(this.outputSanierung);
  currentOutput$ = this.outputSanierungSource.asObservable();

  public update() {
    // console.log("test");
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
    this.updateAfBank();
    this.updateZuschuss();
    this.updateKfwKredit();
    this.updateBankKredit();
    this.updateAnnuitaetKfw();
    this.updateAnnuitaetB();
    this.updateEfKfw();
    this.updateEfB();
    this.updateFinanzierungskostenKfw();
    this.updateFinanzierungskostenFinanzmarkt();
    this.updateInvestitionkosten();
    this.updateGbAnnuitaet();
    this.updateGbEfd();
    this.updateOhneKfw();
    this.updateMitKfw();
    this.updateGInvestition();
    this.updateGFinanzierung();

    this.outputSanierungSource.next(
      (this.outputSanierung = {
        // Projekt
        wohnflaeche: this.wohnflaeche,
        anzahlWohnungen: this.anzahlWohnungen,
        energiestandard: this.energiestandard,
        konstruktion: this.konstruktion,
        zertifizierung: this.zertifizierung,
        // Sanierung
        worstPerformingBuilding: this.worstPerformingBuilding,
        serielleSanierung: this.serielleSanierung,
        zustandBestand: this.zustandBestand,
        eeKlasse: this.eeKlasse,
        // Dalehen
        kalkRealzins: this.kalkRealzins,
        kreditlaufzeit: this.kreditlaufzeit,
        kfWDarlehen: this.kfWDarlehen,
        bankDarlehen: this.bankDarlehen,
        // Output
        tilgungszuschuss: this._tilgungszuschuss,
        eeBonus: this._eeBonus,
        nhBonus: this._nhBonus,
        wpbBonus: this._wpbBonus,
        serSanBonus: this._serSanBonus,
        gestehungskosten: this._gestehungskosten,
        nrKredit: this._nrKredit,
        sollzinsKfw: this._sollzinsKfw,
        maxKfwKredit: this._maxKfwKredit,
        gesamtgestehungskosten: this._gesamtgestehungskosten,
        foerdersumme: this._foerdersumme,
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
        finanzierungskostenKfwM2:
          this._finanzierungskostenKfw / this.wohnflaeche,
        finanzierungskostenFinanzmarkt: this._finanzierungskostenFinanzmarkt,
        finanzierungskostenFinanzmarktM2:
          this._finanzierungskostenFinanzmarkt / this.wohnflaeche,
        investitionskosten: this._investitionskosten,
        investitionskostenM2: this._investitionskosten / this.wohnflaeche,
        kfwZuschuss: this._kfwZuschuss,
        kfwZuschussM2: this._kfwZuschuss / this.wohnflaeche,
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
        differenzOhneMitKfwM2:
          (this._ohneKfw - this._mitKfw) / this.wohnflaeche,
      })
    );
  }
}
