import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputComponent } from '../output/output.component';
import { ParameterProjektComponent } from '../parameter-projekt/parameter-projekt.component';
import { ParameterSanierungComponent } from '../parameter-sanierung/parameter-sanierung.component';
import { ParameterDarlehenComponent } from '../parameter-darlehen/parameter-darlehen.component';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [CommonModule, OutputComponent, ParameterProjektComponent, ParameterSanierungComponent, ParameterDarlehenComponent],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class SanierungComponent {
  title = "Sanierung";

  // Project parameters
  wohnflaeche = 5000;
  anzahlWohnungen = 50;
  energiestandard = "EH 40";
  konstruktion = "Konventionell";
  zertifizierung = "Keine Zertifizierung";

  // Sanierung parameters
  worstPerformingBuilding = true;
  serielleSanierung = true;
  zustandBestand = "Unsaniert";
  eeKlasse = true;

  // Darlehen parameters
  kalkRealzins = 4;
  kreditlaufzeit = 20;
  kfWDarlehen = 'Annuitätendarlehen';
  bankDarlehen = 'Annuitätendarlehen';

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
  private updateTilgungszuschuss(){
    if (this.energiestandard === "EH 85"){
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
  private eeBonus (){
    if (this.eeKlasse === true){
      this._eeBonus = this._eeBonusPossible;
    } else {
      this._eeBonus = 0;
    }
  }

  // NH-Bonus [%]
  _nhBonus = 0;
  _nhBonusPossible = 5;
  private nhBonus(){
    if (this.zertifizierung !== "Keine Zertifizierung"){
      this._nhBonus = this._nhBonusPossible;
    } else {
      this._nhBonus = 0;
    }
  }

  // WPB-Bonus [%]
  _wpbBonus = 0;
  _wpbBonusPossible = 10;
  private wpbBonus(){
    if (this.worstPerformingBuilding === true && (this.energiestandard === "EH 70" || this.energiestandard === "EH 55" || this.energiestandard === "EH 40")) {
      this._wpbBonus = this._wpbBonusPossible;
    } else {
      this._wpbBonus = 0;
    }
  }

  // SerSan-Bonus [%]
  _serSanBonus = 0;
  _serSanBonusPossible = 15;
  private updateSerSanBonus(){
    if (this.serielleSanierung === true && (this.energiestandard === "EH 55" || this.energiestandard === "EH 40"))
      this._serSanBonus = this._serSanBonusPossible;
    else
      this._serSanBonus = 0
  }

  // #02
  // Gestehungskosten [€/m²]
  _gestehungskosten = 0;
  updateGestehungskosten(){
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
    } else if (this.kfWDarlehen === "Annuitätendarlehen") {
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
  private updateGesamtgestehungskosten(){
    this._gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  }

  // Fördersumme [€]
  _foerdersumme = this._maxKfwKredit;
  private updateFoerdersumme(){
    this._foerdersumme = Math.min(this._maxKfwKredit, this._gesamtgestehungskosten);
  }

  // Restsumme [€]
  _restsumme = 0;
  private updateRestsumme() {
    this._restsumme = Math.max(this._gesamtgestehungskosten - this._maxKfwKredit, 0);
  }

  // #03
  // 1. AF KFW [€]
  _afKfw = 0;
  private updateAfKfW(){
    if (this._sollzinsKfw === 0 || this.kreditlaufzeit === 0) {
      this._afKfw = 0;
    } else {
      this._afKfw = this._sollzinsKfw / 100 * Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) / (Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) - 1);
    }
  }

  // 2. AF B [€]
  _afB = 0;
  private updateAfB(){
    this._afB = ( this.kalkRealzins / 100 ) * Math.pow(( 1 + this.kalkRealzins / 100 ), this.kreditlaufzeit) / (Math.pow( 1 + this.kalkRealzins / 100, this.kreditlaufzeit ) - 1);
  }

  // 3. Zuschuss (KfW) [€]
  _zuschuss = 0;
  private updateZuschuss(){
    this._zuschuss = Math.min((this._tilgungszuschuss + this._eeBonus + this._nhBonus + this._wpbBonus + this._serSanBonus) / 100 * this._foerdersumme, ( 0.4 * this._foerdersumme ));
  }

  // 4. KfW-Kredit [€]
  _kfwKredit = 0;
  private updateKfwKredit(){
    this._kfwKredit = this._foerdersumme - this._zuschuss;
  }

  // 5. Bank-Kredit [€]
  _bankKredit = 0;
  private updateBankKredit(){
    this._bankKredit = this._restsumme;
  }

  // 6. Annuität KfW [€]
  _annuitaetKfW = 0;
  private updateAnnuitaetKfw(){
    this._annuitaetKfW = this._afKfw * this._kfwKredit;
  }

  // 7. Annuität B [€]
  _annuitaetB = 0;
  private updateAnnuitaetB(){
    this._annuitaetB = this._bankKredit * this._afB;
  }

  // 8. EF KFW [€]
  _efKfW = 0;
  private updateEfKfw(){
    this._efKfW = this._kfwKredit * this._sollzinsKfw / 100 * this.kreditlaufzeit;
  }

  // 9. EF B [€]
  _efB = 0;
  private updateEfB(){
    this._efB = this.kalkRealzins * this._restsumme / 100 * this.kreditlaufzeit;
  }

  // 10. Finanzierungskosten (KfW) [€]
  _finanzierungskostenKfw = 0;
  private updateFinanzierungskostenKfw(){
    if (this.kfWDarlehen === "Annuitätendarlehen") {
      this._finanzierungskostenKfw = this._annuitaetKfW * this.kreditlaufzeit - this._kfwKredit;
    } else if (this.kfWDarlehen === "Endfälliges Darlehen") {
      this._finanzierungskostenKfw = this._efKfW;
    } else {
      this._finanzierungskostenKfw = 0;
    }
  }

  // 11. Finazierungskosten (Finanzmarkt) [€]
  _finanzierungskostenMarkt = 0;
  private updateFinanzierungskostenMarkt(){
    if (this.bankDarlehen === "Annuitätendarlehen") {
      this._finanzierungskostenMarkt = this._annuitaetB * this.kreditlaufzeit - this._bankKredit;
    } else if (this.bankDarlehen === "Endfälliges Darlehen") {
      this._finanzierungskostenMarkt = this._efB;
    } else {
      this._finanzierungskostenMarkt = 0;
    }
  }

  // 12. Investitionskosten [€]
  _investitionkosten = 0;
  private updateInvestitionkosten(){
    this._investitionkosten = this.wohnflaeche * this._gestehungskosten;
  }

  // #05
  // GB: Annuität [€]
  _gbAnnuitaet = 0;
  private updateGbAnnuitaet(){
    this._gbAnnuitaet = (this._foerdersumme + this._restsumme) * this._afB * this.kreditlaufzeit - (this._foerdersumme + this._restsumme);
  }

  // GB: EFD [€]
  _gbEfd = 0;
  private updateGbEfd(){
    this._gbEfd = this.kalkRealzins * (this._foerdersumme + this._restsumme) / 100 * this.kreditlaufzeit;
  }

  // Option 1: ohne KfW [€]
  _ohneKfw = 0;
  private updateOhneKfw(){
    if (this.bankDarlehen === "Endfälliges Darlehen"){
      this._ohneKfw = this._gbEfd;
    } else {
      this._ohneKfw = this._gbAnnuitaet;
    }
  }
  
  // Option 2: mit KfW [€]
  _mitKfw = 0;
  private updateMitKfw(){
    this._mitKfw = this._finanzierungskostenKfw + this._finanzierungskostenMarkt;
  }

  constructor(){
    this.update();
  }

  update(){
    this.updateTilgungszuschuss();
    this.eeBonus();
    this.nhBonus();
    this.wpbBonus();
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
  }

  onFormProjektChanged(values: any) {
    // Handle the updated form values here
    console.log('Updated form values:', values);
    this.wohnflaeche = values["wohnflaeche"];
    this.anzahlWohnungen = values["anzahlWohnungen"];
    this.energiestandard = values["energiestandard"];
    this.konstruktion = values["konstruktion"];
    this.zertifizierung = values["zertifizierung"];
    this.update();
  }

  onFormSanierungChanged(values: any) {
    console.log('Updated form values:', values);
    this.worstPerformingBuilding = values["worstPerformingBuilding"];
    this.serielleSanierung = values["serielleSanierung"];
    this.zustandBestand = values["zustandBestand"];
    this.eeKlasse = values["eeKlasse"];

    this.update();
  }

  onFormDarlehenChanged(values: any) {
    console.log('Updated form values:', values);
    this.kalkRealzins = values['kalkRealzins'];
    this.kreditlaufzeit = values['kreditlaufzeit'];
    this.kfWDarlehen = values["kfWDarlehen"];
    this.bankDarlehen = values["bankDarlehen"];
    this.update();
  }


}
