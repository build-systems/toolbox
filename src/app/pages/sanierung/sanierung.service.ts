import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, skipWhile } from 'rxjs';
import { SanierungProjekt } from '../../shared/sanierungprojekt';
import { sanierung } from '../../shared/constants';
import tableSanierung from './tableSanierung.json';
import { FormProjektSanService } from '../../form-projekt-sanierung/form-projekt-san.service';
import { FormDarlehenService } from '../../form-darlehen/form-darlehen.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardOutput } from '../../dashboard-output';

@Injectable({
  providedIn: 'root',
})
export class SanierungService {
  // Project parameters
  wohnflaeche = this.formProjektService.wohnflaeche.init;
  anzahlWohnungen = this.formProjektService.anzahlWohnungen.init;
  energiestandard: EnergiestandardSanierung =
    this.formProjektService.energiestandardOptions[0].value;
  konstruktion: Konstruktion =
    this.formProjektService.konstruktionOptions[0].value;
  zertifizierung: ZertifizierungSanierung =
    this.formProjektService.zertifizierungOptions[0].value;
  worstPerformingBuilding = this.formProjektService.worstPerformingBuilding;
  serielleSanierung = this.formProjektService.serielleSanierung;
  zustandBestand: ZustandBestand =
    this.formProjektService.zustandBestandOptions[0].value;
  eeKlasse = this.formProjektService.eeKlasse;

  // Darlehen parameters
  kalkRealzins = this.formDarlehenService.kalkRealzins.init;
  kreditlaufzeit: number = this.formDarlehenService.kreditlaufzeit.init;
  kfWDarlehen: KfWDarlehen =
    this.formDarlehenService.kfWDarlehenOptions[0].value;
  bankDarlehen: BankDarlehen =
    this.formDarlehenService.bankDarlehenOptions[0].value;

  // Router link
  currentRoute!: string;
  sanierungRoute = '/sanierung';

