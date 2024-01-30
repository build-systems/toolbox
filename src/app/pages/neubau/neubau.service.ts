import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NeubauProjekt } from '../../shared/neubauprojekt';
import { neubau } from '../../shared/constants';
import { FormProjektNeubauService } from './form-projekt-neubau/form-projekt-neubau.service';
import { DashboardOutput } from '../../shared/dashboard-output';
import { FormDarlehenNeubauService } from './form-darlehen-neubau/form-darlehen-neubau.service';

@Injectable({
  providedIn: 'root',
})
export class NeubauService {
  // Neubau active form tab
  public currentTab = signal(1);

  // Initial project parameters
  userPriceDisabled = this.formProjektService.userPrice.disabled;
  userPrice = this.formProjektService.userPrice.value;
  wohnflaeche = this.formProjektService.wohnflaeche.value;
  anzahlWohnungen = this.formProjektService.anzahlWohnungen.value;
  energiestandard: EnergiestandardNeubau =
    this.formProjektService.energiestandard.options[0].value;
  konstruktion: Konstruktion =
    this.formProjektService.konstruktion.options[0].value;
  zertifizierung: ZertifizierungNeubau =
    this.formProjektService.zertifizierung.options[0].value;

  // Neubau form parameters
  kellergeschossIn: Kellergeschoss =
    this.formProjektService.kellergeschoss.options[0].value;
  stellplaetzeIn: Stellplaetze =
    this.formProjektService.stellplaetze.options[0].value;
  aufzugsanlageIn: Aufzugsanlage =
    this.formProjektService.aufzugsanlage.options[0].value;
  barrierefreiheitIn: BarrierefreiesBauen =
    this.formProjektService.barrierefreiheit.options[0].value;
  dachbegruenungIn: Dachbegruenung =
    this.formProjektService.dachbegruenung.options[0].value;
  baustellenlogistikIn: Baustellenlogistik =
    this.formProjektService.baustellenlogistik.options[0].value;
  aussenanlagenIn: Aussenanlagen =
    this.formProjektService.aussenanlagen.options[0].value;
  grundstuecksbezogeneKosten: number =
    this.formProjektService.grundstKosten.value;
  baunebenkostenKeinFin: number =
    this.formProjektService.baunebenkostenKeinFin.init;

  // Darlehen parameters
  kalkRealzins = this.formDarlehenService.kalkRealzins.value;
  kreditlaufzeit: number = this.formDarlehenService.kreditlaufzeit.value;
  kfWDarlehen: KfWDarlehen =
    this.formDarlehenService.kfWDarlehen.options[0].value;
  bankDarlehen: BankDarlehen =
    this.formDarlehenService.bankDarlehen.options[0].value;

  constructor(
    private constants: neubau,
    private formProjektService: FormProjektNeubauService,
    private formDarlehenService: FormDarlehenNeubauService
  ) {
    this.formProjektService.projektFormNeu.valueChanges.subscribe((value) => {
      this.userPriceDisabled = !value.userPriceToggle!;
      this.userPrice = value.userPrice!;
      this.wohnflaeche = value.wohnflaecheRange!;
      this.anzahlWohnungen = value.anzahlWohnungen!;
      this.energiestandard = value.energiestandard!;
      this.konstruktion = value.konstruktion!;
      this.zertifizierung = value.zertifizierung!;
      this.kellergeschossIn = value.kellergeschossIn!;
      this.stellplaetzeIn = value.stellplaetzeIn!;
      this.aufzugsanlageIn = value.aufzugsanlageIn!;
      this.barrierefreiheitIn = value.barrierefreiheitIn!;
      this.dachbegruenungIn = value.dachbegruenungIn!;
      this.baustellenlogistikIn = value.baustellenlogistikIn!;
      this.aussenanlagenIn = value.aussenanlagenIn!;
      this.grundstuecksbezogeneKosten = value.grundstuecksbezogeneKostenRange!;
      this.baunebenkostenKeinFin = value.baunebenkostenKeinFinRange!;
      this.update();
    });

    this.formDarlehenService.darlehenForm.valueChanges.subscribe((value) => {
      this.kalkRealzins = value.kalkRealzinsRange!;
      this.kreditlaufzeit = value.kreditlaufzeit!;
      this.kfWDarlehen = value.kfWDarlehen!;
      this.bankDarlehen = value.bankDarlehen!;
      this.update();
    });

    // CAN THIS BE DELETED?
    this.update();
  }

