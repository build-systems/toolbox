import { effect, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SanierungProjekt } from './sanierungprojekt';
import { sanierung } from '../../shared/constants';
import tableMehrfamilienhaeuser from './sanierung-mehrfamilienhaeuser.json';
import tableEinfamilienhaeuser from './sanierung-einfamilienhaeuser.json';
import { FormProjektSanierungService } from './form-projekt-sanierung/form-projekt-sanierung.service';
import { FormDarlehenSanierungService } from './form-darlehen-sanierung/form-darlehen-sanierung.service';
import { SharedService } from '../../shared/shared.service';

// Neubau and Sanierung are using RXJS instead of Signals
// Sorry about the mess :)
@Injectable({
  providedIn: 'root',
})
export class SanierungService {
  private sharedService = inject(SharedService);
  // Active form tab
  public currentTab = signal(1);
  public projectTitle = signal('Untitled');
  public debouncedProjectTitle = this.sharedService.debouncedSignal(
    this.projectTitle,
    600
  );
  public projectId = signal<number | undefined>(undefined);
  projectsSanierung = signal<any[]>([]);

  // Initial project parameters
  projektType: SanierungProjektType =
    this.formProjektService.projektType.options[0].value;
  userPriceDisabled: boolean = this.formProjektService.eigeneKosten.disabled;
  userPrice: number = this.formProjektService.eigeneKosten.value;
  wohnflaeche: number = this.formProjektService.wohnflaeche.value;
  anzahlWohnungen: number = this.formProjektService.anzahlWohnungen.value;
  energiestandard: EnergiestandardSanierung =
    this.formProjektService.energiestandard.options[0].value;
  _foerderbonus: Foerderbonus =
    this.formProjektService.foerderbonus.options[0].value;
  worstPerformingBuilding: boolean =
    this.formProjektService.worstPerformingBuilding.value;
  serielleSanierung: boolean = this.formProjektService.serielleSanierung.value;
  umfangModernisierung: UmfangModernisierung =
    this.formProjektService.umfangModernisierung.options[0].value;

  // Initial darlehen parameters
  zinssatzBank: number = this.formDarlehenService.zinssatzBank.value / 100; // Conersion from percentage to fraction multiplier
  kreditlaufzeit: number = this.formDarlehenService.kreditlaufzeit.value;
  kfwDarlehen: KfwDarlehen =
    this.formDarlehenService.kfWDarlehen.options[0].value;
  bankDarlehen: BankDarlehen =
    this.formDarlehenService.bankDarlehen.options[0].value;