  constructor(
    private constants: sanierung,
    private formProjektService: FormProjektSanService,
    private formDarlehenService: FormDarlehenService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      // Check for changes on the url
      if (val instanceof NavigationEnd) {
        // Then assign the url as a string
        this.currentRoute = this.router.url.toString();
      }
    });

    // Subscribe to all Projekt Form parameters and update after every change
    this.formProjektService.currentWohnflaeche$
      // Don't do anything until the user changes one of the forms
      // Don't do anything unless the Router is in the sanierung page
      .pipe(
        skipWhile((value) => value === this.wohnflaeche),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
      .subscribe((value) => {
        this.wohnflaeche = value;
        this.update();
      });

    this.formProjektService.currentAnzahlWohnungen$
      .pipe(
        skipWhile((value) => value === this.anzahlWohnungen),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
      .subscribe((value) => {
        this.anzahlWohnungen = value;
        this.update();
      });

    this.formProjektService.currentEnergiestandard$
      .pipe(
        skipWhile((value) => value === this.energiestandard),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
      .subscribe((value) => {
        this.energiestandard = value;
        this.update();
      });

    this.formProjektService.currentKonstruktion$
      .pipe(
        skipWhile((value) => value === this.konstruktion),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
      .subscribe((value) => {
        this.konstruktion = value;
        this.update();
      });

    this.formProjektService.currentZertifizierung$
      .pipe(
        skipWhile((value) => value === this.zertifizierung),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
      .subscribe((value) => {
        this.zertifizierung = value;
        this.update();
      });

    // Subscribe to all Sanierung Form parameters and update after every change
    this.formProjektService.currentWpc$
      .pipe(skipWhile((value) => value === this.worstPerformingBuilding))
      .subscribe((value) => {
        this.worstPerformingBuilding = value;
        this.update();
      });

    this.formProjektService.currentSerielleSanierung$
      .pipe(skipWhile((value) => value === this.serielleSanierung))
      .subscribe((value) => {
        this.serielleSanierung = value;
        this.update();
      });

    this.formProjektService.currentZustandBestand$
      .pipe(skipWhile((value) => value === this.zustandBestand))
      .subscribe((value) => {
        this.zustandBestand = value;
        this.update();
      });

    this.formProjektService.currentEeKlasse$
      .pipe(skipWhile((value) => value === this.eeKlasse))
      .subscribe((value) => {
        this.eeKlasse = value;
        this.update();
      });

    // Subscribe to all Darlehen Form parameters and update after every change
    this.formDarlehenService.currentKalkRealzins$
      .pipe(
        skipWhile((value) => value === this.kalkRealzins),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
      .subscribe((value) => {
        this.kalkRealzins = value;
        this.update();
      });

    this.formDarlehenService.currentKreditlaufzeit$
      .pipe(
        skipWhile((value) => value === this.kreditlaufzeit),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
      .subscribe((value) => {
        this.kreditlaufzeit = value;
        this.update();
      });

    this.formDarlehenService.currentKfWDarlehen$
      .pipe(
        skipWhile((value) => value === this.kfWDarlehen),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
      .subscribe((value) => {
        this.kfWDarlehen = value;
        this.update();
      });

    this.formDarlehenService.currentBankDarlehen$
      .pipe(
        skipWhile((value) => value === this.bankDarlehen),
        filter(() => this.currentRoute === this.sanierungRoute)
      )
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
      this._tilgungszuschuss = this.constants.tilgungszuschuss.EH85;
    } else if (this.energiestandard === 'EH 70') {
      this._tilgungszuschuss = this.constants.tilgungszuschuss.EH70;
    } else if (this.energiestandard === 'EH 55') {
      this._tilgungszuschuss = this.constants.tilgungszuschuss.EH55;
    } else if (this.energiestandard === 'EH 40') {
      this._tilgungszuschuss = this.constants.tilgungszuschuss.EH40;
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
      ZustandBestand: this.formProjektService.zustandBestandOptions[0].value,
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
  private _nrKredit = this.constants.nrKredit.lessThan10;
  updateNrKredit() {
    if (this.kreditlaufzeit < 10) {
      this._nrKredit = this.constants.nrKredit.lessThan10;
    } else if (this.kreditlaufzeit >= 10 && this.kreditlaufzeit <= 20) {
      this._nrKredit = this.constants.nrKredit.between10And20;
    } else {
      this._nrKredit = this.constants.nrKredit.moreThan20;
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
    this.anzahlWohnungen * this.constants.kfwKreditLimit.lower;
  private updateMaxKfwKredit() {
    if (
      this.eeKlasse === true ||
      this.zertifizierung !== 'Keine Zertifizierung'
    ) {
      this._maxKfwKredit =
        this.anzahlWohnungen * this.constants.kfwKreditLimit.higher;
    } else {
      this._maxKfwKredit =
        this.anzahlWohnungen * this.constants.kfwKreditLimit.lower;
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
  private updateKfwZuschuss() {
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
  private updateAnnuitaetBank() {
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
  private updateEfBank() {
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
  private updateInvestitionskosten() {
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

  private _kfwZuschussM2 = 0;
  private updateKfwZuschussM2() {
    this._kfwZuschussM2 = this._kfwZuschuss / this.wohnflaeche;
  }

  private _kfwKreditM2 = 0;
  private updateKfwKreditM2() {
    this._kfwKreditM2 = this._kfwKredit / this.wohnflaeche;
  }

  private _bankKreditM2 = 0;
  private updateBankKreditM2() {
    this._bankKreditM2 = this._bankKredit / this.wohnflaeche;
  }

  private _finanzierungskostenKfwM2 = 0;
  private updateFinanzierungskostenKfwM2() {
    this._finanzierungskostenKfwM2 =
      this._finanzierungskostenKfw / this.wohnflaeche;
  }

  private _finanzierungskostenFinanzmarktM2 = 0;
  private updateFinanzierungskostenFinanzmarktM2() {
    this._finanzierungskostenFinanzmarktM2 =
      this._finanzierungskostenFinanzmarkt / this.wohnflaeche;
  }

  private _investitionskostenM2 = 0;
  private updateInvestitionskostenM2() {
    this._investitionskostenM2 = this._investitionskosten / this.wohnflaeche;
  }

  private _gInvestitionM2 = 0;
  private updateGInvestitionM2() {
    this._gInvestitionM2 = this._gInvestition / this.wohnflaeche;
  }

  private _gFinanzierungM2 = 0;
  private updateGFinanzierungM2() {
    this._gFinanzierungM2 = this._gFinanzierung / this.wohnflaeche;
  }

  private _ohneKfwM2 = 0;
  private updateOhneKfwM2() {
    this._ohneKfwM2 = this._ohneKfw / this.wohnflaeche;
  }

  private _mitKfwM2 = 0;
  private updateMitKfwM2() {
    this._mitKfwM2 = this._mitKfw / this.wohnflaeche;
  }

  // I am creating one output observable for Sanierung and one for Neubau to input in the dashboard
  outputDashboard!: DashboardOutput;
  private outputDashboardSource = new BehaviorSubject<DashboardOutput>(
    this.outputDashboard
  );
  currentOutputDashboard$ = this.outputDashboardSource.asObservable();

  // Sanierung Output to be used in the Save and Export
  outputSanierung!: SanierungProjekt;
  private outputSanierungSource = new BehaviorSubject<SanierungProjekt>(
    this.outputSanierung
  );
  currentOutputSanierung$ = this.outputSanierungSource.asObservable();

  public update() {
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
    this.updateKfwZuschuss();
    this.updateKfwZuschussM2();
    this.updateKfwKredit();
    this.updateKfwKreditM2();
    this.updateBankKredit();
    this.updateBankKreditM2();
    this.updateAnnuitaetKfw();
    this.updateAnnuitaetBank();
    this.updateEfKfw();
    this.updateEfBank();
    this.updateFinanzierungskostenKfw();
    this.updateFinanzierungskostenKfwM2();
    this.updateFinanzierungskostenFinanzmarkt();
    this.updateFinanzierungskostenFinanzmarktM2();
    this.updateInvestitionskosten();
    this.updateInvestitionskostenM2();
    this.updateGbAnnuitaet();
    this.updateGbEfd();
    this.updateOhneKfw();
    this.updateOhneKfwM2();
    this.updateMitKfw();
    this.updateMitKfwM2();
    this.updateGInvestition();
    this.updateGInvestitionM2();
    this.updateGFinanzierung();
    this.updateGFinanzierungM2();

    this.outputDashboardSource.next(
      (this.outputDashboard = {
        typ: "Sanierung",
        // Dalehen
        kreditlaufzeit: this.kreditlaufzeit,
        kfWDarlehen: this.kfWDarlehen,
        bankDarlehen: this.bankDarlehen,
        // Zusammenfassung Ergebnisse
        annuitaetKfW: this._annuitaetKfW,
        annuitaetBank: this._annuitaetBank,
        efKfW: this._efKfW,
        efBank: this._efBank,
        kfwKredit: this._kfwKredit,
        kfwKreditM2: this._kfwKreditM2,
        bankKredit: this._bankKredit,
        bankKreditM2: this._bankKreditM2,
        finanzierungskostenKfw: this._finanzierungskostenKfw,
        finanzierungskostenKfwM2: this._finanzierungskostenKfwM2,
        finanzierungskostenFinanzmarkt: this._finanzierungskostenFinanzmarkt,
        finanzierungskostenFinanzmarktM2:
          this._finanzierungskostenFinanzmarktM2,
        investitionskosten: this._investitionskosten,
        investitionskostenM2: this._investitionskostenM2,
        kfwZuschuss: this._kfwZuschuss,
        kfwZuschussM2: this._kfwZuschussM2,
        ohneKfw: this._ohneKfw,
        ohneKfwM2: this._ohneKfwM2,
        mitKfw: this._mitKfw,
        mitKfwM2: this._mitKfwM2,
      })
    );

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
      })
    );
    // console.log(this.outputSanierung);
  }

  reset() {
    // Project parameters
    this.wohnflaeche = this.formProjektService.wohnflaeche.init;
    this.anzahlWohnungen = this.formProjektService.anzahlWohnungen.init;
    this.energiestandard =
      this.formProjektService.energiestandardOptions[0].value;
    this.konstruktion = this.formProjektService.konstruktionOptions[0].value;
    this.zertifizierung =
      this.formProjektService.zertifizierungOptions[0].value;
    this.worstPerformingBuilding =
      this.formProjektService.worstPerformingBuilding;
    this.serielleSanierung = this.formProjektService.serielleSanierung;
    this.zustandBestand =
      this.formProjektService.zustandBestandOptions[0].value;
    this.eeKlasse = this.formProjektService.eeKlasse;

    // Darlehen parameters
    this.kalkRealzins = this.formDarlehenService.kalkRealzins.init;
    this.kreditlaufzeit = this.formDarlehenService.kreditlaufzeit.init;
    this.kfWDarlehen = this.formDarlehenService.kfWDarlehenOptions[0].value;
    this.bankDarlehen = this.formDarlehenService.bankDarlehenOptions[0].value;

    this.update();
  }
}
