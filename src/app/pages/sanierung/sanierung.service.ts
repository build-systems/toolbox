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
  _nachhaltigkeitskriterien: Nachhaltigkeitskriterien =
    this.formProjektService.nachhaltigkeitskriterien.options[0].value;
  worstPerformingBuilding: boolean =
    this.formProjektService.worstPerformingBuilding.value;
  serielleSanierung: boolean = this.formProjektService.serielleSanierung.value;
  zustandBestand: ZustandBestand =
    this.formProjektService.zustandBestand.options[0].value;

  // Initial darlehen parameters
  kalkRealzins: number = this.formDarlehenService.kalkRealzins.value / 100; // Conersion from percentage to fraction multiplier
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
        this._nachhaltigkeitskriterien = value.nachhaltigkeitskriterien!;
        this.worstPerformingBuilding = value.worstPerformingBuilding!;
        this.serielleSanierung = value.serielleSanierung!;
        this.zustandBestand = value.zustandBestand!;
        this.update();
      }
    );
    this.formDarlehenService.darlehenForm.valueChanges.subscribe((value) => {
      this.kalkRealzins = value.kalkRealzinsRange! / 100; // Conersion from percentage to fraction multiplier
      this.kreditlaufzeit = value.kreditlaufzeitRange!;
      this.kfWDarlehen = value.kfWDarlehen!;
      this.bankDarlehen = value.bankDarlehen!;
      this.update();
    });

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
  updateEeBonus(nachhaltigkeitskriterien: Nachhaltigkeitskriterien): number {
    if (nachhaltigkeitskriterien === 'EE') {
      return this.constants.eeBonusPossible;
    } else {
      return 0;
    }
  }

  // NH-Bonus [%]
  private _nhBonus = 0;
  updateNhBonus(nachhaltigkeitskriterien: Nachhaltigkeitskriterien): number {
    if (nachhaltigkeitskriterien === 'NH') {
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
        return tableResult;
      } catch (error) {
        console.log(error);
        return 0;
      }
    } else {
      return userPrice;
    }
  }

  // NR-Kredit [%]
  private _nrKredit = this.constants.nrKredit.lessThan11;
  updateNrKredit(kreditlaufzeit: number): number {
    if (kreditlaufzeit < 11) {
      return this.constants.nrKredit.lessThan11;
    } else if (kreditlaufzeit >= 11 && kreditlaufzeit <= 20) {
      return this.constants.nrKredit.between11And20;
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

  // KfW Kreditschwelle / WE
  private _kfwKreditschwelleProWe = 0;
  updateKfwKreditschwelleProWe(
    nachhaltigkeitskriterien: Nachhaltigkeitskriterien
  ): number {
    if (nachhaltigkeitskriterien !== 'Keine') {
      return this.constants.kfwKreditLimit.higher;
    } else {
      return this.constants.kfwKreditLimit.lower;
    }
  }

  // Max. KFW-Kredit [€]
  private _maxKfwKredit = 0;
  updateMaxKfwKredit(
    kfwKreditschwelleProWe: number,
    anzahlWohnungen: number
  ): number {
    return anzahlWohnungen * kfwKreditschwelleProWe;
  }

  // Baukosten / Investitionskosten [€]
  private _baukosten = this._gestehungskosten * this.wohnflaeche;
  updateBaukosten(
    gestehungskosten: number,
    wohnflaeche: number
  ): number {
    return gestehungskosten * wohnflaeche;
  }

  private _baukostenProBau = 0;
  updateBaukostenProBau(
    baukosten: number,
    anzahlWohnungen: number
  ) {
    return baukosten / anzahlWohnungen;
  }

  // Fördersumme [€]
  private _foerdersumme = this._maxKfwKredit;
  updateFoerdersumme(
    maxKfwKredit: number,
    gesamtgestehungskosten: number
  ): number {
    return Math.min(maxKfwKredit, gesamtgestehungskosten);
  }

  // Bank-Kredit [€]
  private _bankKredit = 0;
  updateBankKredit(
    maxKfwKredit: number,
    gesamtgestehungskosten: number
  ): number {
    if (maxKfwKredit >= gesamtgestehungskosten) {
      return 0;
    } else {
      return gesamtgestehungskosten - maxKfwKredit;
    }
    // return Math.max(gesamtgestehungskosten - maxKfwKredit, 0);
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
  updateAfKfW(sollzinsKfw: number, kreditlaufzeit: number): number {
    if (sollzinsKfw === 0 || kreditlaufzeit === 0) {
      return 0;
    } else {
      return (
        (sollzinsKfw *
          Math.pow(1 + sollzinsKfw, kreditlaufzeit)) /
        (Math.pow(1 + sollzinsKfw, kreditlaufzeit) - 1)
      );
    }
  }

  // AF Bank [€]
  private _afBank = 0;
  updateAfBank(kalkRealzins: number, kreditlaufzeit: number): number {
    if (kalkRealzins === 0 || kreditlaufzeit === 0) {
      return 0;
    } else {
      return (
        ((kalkRealzins) *
          Math.pow(1 + kalkRealzins, kreditlaufzeit)) /
        (Math.pow(1 + kalkRealzins, kreditlaufzeit) - 1)
      );
    }
  }

  // Zuschuss (KfW) [€]
  private _kfwZuschussPercentage = 0;
  updateKfwZuschussPercentage(
    tilgungszuschuss: number,
    eeBonus: number,
    nhBonus: number,
    wpbBonus: number,
    serSanBonus: number
  ): number {
    return Math.min(
      tilgungszuschuss + eeBonus + nhBonus + wpbBonus + serSanBonus,
      this.constants.kfwZuschussMaxMultiplier
    );
  }

  // Zuschuss (KfW) [€]
  private _kfwZuschuss = 0;
  updateKfwZuschuss(
    kfwZuschussPercentage: number,
    foerdersumme: number
  ): number {
    return kfwZuschussPercentage * foerdersumme;
  }

  private _kfwZuschussM2 = 0;
  updateKfwZuschussM2(kfwZuschuss: number, wohnflaeche: number): number {
    return kfwZuschuss / wohnflaeche;
  }

  private _kfwZuschussProBau = 0;
  updateKfwZuschussProBau(
    kfwZuschuss: number,
    anzahlWohnungen: number
  ): number {
    return kfwZuschuss / anzahlWohnungen;
  }

  // KfW-Kredit [€]
  private _kfwKredit = 0;
  updateKfwKredit(foerdersumme: number, kfwZuschuss: number): number {
    return foerdersumme - kfwZuschuss;
  }

  private _kfwKreditM2 = 0;
  updateKfwKreditM2(kfwKredit: number, wohnflaeche: number): number {
    return kfwKredit / wohnflaeche;
  }

  private _kfwKreditProBau = 0;
  updateKfwKreditProBau(kfwKredit: number, anzahlWohnungen: number): number {
    return kfwKredit / anzahlWohnungen;
  }

  // Annuität KfW [€]
  private _annuitaetKfW = 0;
  updateAnnuitaetKfw(kfwKredit: number, afKfw: number): number {
    return kfwKredit * afKfw;
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
    sollzinsKfw: number,
    kreditlaufzeit: number
  ): number {
    return (kfwKredit * sollzinsKfw) * kreditlaufzeit;
  }

  // EF B [€]
  private _efBank = 0;
  updateEfBank(
    bankKredit: number,
    kalkRealzins: number,
    kreditlaufzeit: number
  ): number {
    return (kalkRealzins * bankKredit) * kreditlaufzeit;
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
    foerdersumme: number,
    bankKredit: number, // Same as Daniel's Restsumme
    afBank: number,
    kreditlaufzeit: number
  ): number {
    return (
      (foerdersumme + bankKredit) * afBank * kreditlaufzeit -
      (foerdersumme + bankKredit)
    );
  }

  // GB: Endfaelliges [€]
  private _gbEndfaelliges = 0;
  updateGbEndfaelliges(
    kalkRealzins: number,
    foerdersumme: number,
    bankKredit: number,
    kreditlaufzeit: number
  ): number {
    return (
      (kalkRealzins * (foerdersumme + bankKredit)) * kreditlaufzeit
    );
  }

  // Option 1: ohne KfW [€]
  private _finKostenOhneKfw = 0;
  updatefinKostenOhneKfw(
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

  private _finKostenohneKfwM2 = 0;
  updateOhneKfwM2(ohneKfw: number, wohnflaeche: number): number {
    return ohneKfw / wohnflaeche;
  }

  // Option 2: mit KfW [€]
  private _finKostenmitKfw = 0;
  updatefinKostenMitKfw(
    finanzierungskostenKfw: number,
    finanzierungskostenBank: number
  ): number {
    return finanzierungskostenKfw + finanzierungskostenBank;
  }

  private _finKostenMitKfwM2 = 0;
  updateMitKfwM2(mitKfw: number, wohnflaeche: number): number {
    return mitKfw / wohnflaeche;
  }

  // Sanierung Output to be used in the Save and Export
  outputSanierung!: SanierungProjekt;
  private outputSanierungSource = new BehaviorSubject<SanierungProjekt>(
    this.outputSanierung
  );
  currentOutputSanierung$ = this.outputSanierungSource.asObservable();

  public update() {
    this._tilgungszuschuss = this.updateTilgungszuschuss(this.energiestandard);
    this._eeBonus = this.updateEeBonus(this._nachhaltigkeitskriterien);
    this._nhBonus = this.updateNhBonus(this._nachhaltigkeitskriterien);
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
    this._kfwKreditschwelleProWe = this.updateKfwKreditschwelleProWe(this._nachhaltigkeitskriterien);
    this._maxKfwKredit = this.updateMaxKfwKredit(
      this._kfwKreditschwelleProWe,
      this.anzahlWohnungen
    );
    this._baukosten = this.updateBaukosten(
      this._gestehungskosten,
      this.wohnflaeche
    );
    this._baukostenProBau = this.updateBaukostenProBau(
      this._baukosten,
      this.anzahlWohnungen
    );
    this._foerdersumme = this.updateFoerdersumme(
      this._maxKfwKredit,
      this._baukosten
    );
    this._bankKredit = this.updateBankKredit(
      this._maxKfwKredit,
      this._baukosten
    );
    this._bankKreditM2 = this.updateBankKreditM2(
      this._bankKredit,
      this.wohnflaeche
    );
    this._bankKreditProBau = this.updateBankKreditProBau(
      this._bankKredit,
      this.anzahlWohnungen
    );
    this._afKfw = this.updateAfKfW(this._sollzinsKfw, this.kreditlaufzeit);
    this._afBank = this.updateAfBank(this.kalkRealzins, this.kreditlaufzeit);
    this._kfwZuschussPercentage = this.updateKfwZuschussPercentage(
      this._tilgungszuschuss,
      this._eeBonus,
      this._nhBonus,
      this._wpbBonus,
      this._serSanBonus
    );
    this._kfwZuschuss = this.updateKfwZuschuss(
      this._kfwZuschussPercentage,
      this._foerdersumme
    );
    this._kfwZuschussM2 = this.updateKfwZuschussM2(
      this._kfwZuschuss,
      this.wohnflaeche
    );
    this._kfwZuschussProBau = this.updateKfwZuschussProBau(
      this._kfwZuschuss,
      this.anzahlWohnungen
    );
    this._kfwKredit = this.updateKfwKredit(
      this._foerdersumme,
      this._kfwZuschuss
    );
    this._kfwKreditM2 = this.updateKfwKreditM2(
      this._kfwKredit,
      this.wohnflaeche
    );
    this._kfwKreditProBau = this.updateKfwKreditProBau(
      this._kfwKredit,
      this.anzahlWohnungen
    );
    this._annuitaetKfW = this.updateAnnuitaetKfw(this._kfwKredit, this._afKfw);
    this._annuitaetBank = this.updateAnnuitaetBank(
      this._bankKredit,
      this._afBank
    );
    this._efKfW = this.updateEfKfw(
      this._kfwKredit,
      this._sollzinsKfw,
      this.kreditlaufzeit
    );
    this._efBank = this.updateEfBank(
      this._bankKredit,
      this.kalkRealzins,
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
      this._finanzierungskostenKfw,
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
      this._foerdersumme,
      this._bankKredit,
      this._afBank,
      this.kreditlaufzeit
    );
    this._gbEndfaelliges = this.updateGbEndfaelliges(
      this.kalkRealzins,
      this._foerdersumme,
      this._bankKredit,
      this.kreditlaufzeit
    );
    this._finKostenOhneKfw = this.updatefinKostenOhneKfw(
      this.bankDarlehen,
      this._gbEndfaelliges,
      this._gbAnnuitaet
    );
    this._finKostenohneKfwM2 = this.updateOhneKfwM2(
      this._finKostenOhneKfw,
      this.wohnflaeche
    );
    this._finKostenmitKfw = this.updatefinKostenMitKfw(
      this._finanzierungskostenKfw,
      this._finanzierungskostenBank
    );
    this._finKostenMitKfwM2 = this.updateMitKfwM2(
      this._finKostenmitKfw,
      this.wohnflaeche
    );

    this.outputSanierungSource.next(
      (this.outputSanierung = {
        // Projekt
        wohnflaeche: this.wohnflaeche,
        anzahlWohnungen: this.anzahlWohnungen,
        energiestandard: this.energiestandard,
        // Sanierung
        worstPerformingBuilding: this.worstPerformingBuilding,
        serielleSanierung: this.serielleSanierung,
        zustandBestand: this.zustandBestand,
        nachhaltigkeitskriterien: this._nachhaltigkeitskriterien,
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
        kfwKreditschwelleProWe: this._kfwKreditschwelleProWe,
        maxKfwKredit: this._maxKfwKredit,
        foerdersumme: this._foerdersumme,
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
        kfwKreditProBau: this._kfwKreditProBau,
        bankKredit: this._bankKredit,
        bankKreditM2: this._bankKreditM2,
        bankKreditProBau: this._bankKreditProBau,
        finanzierungskostenKfw: this._finanzierungskostenKfw,
        finanzierungskostenKfwM2: this._finanzierungskostenKfwM2,
        finanzierungskostenBank: this._finanzierungskostenBank,
        finanzierungskostenBankM2: this._finanzierungskostenBankM2,
        baukosten: this._baukosten,
        baukostenProBau: this._baukostenProBau,
        kfwZuschussPercentage: this._kfwZuschussPercentage,
        kfwZuschuss: this._kfwZuschuss,
        kfwZuschussM2: this._kfwZuschussM2,
        kfwZuschussProBau: this._kfwZuschussProBau,
        // Vergleichsrechnung
        finKostenOhneKfw: this._finKostenOhneKfw,
        finKostenOhneKfwM2: this._finKostenohneKfwM2,
        finKostenMitKfw: this._finKostenmitKfw,
        finKostenMitKfwM2: this._finKostenMitKfwM2,
      })
    );
    console.log(this.outputSanierung);
  }

  public reset() {
    // Project parameters
    this.wohnflaeche = this.formProjektService.wohnflaeche.value;
    this.anzahlWohnungen = this.formProjektService.anzahlWohnungen.value;
    this.energiestandard =
      this.formProjektService.energiestandard.options[0].value;
    this.worstPerformingBuilding =
      this.formProjektService.worstPerformingBuilding.value;
    this.serielleSanierung = this.formProjektService.serielleSanierung.value;
    this.zustandBestand =
      this.formProjektService.zustandBestand.options[0].value;
    // this.eeKlasse = this.formProjektService.eeKlasse.value;

    // Darlehen parameters
    this.kalkRealzins = this.formDarlehenService.kalkRealzins.value;
    this.kreditlaufzeit = this.formDarlehenService.kreditlaufzeit.value;
    this.kfWDarlehen = this.formDarlehenService.kfWDarlehen.options[0].value;
    this.bankDarlehen = this.formDarlehenService.bankDarlehen.options[0].value;

    this.update();
  }
}
