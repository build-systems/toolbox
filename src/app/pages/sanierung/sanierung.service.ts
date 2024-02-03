import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SanierungProjekt } from '../../shared/sanierungprojekt';
import { sanierung } from '../../shared/constants';
import tableSanierung from './tableSanierung.json';
import { FormProjektSanierungService } from './form-projekt-sanierung/form-projekt-sanierung.service';
import { FormDarlehenSanierungService } from './form-darlehen-sanierung/form-darlehen-sanierung.service';

@Injectable({
  providedIn: 'root',
})
export class SanierungService {
  // Neubau active form tab
  public currentTab = signal(1);

  // Initial project parameters
  userPriceDisabled: boolean = this.formProjektService.userPrice.disabled;
  userPrice: number = this.formProjektService.userPrice.value;
  wohnflaeche: number = this.formProjektService.wohnflaeche.value;
  anzahlWohnungen: number = this.formProjektService.anzahlWohnungen.value;
  energiestandard: EnergiestandardSanierung =
    this.formProjektService.energiestandard.options[0].value;
  zertifizierung: ZertifizierungSanierung =
    this.formProjektService.zertifizierung.options[0].value;
  worstPerformingBuilding: boolean =
    this.formProjektService.worstPerformingBuilding.value;
  serielleSanierung: boolean = this.formProjektService.serielleSanierung.value;
  zustandBestand: ZustandBestand =
    this.formProjektService.zustandBestand.options[0].value;
  eeKlasse: boolean = this.formProjektService.eeKlasse.value;

  // Initial darlehen parameters
  kalkRealzins: number = this.formDarlehenService.kalkRealzins.value;
  kreditlaufzeit: number = this.formDarlehenService.kreditlaufzeit.value;
  kfWDarlehen: KfWDarlehen =
    this.formDarlehenService.kfWDarlehen.options[0].value;
  bankDarlehen: BankDarlehen =
    this.formDarlehenService.bankDarlehen.options[0].value;

  constructor(
    private constants: sanierung,
    private formProjektService: FormProjektSanierungService,
    private formDarlehenService: FormDarlehenSanierungService
  ) {
    this.formProjektService.projektFormSanierung.valueChanges.subscribe(
      (value) => {
        this.userPriceDisabled = !value.userPriceToggle!;
        this.userPrice = value.userPriceRange!;
        this.wohnflaeche = value.wohnflaecheRange!;
        this.anzahlWohnungen = value.anzahlWohnungenRange!;
        this.energiestandard = value.energiestandard!;
        this.zertifizierung = value.zertifizierung!;
        this.worstPerformingBuilding = value.worstPerformingBuilding!;
        this.serielleSanierung = value.serielleSanierung!;
        this.zustandBestand = value.zustandBestand!;
        this.eeKlasse = value.eeKlasse!;
        this.update();
      }
    );
    this.formDarlehenService.darlehenFormSanierung.valueChanges.subscribe(
      (value) => {
        this.kalkRealzins = value.kalkRealzinsRange!;
        this.kreditlaufzeit = value.kreditlaufzeitRange!;
        this.kfWDarlehen = value.kfWDarlehen!;
        this.bankDarlehen = value.bankDarlehen!;
        this.update();
      }
    );

    this.update();
  }

  // Formulas
  // #01
  // Tilgungszuschuss [%]
  private _tilgungszuschuss = 0;
  updateTilgungszuschuss(energiestandard: EnergiestandardSanierung): number {
    if (energiestandard === 'EH 85') {
      return this.constants.tilgungszuschuss.EH85;
    } else if (energiestandard === 'EH 70') {
      return this.constants.tilgungszuschuss.EH70;
    } else if (energiestandard === 'EH 55') {
      return this.constants.tilgungszuschuss.EH55;
    } else if (energiestandard === 'EH 40') {
      return this.constants.tilgungszuschuss.EH40;
    } else {
      return 0;
    }
  }

  // EE-Bonus [%]
  private _eeBonus = 0;
  updateEeBonus(eeKlasse: boolean): number {
    if (eeKlasse === true) {
      return this.constants.eeBonusPossible;
    } else {
      return 0;
    }
  }

  // NH-Bonus [%]
  private _nhBonus = 0;
  updateNhBonus(zertifizierung: ZertifizierungSanierung): number {
    if (zertifizierung !== 'Keine Zertifizierung') {
      return this.constants.nhBonusPossible;
    } else {
      return 0;
    }
  }

