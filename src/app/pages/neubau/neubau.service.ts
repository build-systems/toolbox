import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NeubauProjekt } from '../../shared/neubauprojekt';
import { neubau } from '../../shared/constants';
import { FormProjektNeubauService } from './form-projekt-neubau/form-projekt-neubau.service';
import { FormDarlehenNeubauService } from './form-darlehen-neubau/form-darlehen-neubau.service';

@Injectable({
  providedIn: 'root',
})
export class NeubauService {
  // Neubau active form tab
  public currentTab = signal(1);
  public projectTitle = signal('Untitled');

  // Initial project parameters
  eigeneKostenDisabled: boolean = this.formProjektService.eigeneKosten.disabled;
  eigeneKosten: number = this.formProjektService.eigeneKosten.value;
  wohnflaeche: number = this.formProjektService.wohnflaeche.value;
  anzahlWohnungen: number = this.formProjektService.anzahlWohnungen.value;
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
  baunebenkostenOhneFinIn: number =
    this.formProjektService.baunebenkostenOhneFin.value / 100; // Conversion from percentage to fraction multiplier;

  // Darlehen parameters
  zinssatzBank: number = this.formDarlehenService.zinssatzBank.value / 100; // Conversion from percentage to fraction multiplier
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
      this.eigeneKostenDisabled = !value.eigeneKostenToggle!;
      this.eigeneKosten = value.eigeneKosten!;
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
      this.baunebenkostenOhneFinIn = value.baunebenkostenOhneFinRange! / 100; // Conversion from percentage to fraction multiplier;
      this.update();
    });

    this.formDarlehenService.darlehenForm.valueChanges.subscribe((value) => {
      this.zinssatzBank = value.zinssatzBankRange! / 100; // Conersion from percentage to fraction multiplier
      this.kreditlaufzeit = value.kreditlaufzeit!;
      this.kfWDarlehen = value.kfWDarlehen!;
      this.bankDarlehen = value.bankDarlehen!;
      this.update();
    });

    this.update();
  }

  // Formulas
  // #01
  // Neubau output
  private _kellergeschossOut = this.constants.kellerVorhanden;
  updateKellergeschossOut(kellergeschossIn: Kellergeschoss): number {
    if (kellergeschossIn === 'Geplant') {
      return this.constants.kellerVorhanden;
    } else {
      return 0;
    }
  }

  private _stellplaetzeOut = this.constants.stellplaetze.tiefgarage;
  updateStellplaetzeOut(stellplaetzeIn: Stellplaetze): number {
    if (stellplaetzeIn === 'Garage') {
      return this.constants.stellplaetze.garage;
    } else if (stellplaetzeIn === 'Parkpalette') {
      return this.constants.stellplaetze.parkpalette;
    } else if (stellplaetzeIn === 'Tiefgarage') {
      return this.constants.stellplaetze.tiefgarage;
    } else {
      return 0;
    }
  }

  private _redGarageOut = this.constants.redGarage;
  updateRedGarageOut(
    kellergeschossIn: Kellergeschoss,
    stellplaetzeIn: Stellplaetze
  ): number {
    if (kellergeschossIn === 'Geplant' && stellplaetzeIn === 'Tiefgarage') {
      return this.constants.redGarage;
    } else {
      return 0;
    }
  }

  private _aufzugsanlageOut = this.constants.aufzugsanlageVorhanden;
  updateAufzugsanlageOut(aufzugsanlageIn: Aufzugsanlage): number {
    if (aufzugsanlageIn === 'Geplant') {
      return this.constants.aufzugsanlageVorhanden;
    } else {
      return 0;
    }
  }

  private _barrierefreiheitOut = this.constants.barriere.reduziert;
  updateBarrierefreiheitOut(barrierefreiheitIn: BarrierefreiesBauen): number {
    if (barrierefreiheitIn === 'Barrierereduziert') {
      return this.constants.barriere.reduziert;
    } else if (barrierefreiheitIn === 'Barrierefrei') {
      return this.constants.barriere.frei;
    } else if (barrierefreiheitIn === 'Barrierefrei (R)') {
      return this.constants.barriere.freiR;
    } else {
      return 0;
    }
  }

  private _dachbegruenungOut = this.constants.dachbegruenungVorhanden;
  updateDachbegruenungOut(dachbegruenungIn: Dachbegruenung): number {
    if (dachbegruenungIn === 'Geplant') {
      return this.constants.dachbegruenungVorhanden;
    } else {
      return 0;
    }
  }

  private _baustellenlogistikOut = this.constants.baustellenlogistikVorhanden;
  updateBaustellenlogistikOut(
    baustellenlogistikIn: Baustellenlogistik
  ): number {
    if (baustellenlogistikIn === 'Vorhanden') {
      return this.constants.baustellenlogistikVorhanden;
    } else {
      return 0;
    }
  }

  private _aussenanlagenOut = this.constants.aussenanlagen.gering;
  updateAussenanlagenOut(aussenanlagenIn: Aussenanlagen): number {
    if (aussenanlagenIn === 'Gering') {
      return this.constants.aussenanlagen.gering;
    } else if (aussenanlagenIn === 'Mittel') {
      return this.constants.aussenanlagen.mittel;
    } else if (aussenanlagenIn === 'Hoch') {
      return this.constants.aussenanlagen.hoch;
    } else {
      return this.constants.aussenanlagen.gering;
    }
  }

  private _energetischerStandardOut = 0;
  updateEnergetischerStandardOut(
    energiestandard: EnergiestandardNeubau
  ): number {
    if (energiestandard === 'EH 40') {
      return this.constants.energetischerStandardPrice.EH40;
    } else if (energiestandard === 'GEG') {
      return this.constants.energetischerStandardPrice.GEG;
      // } else if (energiestandard === 'EH 70') {
      //   return this.constants.energetischerStandardPrice.EH70;
      // } else if (energiestandard === 'EH 85') {
      // return this.constants.energetischerStandardPrice.EH85;
    } else {
      return 0;
    }
  }

  // #02
  // Gestehungskosten [€/m²]
  private _gestehungskosten = 0;
  updateGestehungskosten(
    konstruktion: Konstruktion,
    eigeneKosten: number,
    eigeneKostenDisabled: boolean,
    kellergeschossOut: number,
    stellplaetzeOut: number,
    redGarageOut: number,
    aufzugsanlageOut: number,
    barrierefreiheitOut: number,
    dachbegruenungOut: number,
    baustellenlogistikOut: number,
    energetischerStandardOut: number,
    aussenanlagenOut: number,
    grundstuecksbezogeneKosten: number
  ): number {
    const baseCosts =
      this.constants.gestehungskostenBase +
      kellergeschossOut +
      stellplaetzeOut +
      redGarageOut +
      aufzugsanlageOut +
      barrierefreiheitOut +
      dachbegruenungOut +
      baustellenlogistikOut +
      energetischerStandardOut +
      aussenanlagenOut;
    if (eigeneKostenDisabled) {
      if (konstruktion === 'Holzbau') {
        return (
          baseCosts * this.constants.holzbauExtra + grundstuecksbezogeneKosten
        );
      } else {
        return baseCosts + grundstuecksbezogeneKosten;
      }
    } else {
      return eigeneKosten;
    }
  }
  //

  // NR-Kredit [%]
  private _nrKredit = this.constants.nrKredit.lessThan11;
  updateNrKredit(kreditlaufzeit: number): number {
    if (kreditlaufzeit < 11) {
      return this.constants.nrKredit.lessThan11;
    } else if (kreditlaufzeit >= 11 && kreditlaufzeit <= 25) {
      return this.constants.nrKredit.between11And25;
    } else {
      return this.constants.nrKredit.moreThan25;
    }
  }

  // KfW Zinssatz (Sollzins) old Sollzins KFW [%]
  private _zinssatzKfw = 0;
  updateZinssatzKfw(kfWDarlehen: KfWDarlehen, nrKredit: number): number {
    if (kfWDarlehen === 'Endfälliges') {
      return this.constants.zinssatzKfw_Endfälliges;
    } else if (kfWDarlehen === 'Annuitäten') {
      return nrKredit;
    } else {
      return 0;
    }
  }

  // Gesamtgestehungskosten [€]
  private _baukosten = this._gestehungskosten * this.wohnflaeche;
  updateBaukosten(gestehungskosten: number, wohnflaeche: number): number {
    return gestehungskosten * wohnflaeche;
  }

  private _baukostenProBau = 0;
  updateBaukostenProBau(baukosten: number, anzahlWohnungen: number): number {
    return baukosten / anzahlWohnungen;
  }

  // Baunebenkosten ohne Finanzierungskosten [%]
  private _baunebenkostenOhneFinOut =
    this._baukosten * this.baunebenkostenOhneFinIn;
  updateBaunebenkostenOhneFin(
    baukosten: number,
    baunebenkostenOhneFinIn: number
  ): number {
    return baukosten * baunebenkostenOhneFinIn;
  }

  private _investitionskosten =
    this._baukosten + this._baunebenkostenOhneFinOut;
  updateInvestitionskosten(
    baukosten: number,
    baunebenkostenOhneFinOut: number
  ): number {
    return baukosten + baunebenkostenOhneFinOut;
  }

  private _investitionskostenM2 =
    this._gestehungskosten +
    this._gestehungskosten * this.baunebenkostenOhneFinIn;
  updateInvestitionskostenM2(
    gestehungskosten: number,
    baunebenkostenOhneFinIn: number
  ): number {
    return gestehungskosten + gestehungskosten * baunebenkostenOhneFinIn;
  }

  private _investitionskostenProBau =
    this._investitionskosten / this.anzahlWohnungen;
  updateInvestitionskostenProBau(
    investitionkosten: number,
    anzahlWohnungen: number
  ): number {
    return investitionkosten / anzahlWohnungen;
  }

  // KfW Kreditschwelle / WE
  private _kfwKreditschwelleProWe = 0;
  updateKfwKreditschwelleProWe(
    zertifizierung: ZertifizierungNeubau,
    energiestandard: EnergiestandardNeubau
  ): number {
    if (zertifizierung === 'ohne QNG' && energiestandard === 'EH 40') {
      return this.constants.kfwKreditLimit.lower;
    } else if (zertifizierung === 'mit QNG' && energiestandard === 'EH 40') {
      return this.constants.kfwKreditLimit.higher;
    } else if (zertifizierung === 'Keine') {
      return 0;
    } else {
      return 0;
    }
  }

  // KfW-Kredit [€]
  private _kfwKredit = 0;
  updateKfwKredit(
    kfwKreditschwelleProWe: number,
    anzahlWohnungen: number
  ): number {
    return kfwKreditschwelleProWe * anzahlWohnungen;
  }

  private _kfwKreditM2 = 0;
  updateKfwKreditM2(kfwKredit: number, wohnflaeche: number): number {
    return kfwKredit / wohnflaeche;
  }

  // Bank-Kredit [€] (Daniel's Restsumme and Bank-Kredit were merged)
  // Also _investitionkosten = baukosten + baunebenkosten
  private _bankKredit = this._investitionskosten - this._kfwKredit;
  updateBankKredit(investitionkosten: number, kfwKredit: number): number {
    var bankKredit = investitionkosten - kfwKredit;
    return Math.max(bankKredit, 0); // Make sure it doesn't go negative
  }

  private _bankKreditM2 = 0;
  updateBankKreditM2(bankKredit: number, wohnflaeche: number): number {
    return bankKredit / wohnflaeche;
  }

  private _bankKreditProBau = 0;
  updateBankKreditProBau(bankKredit: number, anzahlWohnungen: number): number {
    return bankKredit / anzahlWohnungen;
  }

  // #03
  // AF KFW [€]
  private _afKfw = 0;
  updateAfKfW(zinssatzKfw: number, kreditlaufzeit: number): number {
    return (
      (zinssatzKfw * Math.pow(1 + zinssatzKfw, kreditlaufzeit)) /
      (Math.pow(1 + zinssatzKfw, kreditlaufzeit) - 1)
    );
  }

  // AF Bank [€]
  private _afBank = 0;
  updateAfBank(zinssatzBank: number, kreditlaufzeit: number): number {
    return (
      (zinssatzBank * Math.pow(1 + zinssatzBank, kreditlaufzeit)) /
      (Math.pow(1 + zinssatzBank, kreditlaufzeit) - 1)
    );
  }

  // Annuität KfW [€]
  private _annuitaetKfW = 0;
  updateAnnuitaetKfw(afKfw: number, kfwKredit: number): number {
    return afKfw * kfwKredit;
  }

  // Annuität Bank [€]
  private _annuitaetBank = 0;
  updateAnnuitaetBank(bankKredit: number, afBank: number): number {
    return bankKredit * afBank;
  }

  // EF KFW [€]
  private _efKfW = 0;
  updateEfKfw(
    kfwKredit: number,
    zinssatzKfw: number,
    kreditlaufzeit: number
  ): number {
    return kfwKredit * zinssatzKfw * kreditlaufzeit;
  }

  // EF Bank [€]
  private _efBank = 0;
  updateEfBank(
    bankKredit: number,
    zinssatzBank: number,
    kreditlaufzeit: number
  ): number {
    return bankKredit * zinssatzBank * kreditlaufzeit;
  }

  // Finanzierungskosten (KfW) [€]
  private _finanzierungskostenKfw = 0;
  updateFinanzierungskostenKfw(
    kfWDarlehen: KfWDarlehen,
    annuitaetKfW: number,
    kreditlaufzeit: number,
    kfwKredit: number,
    efKfW: number
  ): number {
    if (kfWDarlehen === 'Annuitäten') {
      return annuitaetKfW * kreditlaufzeit - kfwKredit;
    } else if (kfWDarlehen === 'Endfälliges') {
      return efKfW;
    } else {
      return 0;
    }
  }

  private _finanzierungskostenKfwM2 = 0;
  updateFinanzierungskostenKfwM2(
    finanzierungskostenKfw: number,
    wohnflaeche: number
  ): number {
    return finanzierungskostenKfw / wohnflaeche;
  }

  // Finazierungskosten Bank (Finanzmarkt) [€]
  private _finanzierungskostenBank = 0;
  updateFinanzierungskostenBank(
    bankDarlehen: BankDarlehen,
    annuitaetBank: number,
    kreditlaufzeit: number,
    bankKredit: number,
    efBank: number
  ): number {
    if (bankDarlehen === 'Annuitäten') {
      return annuitaetBank * kreditlaufzeit - bankKredit;
    } else if (bankDarlehen === 'Endfälliges') {
      return efBank;
    } else {
      return 0;
    }
  }

  private _finanzierungskostenBankM2 = 0;
  updateFinanzierungskostenBankM2(
    finanzierungskostenBank: number,
    wohnflaeche: number
  ): number {
    return finanzierungskostenBank / wohnflaeche;
  }
  // #04
  // GB: Annuität [€]
  private _gbAnnuitaet = 0;
  updateGbAnnuitaet(
    kfwKredit: number,
    bankKredit: number,
    afBank: number,
    kreditlaufzeit: number
  ): number {
    return (
      (kfwKredit + bankKredit) * afBank * kreditlaufzeit -
      (kfwKredit + bankKredit)
    );
  }

  // GB: Endfaelliges [€]
  private _gbEndfaelliges = 0;
  updateGbEndfaelliges(
    zinssatzBank: number,
    kfwKredit: number,
    bankKredit: number,
    kreditlaufzeit: number
  ): number {
    return zinssatzBank * (kfwKredit + bankKredit) * kreditlaufzeit;
  }

  // Option 1: Finanzierungskosten ohne KfW [€]
  private _finKostenOhneKfw = 0;
  updateFinKostenOhneKfw(
    bankDarlehen: BankDarlehen,
    gbEndfaelliges: number,
    gbAnnuitaet: number
  ): number {
    if (bankDarlehen === 'Endfälliges') {
      return gbEndfaelliges;
    } else {
      return gbAnnuitaet;
    }
  }

  private _finKostenOhneKfwM2 = 0;
  updateFinKostenOhneKfwM2(ohneKfw: number, wohnflaeche: number): number {
    return ohneKfw / wohnflaeche;
  }

  // Option 2: Finanzierungskosten mit KfW [€]
  private _finKostenMitKfw = 0;
  updateFinKostenMitKfw(
    finanzierungskostenKfw: number,
    finanzierungskostenBank: number
  ): number {
    return finanzierungskostenKfw + finanzierungskostenBank;
  }

  private _finKostenMitKfwM2 = 0;
  updateFinKostenMitKfwM2(mitKfw: number, wohnflaeche: number): number {
    return mitKfw / wohnflaeche;
  }

  // Neubau Output to be used in the Save and Export
  outputNeubau!: NeubauProjekt;
  private outputNeubauSource = new BehaviorSubject<NeubauProjekt>(
    this.outputNeubau
  );
  currentOutputNeubau$ = this.outputNeubauSource.asObservable();

  public update() {
    this._kellergeschossOut = this.updateKellergeschossOut(
      this.kellergeschossIn
    );
    this._stellplaetzeOut = this.updateStellplaetzeOut(this.stellplaetzeIn);
    this._redGarageOut = this.updateRedGarageOut(
      this.kellergeschossIn,
      this.stellplaetzeIn
    );
    this._aufzugsanlageOut = this.updateAufzugsanlageOut(this.aufzugsanlageIn);
    this._barrierefreiheitOut = this.updateBarrierefreiheitOut(
      this.barrierefreiheitIn
    );
    this._dachbegruenungOut = this.updateDachbegruenungOut(
      this.dachbegruenungIn
    );
    this._baustellenlogistikOut = this.updateBaustellenlogistikOut(
      this.baustellenlogistikIn
    );
    this._aussenanlagenOut = this.updateAussenanlagenOut(this.aussenanlagenIn);
    this._energetischerStandardOut = this.updateEnergetischerStandardOut(
      this.energiestandard
    );
    this._gestehungskosten = this.updateGestehungskosten(
      this.konstruktion,
      this.eigeneKosten,
      this.eigeneKostenDisabled,
      this._kellergeschossOut,
      this._stellplaetzeOut,
      this._redGarageOut,
      this._aufzugsanlageOut,
      this._barrierefreiheitOut,
      this._dachbegruenungOut,
      this._baustellenlogistikOut,
      this._energetischerStandardOut,
      this._aussenanlagenOut,
      this.grundstuecksbezogeneKosten
    );
    this._nrKredit = this.updateNrKredit(this.kreditlaufzeit);
    this._zinssatzKfw = this.updateZinssatzKfw(
      this.kfWDarlehen,
      this._nrKredit
    );
    this._baukosten = this.updateBaukosten(
      this._gestehungskosten,
      this.wohnflaeche
    );
    this._baukostenProBau = this.updateBaukostenProBau(
      this._baukosten,
      this.anzahlWohnungen
    );
    this._baunebenkostenOhneFinOut = this.updateBaunebenkostenOhneFin(
      this._baukosten,
      this.baunebenkostenOhneFinIn
    );
    this._investitionskosten = this.updateInvestitionskosten(
      this._baukosten,
      this._baunebenkostenOhneFinOut
    );
    this._investitionskostenM2 = this.updateInvestitionskostenM2(
      this._gestehungskosten,
      this.baunebenkostenOhneFinIn
    );
    this._investitionskostenProBau = this.updateInvestitionskostenProBau(
      this._investitionskosten,
      this.anzahlWohnungen
    );
    this._kfwKreditschwelleProWe = this.updateKfwKreditschwelleProWe(
      this.zertifizierung,
      this.energiestandard
    );
    this._kfwKredit = this.updateKfwKredit(
      this._kfwKreditschwelleProWe,
      this.anzahlWohnungen
    );
    this._kfwKreditM2 = this.updateKfwKreditM2(
      this._kfwKredit,
      this.wohnflaeche
    );
    this._bankKredit = this.updateBankKredit(
      this._investitionskosten,
      this._kfwKredit
    );
    this._bankKreditM2 = this.updateBankKreditM2(
      this._bankKredit,
      this.wohnflaeche
    );
    this._bankKreditProBau = this.updateBankKreditProBau(
      this._bankKredit,
      this.anzahlWohnungen
    );
    this._afKfw = this.updateAfKfW(this._zinssatzKfw, this.kreditlaufzeit);
    this._afBank = this.updateAfBank(this.zinssatzBank, this.kreditlaufzeit);
    this._annuitaetKfW = this.updateAnnuitaetKfw(this._afKfw, this._kfwKredit);
    this._annuitaetBank = this.updateAnnuitaetBank(
      this._bankKredit,
      this._afBank
    );
    this._efKfW = this.updateEfKfw(
      this._kfwKredit,
      this._zinssatzKfw,
      this.kreditlaufzeit
    );
    this._efBank = this.updateEfBank(
      this._bankKredit,
      this.zinssatzBank,
      this.kreditlaufzeit
    );
    this._finanzierungskostenKfw = this.updateFinanzierungskostenKfw(
      this.kfWDarlehen,
      this._annuitaetKfW,
      this.kreditlaufzeit,
      this._kfwKredit,
      this._efKfW
    );
    this._finanzierungskostenKfwM2 = this.updateFinanzierungskostenKfwM2(
      this._finanzierungskostenBank,
      this.wohnflaeche
    );
    this._finanzierungskostenBank = this.updateFinanzierungskostenBank(
      this.bankDarlehen,
      this._annuitaetBank,
      this.kreditlaufzeit,
      this._bankKredit,
      this._efBank
    );
    this._finanzierungskostenBankM2 = this.updateFinanzierungskostenBankM2(
      this._finanzierungskostenBank,
      this.wohnflaeche
    );
    this._gbAnnuitaet = this.updateGbAnnuitaet(
      this._kfwKredit,
      this._bankKredit,
      this._afBank,
      this.kreditlaufzeit
    );
    this._gbEndfaelliges = this.updateGbEndfaelliges(
      this.zinssatzBank,
      this._kfwKredit,
      this._bankKredit,
      this.kreditlaufzeit
    );
    this._finKostenOhneKfw = this.updateFinKostenOhneKfw(
      this.bankDarlehen,
      this._gbEndfaelliges,
      this._gbAnnuitaet
    );
    this._finKostenOhneKfwM2 = this.updateFinKostenOhneKfwM2(
      this._finKostenOhneKfw,
      this.wohnflaeche
    );
    this._finKostenMitKfw = this.updateFinKostenMitKfw(
      this._finanzierungskostenKfw,
      this._finanzierungskostenBank
    );
    this._finKostenMitKfwM2 = this.updateFinKostenMitKfwM2(
      this._finKostenMitKfw,
      this.wohnflaeche
    );

    this.outputNeubauSource.next(
      (this.outputNeubau = {
        title: this.projectTitle(),
        // Projekt
        eigeneKostenDisabled: this.eigeneKostenDisabled,
        eigeneKosten: this.eigeneKosten,
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
        baunebenkostenOhneFinIn: this.baunebenkostenOhneFinIn,
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
        baunebenkostenOhneFinOut: this._baunebenkostenOhneFinOut,
        // Dalehen
        zinssatzBank: this.zinssatzBank,
        kreditlaufzeit: this.kreditlaufzeit,
        kfWDarlehen: this.kfWDarlehen,
        bankDarlehen: this.bankDarlehen,
        // Output
        gestehungskosten: this._gestehungskosten,
        nrKredit: this._nrKredit,
        zinssatzKfw: this._zinssatzKfw,
        baukosten: this._baukosten,
        baukostenProBau: this._baukostenProBau,
        investitionkosten: this._investitionskosten,
        investitionkostenM2: this._investitionskostenM2,
        investitionkostenProBau: this._investitionskostenProBau,
        bankKredit: this._bankKredit,
        bankKreditM2: this._bankKreditM2,
        bankKreditProBau: this._bankKreditProBau,
        afKfw: this._afKfw,
        afBank: this._afBank,
        annuitaetKfW: this._annuitaetKfW,
        annuitaetBank: this._annuitaetBank,
        efKfW: this._efKfW,
        efBank: this._efBank,
        gbAnnuitaet: this._gbAnnuitaet,
        gbEndfaelliges: this._gbEndfaelliges,
        // Zusammenfassung Ergebnisse
        kfwKredit: this._kfwKredit,
        kfwKreditM2: this._kfwKreditM2,
        kfwKreditschwelleProWe: this._kfwKreditschwelleProWe,
        finanzierungskostenKfw: this._finanzierungskostenKfw,
        finanzierungskostenKfwM2: this._finanzierungskostenKfwM2,
        finanzierungskostenBank: this._finanzierungskostenBank,
        finanzierungskostenBankM2: this._finanzierungskostenBankM2,
        // Vergleichsrechnung
        finKostenOhneKfw: this._finKostenOhneKfw,
        finKostenOhneKfwM2: this._finKostenOhneKfwM2,
        finKostenMitKfw: this._finKostenMitKfw,
        finKostenMitKfwM2: this._finKostenMitKfwM2,
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
    this.baunebenkostenOhneFinIn =
      this.formProjektService.baunebenkostenOhneFin.value;

    // Darlehen parameters
    this.zinssatzBank = this.formDarlehenService.zinssatzBank.value;
    this.kreditlaufzeit = this.formDarlehenService.kreditlaufzeit.value;
    this.kfWDarlehen = this.formDarlehenService.kfWDarlehen.options[0].value;
    this.bankDarlehen = this.formDarlehenService.bankDarlehen.options[0].value;

    this.update();
  }
}