  constructor(
    private constants: sanierung,
    private formProjektService: FormProjektSanierungService,
    private formDarlehenService: FormDarlehenSanierungService
  ) {
    effect(() => {
      this.debouncedProjectTitle();
      this.update();
    });

    this.formProjektService.projektForm.valueChanges.subscribe((value) => {
      this.projektType = value.projektType!;
      this.wohnflaeche = value.wohnflaecheRange!;
      this.anzahlWohnungen = value.anzahlWohnungenRange!;
      this.userPriceDisabled = !value.eigeneKostenToggle!;
      this.userPrice = value.eigeneKostenRange!;
      this.umfangModernisierung = value.umfangModernisierung!;
      this.worstPerformingBuilding = value.worstPerformingBuilding!;
      this.energiestandard = value.energiestandard!;
      this._foerderbonus = value.foerderbonus!;
      this.serielleSanierung = value.serielleSanierung!;
      this.update();
    });
    this.formDarlehenService.darlehenForm.valueChanges.subscribe((value) => {
      this.zinssatzBank = value.zinssatzBankRange! / 100; // Conersion from percentage to fraction multiplier
      this.kreditlaufzeit = value.kreditlaufzeitRange!;
      this.kfwDarlehen = value.kfWDarlehen!;
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
  updateEeBonus(foerderbonus: Foerderbonus): number {
    if (foerderbonus === 'EE') {
      return this.constants.eeBonusPossible;
    } else {
      return 0;
    }
  }

  // NH-Bonus [%]
  private _nhBonus = 0;
  updateNhBonus(foerderbonus: Foerderbonus): number {
    if (foerderbonus === 'NH') {
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
    umfangModernisierung: UmfangModernisierung
  ): number {
    // First check if the user chose to input their own price estimation
    // If not, then search in the table (JSON file)
    if (userPriceDisabled) {
      const desiredProperties = {
        Energiestandard: energiestandard,
        UmfangModernisierung: umfangModernisierung,
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
        var filteredData: any;
        if (this.projektType === 'Einfamilienhaus') {
          var filteredTableEin = tableEinfamilienhaeuser.filter((item) =>
            filterByProperties(item, desiredProperties)
          );
          filteredData = filteredTableEin;
        } else if (this.projektType === 'Mehrfamilienhaus') {
          var filteredTableMehr = tableMehrfamilienhaeuser.filter((item) =>
            filterByProperties(item, desiredProperties)
          );
          filteredData = filteredTableMehr;
        }
        var tableResult = filteredData[0].Min; // Considering only unique results from the filter
        return tableResult;
      } catch (error) {
        console.error(error);
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
  private _zinssatzKfw = 0;
  updateZinssatzKfw(kfWDarlehen: KfwDarlehen, nrKredit: number): number {
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
  updateKfwKreditschwelleProWe(foerderbonus: Foerderbonus): number {
    if (foerderbonus !== 'Keine') {
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
  updateBaukosten(gestehungskosten: number, wohnflaeche: number): number {
    return gestehungskosten * wohnflaeche;
  }

  private _baukostenProBau = 0;
  updateBaukostenProBau(baukosten: number, anzahlWohnungen: number) {
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
        (sollzinsKfw * Math.pow(1 + sollzinsKfw, kreditlaufzeit)) /
        (Math.pow(1 + sollzinsKfw, kreditlaufzeit) - 1)
      );
    }
  }

  // AF Bank [€]
  private _afBank = 0;
  updateAfBank(zinssatzBank: number, kreditlaufzeit: number): number {
    if (zinssatzBank === 0 || kreditlaufzeit === 0) {
      return 0;
    } else {
      return (
        (zinssatzBank * Math.pow(1 + zinssatzBank, kreditlaufzeit)) /
        (Math.pow(1 + zinssatzBank, kreditlaufzeit) - 1)
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
    const floorWpbSerSanBonus = Math.min(wpbBonus + serSanBonus, 0.2); // If you combine the bonus for the Worst Performing Building with the bonus for the serial renovation, then the two bonuses will be limited to a total of 20%
    return Math.min(
      tilgungszuschuss + eeBonus + nhBonus + floorWpbSerSanBonus,
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
    return kfwKredit * sollzinsKfw * kreditlaufzeit;
  }

  // EF B [€]
  private _efBank = 0;
  updateEfBank(
    bankKredit: number,
    zinssatzBank: number,
    kreditlaufzeit: number
  ): number {
    return zinssatzBank * bankKredit * kreditlaufzeit;
  }

  // Finanzierungskosten (KfW) [€]
  private _finanzierungskostenKfw = 0;
  updateFinanzierungskostenKfw(
    kfWDarlehen: KfwDarlehen,
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
    zinssatzBank: number,
    foerdersumme: number,
    bankKredit: number,
    kreditlaufzeit: number
  ): number {
    return zinssatzBank * (foerdersumme + bankKredit) * kreditlaufzeit;
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
  public outputSanierungSource = new BehaviorSubject<SanierungProjekt>(
    this.outputSanierung
  );
  currentOutputSanierung$ = this.outputSanierungSource.asObservable();

  public update() {
    this._tilgungszuschuss = this.updateTilgungszuschuss(this.energiestandard);
    this._eeBonus = this.updateEeBonus(this._foerderbonus);
    this._nhBonus = this.updateNhBonus(this._foerderbonus);
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
      this.umfangModernisierung
    );
    this._nrKredit = this.updateNrKredit(this.kreditlaufzeit);
    this._zinssatzKfw = this.updateZinssatzKfw(
      this.kfwDarlehen,
      this._nrKredit
    );
    this._kfwKreditschwelleProWe = this.updateKfwKreditschwelleProWe(
      this._foerderbonus
    );
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
    this._afKfw = this.updateAfKfW(this._zinssatzKfw, this.kreditlaufzeit);
    this._afBank = this.updateAfBank(this.zinssatzBank, this.kreditlaufzeit);
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
      this._zinssatzKfw,
      this.kreditlaufzeit
    );
    this._efBank = this.updateEfBank(
      this._bankKredit,
      this.zinssatzBank,
      this.kreditlaufzeit
    );
    this._finanzierungskostenKfw = this.updateFinanzierungskostenKfw(
      this.kfwDarlehen,
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
      this.zinssatzBank,
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
        title: this.projectTitle(),
        id: this.projectId(),
        projektType: this.projektType,
        userPriceDisabled: this.userPriceDisabled,
        userPrice: this.userPrice,
        // Projekt
        wohnflaeche: this.wohnflaeche,
        anzahlWohnungen: this.anzahlWohnungen,
        energiestandard: this.energiestandard,
        // Sanierung
        worstPerformingBuilding: this.worstPerformingBuilding,
        serielleSanierung: this.serielleSanierung,
        umfangModernisierung: this.umfangModernisierung,
        foerderbonus: this._foerderbonus,
        // Dalehen
        zinssatzBank: this.zinssatzBank,
        kreditlaufzeit: this.kreditlaufzeit,
        kfwDarlehen: this.kfwDarlehen,
        bankDarlehen: this.bankDarlehen,
        // Output
        tilgungszuschuss: this._tilgungszuschuss,
        eeBonus: this._eeBonus,
        nhBonus: this._nhBonus,
        wpbBonus: this._wpbBonus,
        serSanBonus: this._serSanBonus,
        gestehungskosten: this._gestehungskosten,
        nrKredit: this._nrKredit,
        zinssatzKfw: this._zinssatzKfw,
        kfwKreditschwelleProWe: this._kfwKreditschwelleProWe,
        maxKfwKredit: this._maxKfwKredit,
        foerdersumme: this._foerdersumme,
        afKfw: this._afKfw,
        afBank: this._afBank,
        annuitaetKfw: this._annuitaetKfW,
        annuitaetBank: this._annuitaetBank,
        efKfw: this._efKfW,
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
  }
}