  // WPB-Bonus [%]
  private _wpbBonus = 0;
  updateWpbBonus(
    worstPerformingBuilding: boolean,
    energiestandard: EnergiestandardSanierung
  ): number {
    if (
      worstPerformingBuilding === true &&
      (energiestandard === 'EH 70' ||
        energiestandard === 'EH 55' ||
        energiestandard === 'EH 40')
    ) {
      return this.constants.wpbBonusPossible;
    } else {
      return 0;
    }
  }

  // Seriellen Sanierung Bonus [%]
  private _serSanBonus = 0;
  updateSerSanBonus(
    serielleSanierung: boolean,
    energiestandard: EnergiestandardSanierung
  ): number {
    if (
      serielleSanierung === true &&
      (energiestandard === 'EH 55' || energiestandard === 'EH 40')
    ) {
      return this.constants.serSanBonusPossible;
    } else {
      return 0;
    }
  }

  // #02
  // Gestehungskosten [€/m²]
  private _gestehungskosten = 0;
  updateGestehungskosten(
    userPriceDisabled: boolean,
    userPrice: number,
    energiestandard: EnergiestandardSanierung,
    zustandBestand: ZustandBestand
  ): number {
    // First check if the user chose to input their own price estimation
    // If not, then search in the table (JSON file)
    if (userPriceDisabled) {
      const desiredProperties = {
        Energiestandard: energiestandard,
        ZustandBestand: zustandBestand,
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
        return tableResult * this.constants.safetyMultiplier;
      } catch (error) {
        console.log(error);
        return 0;
      }
    } else {
      return userPrice;
    }
  }

  // NR-Kredit [%]
  private _nrKredit = this.constants.nrKredit.lessThan10;
  updateNrKredit(kreditlaufzeit: number): number {
    if (kreditlaufzeit < 10) {
      return this.constants.nrKredit.lessThan10;
    } else if (kreditlaufzeit >= 10 && kreditlaufzeit <= 20) {
      return this.constants.nrKredit.between10And20;
    } else {
      return this.constants.nrKredit.moreThan20;
    }
  }

  // Sollzins KFW [%]
  private _sollzinsKfw = 0;
  updateSollzinsKfw(kfWDarlehen: KfWDarlehen, nrKredit: number): number {
    if (kfWDarlehen === 'Endfälliges') {
      return this.constants.sollzinsKfw_Endfälliges;
    } else if (kfWDarlehen === 'Annuitäten') {
      return nrKredit;
    } else {
      return 0;
    }
  }

  // Max. KFW-Kredit [€]
  private _maxKfwKredit =
    this.anzahlWohnungen * this.constants.kfwKreditLimit.lower;
  updateMaxKfwKredit(
    eeKlasse: boolean,
    zertifizierung: ZertifizierungSanierung,
    anzahlWohnungen: number
  ): number {
    if (eeKlasse === true || zertifizierung !== 'Keine Zertifizierung') {
      return anzahlWohnungen * this.constants.kfwKreditLimit.higher;
    } else {
      return anzahlWohnungen * this.constants.kfwKreditLimit.lower;
    }
  }