  // Formulas
  // #01
  // Neubau output
  private _kellergeschossOut = this.constants.kellerVorhanden;
  private updateKellergeschossOut() {
    if (this.kellergeschossIn === 'Vorhanden') {
      this._kellergeschossOut = this.constants.kellerVorhanden;
    } else {
      this._kellergeschossOut = 0;
    }
  }

  private _stellplaetzeOut = this.constants.stellplaetze.tiefgarage;
  private updateStellplaetzeOut() {
    if (this.stellplaetzeIn === 'Garage') {
      this._stellplaetzeOut = this.constants.stellplaetze.garage;
    } else if (this.stellplaetzeIn === 'Parkpalette') {
      this._stellplaetzeOut = this.constants.stellplaetze.parkpalette;
    } else if (this.stellplaetzeIn === 'Tiefgarage') {
      this._stellplaetzeOut = this.constants.stellplaetze.tiefgarage;
    } else {
      this._stellplaetzeOut = 0;
    }
  }

  private _redGarageOut = this.constants.redGarage;
  private updateRedGarageOut() {
    if (
      this.kellergeschossIn === 'Vorhanden' &&
      this.stellplaetzeIn === 'Tiefgarage'
    ) {
      this._redGarageOut = this.constants.redGarage;
    } else {
      this._redGarageOut = 0;
    }
  }

  private _aufzugsanlageOut = this.constants.aufzugsanlageVorhanden;
  private updateAufzugsanlageOut() {
    if (this.aufzugsanlageIn === 'Vorhanden') {
      this._aufzugsanlageOut = this.constants.aufzugsanlageVorhanden;
    } else {
      this._aufzugsanlageOut = 0;
    }
  }

  private _barrierefreiheitOut = this.constants.barriere.reduziert;
  private updateBarrierefreiheitOut() {
    if (this.barrierefreiheitIn === 'Barrierereduziert') {
      this._barrierefreiheitOut = this.constants.barriere.reduziert;
    } else if (this.barrierefreiheitIn === 'Barrierefrei') {
      this._barrierefreiheitOut = this.constants.barriere.frei;
    } else if (this.barrierefreiheitIn === 'Barrierefrei (R)') {
      this._barrierefreiheitOut = this.constants.barriere.reduziertR;
    } else {
      this._barrierefreiheitOut = 0;
    }
  }

  private _dachbegruenungOut = this.constants.dachbegruenungVorhanden;
  private updateDachbegruenungOut() {
    if (this.dachbegruenungIn === 'Vorhanden') {
      this._dachbegruenungOut = this.constants.dachbegruenungVorhanden;
    } else {
      this._dachbegruenungOut = 0;
    }
  }

  private _baustellenlogistikOut = this.constants.baustellenlogistikVorhanden;
  private updateBaustellenlogistikOut() {
    if (this.baustellenlogistikIn === 'Vorhanden') {
      this._baustellenlogistikOut = this.constants.baustellenlogistikVorhanden;
    } else {
      this._baustellenlogistikOut = 0;
    }
  }

  private _aussenanlagenOut = this.constants.aussenanlagen.gering;
  private updateAussenanlagenOut() {
    if (this.aussenanlagenIn === 'Gering') {
      this._aussenanlagenOut = this.constants.aussenanlagen.gering;
    } else if (this.aussenanlagenIn === 'Mittel') {
      this._aussenanlagenOut = this.constants.aussenanlagen.mittel;
    } else if (this.aussenanlagenIn === 'Hoch') {
      this._aussenanlagenOut = this.constants.aussenanlagen.hoch;
    } else {
      this._aussenanlagenOut = this.constants.aussenanlagen.gering;
    }
  }

  private _energetischerStandardOut = 0;
  private updateEnergetischerStandard() {
    if (this.energiestandard === 'EH 40') {
      this._energetischerStandardOut =
        this.constants.energetischerStandardPrice.EH40;
    } else if (this.energiestandard === 'GEG') {
      this._energetischerStandardOut =
        this.constants.energetischerStandardPrice.EH55;
    } else if (this.energiestandard === 'EH 70') {
      this._energetischerStandardOut =
        this.constants.energetischerStandardPrice.EH70;
      // } else if (this.energiestandard === 'EH 85') {
      // this._energetischerStandardOut =
      // this.constants.energetischerStandardPrice.EH85;
    } else {
      this._energetischerStandardOut = 0;
    }
  }

  // #02
  // Gestehungskosten [€/m²]
  private _gestehungskosten = 0;
  private updateGestehungskosten() {
    if (this.userPriceDisabled) {
      this._gestehungskosten =
        (this.constants.gestehungskostenBase +
          this._kellergeschossOut +
          this._stellplaetzeOut +
          this._redGarageOut +
          this._aufzugsanlageOut +
          this._barrierefreiheitOut +
          this._dachbegruenungOut +
          this._baustellenlogistikOut +
          this._energetischerStandardOut +
          this._aussenanlagenOut +
          this.grundstuecksbezogeneKosten +
          this.baunebenkostenKeinFin) *
        this.constants.safetyMultiplier;
    } else {
      this._gestehungskosten = this.userPrice;
    }
  }

  // NR-Kredit [%]
  private _nrKredit = this.constants.nrKredit.lessThan10;
  private updateNrKredit() {
    if (this.kreditlaufzeit < 10) {
      this._nrKredit = this.constants.nrKredit.lessThan10;
    } else if (this.kreditlaufzeit >= 10 && this.kreditlaufzeit <= 25) {
      this._nrKredit = this.constants.nrKredit.between10And25;
    } else {
      this._nrKredit = this.constants.nrKredit.moreThan25;
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

  // Gesamtgestehungskosten [€]
  private _gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  private updateGesamtgestehungskosten() {
    this._gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  }

  // How will the formula look like with the new class? (keine, ohne QNG Siegel, mit QNG Siegel)
  //=IF(AND(B7="keine Zertifizierung";B5="EH 40");100000*B4;IF(AND(B7="QNG";B5="EH 40");150000*B4;0))
  // KfW-Kredit [€]
  private _kfwKredit = 0;
  private updateKfwKredit() {
    if (
      this.zertifizierung === 'ohne QNG' &&
      this.energiestandard === 'EH 40'
    ) {
      this._kfwKredit =
        this.constants.kfwKreditLimit.lower * this.anzahlWohnungen;
    } else if (
      this.zertifizierung === 'mit QNG' &&
      this.energiestandard === 'EH 40'
    ) {
      this._kfwKredit =
        this.constants.kfwKreditLimit.higher * this.anzahlWohnungen;
    } else if (this.zertifizierung === 'Keine') {
      this._kfwKredit = 0;
    }
  }

  // Restsumme [€]
  private _restsumme =
    this.wohnflaeche * this._gestehungskosten - this._kfwKredit;
  private updateRestsumme() {
    if (this.konstruktion === 'Holzbau') {
      this._restsumme =
        this.wohnflaeche *
          this._gestehungskosten *
          this.constants.restsummeHolzbau -
        this._kfwKredit;
    } else {
      this._restsumme =
        this.wohnflaeche * this._gestehungskosten - this._kfwKredit;
    }
    // Make sure it doesn't go negative
    this._restsumme = this._restsumme < 0 ? 0 : this._restsumme;
  }

  // #03
  // AF KFW [€]
  private _afKfw = 0;
  private updateAfKfW() {
    this._afKfw =
      ((this._sollzinsKfw / 100) *
        Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit)) /
      (Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) - 1);
  }

  // AF Bank [€]
  private _afBank = 0;
  private updateAfBank() {
    this._afBank =
      ((this.kalkRealzins / 100) *
        Math.pow(1 + this.kalkRealzins / 100, this.kreditlaufzeit)) /
      (Math.pow(1 + this.kalkRealzins / 100, this.kreditlaufzeit) - 1);
  }

  // Annuität KfW [€]
  private _annuitaetKfW = 0;
  private updateAnnuitaetKfw() {
    this._annuitaetKfW = this._afKfw * this._kfwKredit;
  }

  // Annuität Bank [€]
  private _annuitaetBank = 0;
  private updateAnnuitaetBank() {
    this._annuitaetBank = this._restsumme * this._afBank;
  }

  // EF KFW [€]
  private _efKfW = 0;
  private updateEfKfw() {
    this._efKfW =
      ((this._kfwKredit * this._sollzinsKfw) / 100) * this.kreditlaufzeit;
  }

  // EF Bank [€]
  private _efBank = 0;
  private updateEfBank() {
    this._efBank =
      ((this.kalkRealzins * this._restsumme) / 100) * this.kreditlaufzeit;
  }

  // Bank-Kredit [€]
  private _bankKredit = 0;
  private updateBankKredit() {
    this._bankKredit = this._restsumme;
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
      (this._kfwKredit + this._restsumme) * this._afBank * this.kreditlaufzeit -
      (this._kfwKredit + this._restsumme);
  }