  // Gesamtgestehungskosten [€]
  private _gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  updateGesamtgestehungskosten() {
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
      this.constants.kfwZuschussMinMultiplier * this._foerdersumme
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

  private _kfwKreditProBau = 0;
  private updateKfwKreditProBau() {
    this._kfwKreditProBau = this._kfwKredit / this.anzahlWohnungen;
  }

  private _bankKreditProBau = 0;
  private updateBankKreditProBau() {
    this._bankKreditProBau = this._bankKredit / this.anzahlWohnungen;
  }

  // investitionskostenProBau
  private _investitionskostenProBau = 0;
  private updateInvestitionskostenProBau() {
    this._investitionskostenProBau =
      this._investitionskosten / this.anzahlWohnungen;
  }

  private _kfwZuschussProBau = 0;
  private updateKfwZuschussProBau() {
    this._kfwZuschussProBau = this._kfwZuschuss / this.anzahlWohnungen;
  }

  // Sanierung Output to be used in the Save and Export
  outputSanierung!: SanierungProjekt;
  private outputSanierungSource = new BehaviorSubject<SanierungProjekt>(
    this.outputSanierung
  );
  currentOutputSanierung$ = this.outputSanierungSource.asObservable();

  public update() {
    this._tilgungszuschuss = this.updateTilgungszuschuss(this.energiestandard);
    this._eeBonus = this.updateEeBonus(this.eeKlasse);
    this._nhBonus = this.updateNhBonus(this.zertifizierung);
    this._wpbBonus = this.updateWpbBonus(
      this.worstPerformingBuilding,
      this.energiestandard
    );
    this._serSanBonus = this.updateSerSanBonus(
      this.serielleSanierung,
      this.energiestandard
    );
    this._gestehungskosten = this.updateGestehungskosten(
      this.userPriceDisabled,
      this.userPrice,
      this.energiestandard,
      this.zustandBestand
    );
    this._nrKredit = this.updateNrKredit(this.kreditlaufzeit);
    this._sollzinsKfw = this.updateSollzinsKfw(
      this.kfWDarlehen,
      this._nrKredit
    );
    this._maxKfwKredit = this.updateMaxKfwKredit(
      this.eeKlasse,
      this.zertifizierung,
      this.anzahlWohnungen
    );
    this.updateGesamtgestehungskosten();
    this.updateFoerdersumme();
    this.updateRestsumme();
    this.updateAfKfW();
    this.updateAfBank();
    this.updateKfwZuschuss();
    this.updateKfwZuschussM2();
    this.updateKfwZuschussProBau();
    this.updateKfwKredit();
    this.updateKfwKreditM2();
    this.updateKfwKreditProBau();
    this.updateBankKredit();
    this.updateBankKreditM2();
    this.updateBankKreditProBau();
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
    this.updateInvestitionskostenProBau();
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

    this.outputSanierungSource.next(
      (this.outputSanierung = {
        // Projekt
        wohnflaeche: this.wohnflaeche,
        anzahlWohnungen: this.anzahlWohnungen,
        energiestandard: this.energiestandard,
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
        kfwKreditM2: this._kfwKreditM2,
        kfwKreditProBau: this._kfwKreditProBau,
        bankKredit: this._bankKredit,
        bankKreditM2: this._bankKreditM2,
        bankKreditProBau: this._bankKreditProBau,
        finanzierungskostenKfw: this._finanzierungskostenKfw,
        finanzierungskostenKfwM2: this._finanzierungskostenKfwM2,
        finanzierungskostenFinanzmarkt: this._finanzierungskostenFinanzmarkt,
        finanzierungskostenFinanzmarktM2:
          this._finanzierungskostenFinanzmarktM2,
        investitionskosten: this._investitionskosten,
        investitionskostenM2: this._investitionskostenM2,
        investitionskostenProBau: this._investitionskostenProBau,
        kfwZuschuss: this._kfwZuschuss,
        kfwZuschussM2: this._kfwZuschussM2,
        kfwZuschussProBau: this._kfwZuschussProBau,
        gInvestition: this._gInvestition,
        gInvestitionM2: this._gInvestitionM2,
        gFinanzierung: this._gFinanzierung,
        gFinanzierungM2: this._gFinanzierungM2,
        // Vergleichsrechnung
        ohneKfw: this._ohneKfw,
        ohneKfwM2: this._ohneKfwM2,
        mitKfw: this._mitKfw,
        mitKfwM2: this._mitKfwM2,
      })
    );
  }

  public reset() {
    // Project parameters
    this.wohnflaeche = this.formProjektService.wohnflaeche.value;
    this.anzahlWohnungen = this.formProjektService.anzahlWohnungen.value;
    this.energiestandard =
      this.formProjektService.energiestandard.options[0].value;
    this.zertifizierung =
      this.formProjektService.zertifizierung.options[0].value;
    this.worstPerformingBuilding =
      this.formProjektService.worstPerformingBuilding.value;
    this.serielleSanierung = this.formProjektService.serielleSanierung.value;
    this.zustandBestand =
      this.formProjektService.zustandBestand.options[0].value;
    this.eeKlasse = this.formProjektService.eeKlasse.value;

    // Darlehen parameters
    this.kalkRealzins = this.formDarlehenService.kalkRealzins.value;
    this.kreditlaufzeit = this.formDarlehenService.kreditlaufzeit.value;
    this.kfWDarlehen = this.formDarlehenService.kfWDarlehen.options[0].value;
    this.bankDarlehen = this.formDarlehenService.bankDarlehen.options[0].value;

    this.update();
  }
}