  // GB: EFD [€]
  private _gbEfd = 0;
  private updateGbEfd() {
    this._gbEfd =
      ((this.kalkRealzins * (this._kfwKredit + this._restsumme)) / 100) *
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
    this._gInvestition = this._investitionskosten;
  }

  private _gFinanzierung = 0;
  private updateGFinanzierung() {
    this._gFinanzierung =
      this._kfwKredit +
      this._bankKredit +
      this._finanzierungskostenKfw +
      this._finanzierungskostenFinanzmarkt;
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

  // I am creating one output observable for Sanierung and one for Neubau to input in the dashboard
  outputDashboard!: DashboardOutput;
  private outputDashboardSource = new BehaviorSubject<DashboardOutput>(
    this.outputDashboard
  );
  currentOutputDashboard$ = this.outputDashboardSource.asObservable();

  // Neubau Output to be used in the Save and Export
  outputNeubau!: NeubauProjekt;
  private outputNeubauSource = new BehaviorSubject<NeubauProjekt>(
    this.outputNeubau
  );
  currentOutputNeubau$ = this.outputNeubauSource.asObservable();

  public update() {
    // console.log(this.userPriceDisabled);
    // console.log(this.userPrice);
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
    this.updateKfwKreditM2();
    this.updateKfwKreditProBau();
    this.updateRestsumme();
    this.updateAfKfW();
    this.updateAfBank();
    this.updateAnnuitaetKfw();
    this.updateAnnuitaetBank();
    this.updateEfKfw();
    this.updateEfBank();
    this.updateBankKredit();
    this.updateBankKreditM2();
    this.updateBankKreditProBau();
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

    this.outputDashboardSource.next(
      (this.outputDashboard = {
        typ: 'Neubau',
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
        kfwZuschuss: 0,
        kfwZuschussM2: 0,
        kfwZuschussProBau: 0,
        ohneKfw: this._ohneKfw,
        ohneKfwM2: this._ohneKfwM2,
        mitKfw: this._mitKfw,
        mitKfwM2: this._mitKfwM2,
      })
    );

    this.outputNeubauSource.next(
      (this.outputNeubau = {
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

  // Reset was created to make sure the outputs match the form values
  // After doing some changes, going to another route, and then coming back,
  // the outputs in the services were the same while the forms had reset to default values.
  // Another solution would be to restore the previous values in the forms. But that would require more work.
  // The main problem is that the forms are being reused across different projects/routes
  // So it would require either separating the forms, or identifying the current route in each form
  // to then assign the form values from the service(neubau / sanierung).
  public reset() {
    // Project parameters
    this.wohnflaeche = this.formProjektService.wohnflaeche.value;
    this.anzahlWohnungen = this.formProjektService.anzahlWohnungen.value;
    this.energiestandard =
      this.formProjektService.energiestandard.options[0].value;
    this.konstruktion = this.formProjektService.konstruktion.options[0].value;
    this.zertifizierung =
      this.formProjektService.zertifizierung.options[0].value;

    // Neubau form parameters
    this.kellergeschossIn =
      this.formProjektService.kellergeschoss.options[0].value;
    this.stellplaetzeIn = this.formProjektService.stellplaetze.options[0].value;
    this.aufzugsanlageIn =
      this.formProjektService.aufzugsanlage.options[0].value;
    this.barrierefreiheitIn =
      this.formProjektService.barrierefreiheit.options[0].value;
    this.dachbegruenungIn =
      this.formProjektService.dachbegruenung.options[0].value;
    this.baustellenlogistikIn =
      this.formProjektService.baustellenlogistik.options[0].value;
    this.aussenanlagenIn =
      this.formProjektService.aussenanlagen.options[0].value;
    this.grundstuecksbezogeneKosten =
      this.formProjektService.grundstKosten.value;
    this.baunebenkostenKeinFin =
      this.formProjektService.baunebenkostenKeinFin.init;

    // Darlehen parameters
    this.kalkRealzins = this.formDarlehenService.kalkRealzins.value;
    this.kreditlaufzeit = this.formDarlehenService.kreditlaufzeit.value;
    this.kfWDarlehen = this.formDarlehenService.kfWDarlehen.options[0].value;
    this.bankDarlehen = this.formDarlehenService.bankDarlehen.options[0].value;

    this.update();
  }
}
