import { Injectable, signal } from '@angular/core';
import { FormEinzelmassnahmenService } from './form-einzelmassnahmen/form-einzelmassnahmen.service';
import { einzelmassnahmen } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class EinzelmassnahmenService {
  // C11 → Baupreisindex errechnet
  // C11 = ((C10 / C9) * 100)
  calculateBaupreisindexErrechnet(
    baupreisindexAktuell: number,
    baupreisindex2015: number
  ): number {
    return (baupreisindexAktuell / baupreisindex2015) * 100;
  }

  // Preisindex C13 → Gesamt
  // C13 = ((C11 / 100) * C12 * 100)
  calculateGesamtPreisindex(
    baupreisindexErrechnet: number,
    ortsfaktor: number
  ): number {
    return (baupreisindexErrechnet / 100) * ortsfaktor * 100;
  }

  // Vollkosten | Kosten [€/m² Bauteil]
  // G19 → 3WSV, Dreh/Kipp, Passivhaus EFH&MFH für F&Ft
  // DatenD10 & DatenE10
  // G20 → 3WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // DatenD11 & DatenE11
  // G21 → 2WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // DatenD12 & DatenE12
  calculateFensterKostenM2(
    fensterTyp: Fenster,
    baunebenkosten: number,
    fensterflaeche: number,
    gesamtPreisindex: number
  ) {
    const { SchaetzwertA, SchaetzwertB } =
      this.constants.fensterProperties[fensterTyp];
    const schaetzwertA = SchaetzwertA;
    const schaetzwertB = SchaetzwertB;
    const value =
      (1 + baunebenkosten) *
      ((schaetzwertA *
        Math.pow(fensterflaeche, schaetzwertB) *
        gesamtPreisindex) /
        100);
    return value;
  }

  // Vollkosten | Kosten [€]
  calculateFensterKosten(
    fensterKosten: number,
    gesamtFensterflaeche: number
  ): number {
    return fensterKosten * gesamtFensterflaeche;
  }
  // Energetisch bedingte Mehrkosten | Kosten [€/m² Bauteil]
  calculateFensterEnergetischBedingteMehrkosten(
    fensterKostenM2: number,
    fensterSowiesoKosten: number
  ): number {
    // Compute the intermediate value
    const value = fensterKostenM2 - fensterSowiesoKosten;
    return value;
  }

  // Vollkosten | Kosten [€]
  // H22 → Dachflächenfenster EFH pro Fenster
  // H23 → Dachflächenfenster MFH pro Fenster
  // H22 = (1 + C15) * DatenC15 * C13 / 100
  calculateDachflaechenfensterKosten(
    dachflaechenfensterTyp: Dachflaechenfenster,
    C15: number,
    C13: number
  ): number {
    const { SchaetzwertA } =
      this.constants.dachflaechenfensterProperties[dachflaechenfensterTyp];
    const schaetzwertA = SchaetzwertA;
    return ((1 + C15) * schaetzwertA * C13) / 100;
  }

  // Vollkosten | Kosten [€/m² Bauteil]
  // G24 → Haustür EFH
  // G25 → Haustür MFH
  calculateTuerKostenM2(tuerTyp: Tuer, C15: number, C13: number): number {
    const { SchaetzwertA } = this.constants.tuerProperties[tuerTyp];
    const schaetzwertA = SchaetzwertA;
    // G24 = (1 + C15) * DatenC19 * C13 / 100
    return ((1 + C15) * schaetzwertA * C13) / 100;
  }

  // Vollkosten | Kosten [€]
  // H24 → Haustür EFH
  // H25 → Haustür MFH
  calculateTuerKosten(C24: number, tuerKostenM2: number): number {
    // H24 = C24 * G24
    return C24 * tuerKostenM2;
  }

  calculateTuerEnergetischBedingteMehrkosten(tuerKostenM2: number) {
    return 0.33 * tuerKostenM2;
  }

  calculateTuerSowiesoKosten(
    tuerKostenM2: number,
    tuerEnergetischBedingteMehrkosten: number
  ): number {
    return tuerKostenM2 * tuerEnergetischBedingteMehrkosten;
  }

  // C32 → Äqu. Dämmstoffdicke WLG 035 [cm]
  // Äquivalente Dämmstoffdicke
  // C32 = C30 / C31 * 0.035
  calculateAequDaemmstoffdicke(daemmstoffdicke: number): number {
    return (daemmstoffdicke / this.constants.warrmeleitfaehigkeit) * 0.035;
  }

  // G29 → Vollkosten | Kosten [€/m² Bauteil]
  calculateWdvsKostenM2(C15: number, C32: number, C13: number): number {
    // G29 = (1 + C15) * (((Daten!B23 * $C$32) + Daten!C23)) * $C$13 / 100
    return (
      ((1 + C15) *
        (this.constants.wdvsProperties.Geruestkosten.SchaetzwertA * C32 +
          this.constants.wdvsProperties.Geruestkosten.SchaetzwertB) *
        C13) /
      100
    );
  }

  // H29 = G29 * $C$29
  calculateWdvsKosten(wdvsKostenM2: number, C29: number): number {
    return wdvsKostenM2 * C29;
  }

  // I29 = H29 - J29
  calculateWdvsSowiesoKosten(wdvsKosten: number, J29: number): number {
    return wdvsKosten - J29;
  }

  calculateWdvsEnergetischBedingteMehrkosten(
    C32: number,
    C13: number,
    C29: number
  ): number {
    // J29 = ((((Daten!B24 * $C$32) + Daten!C24)) * $C$13 / 100) * C29
    return (
      (((this.constants.wdvsProperties.EnergiebedingteMehrkosten.SchaetzwertA *
        C32 +
        this.constants.wdvsProperties.EnergiebedingteMehrkosten.SchaetzwertB) *
        C13) /
        100) *
      C29
    );
  }

  // G30 = (1 + C15) * ((Daten!B25 * $C$32) + Daten!C25) * $C$13 / 100
  calculateAussenwandKostenM2(C15: number, C32: number, C13: number): number {
    return (
      ((1 + C15) *
        (this.constants.aussenwandProperties.SchaetzwertA * C32 +
          this.constants.aussenwandProperties.SchaetzwertB) *
        C13) /
      100
    );
  }

  // H30 = G30 * $C$29
  calculateAussenwandKosten(aussenwandKostenM2: number, C29: number): number {
    return aussenwandKostenM2 * C29;
  }

  // Keller
  // Vollkosten | Kosten [€/m² Bauteil]
  // G31 → Keller, unterseitig, ohne Bekleidung
  calculateKellerKostenM2(
    kellerTyp: Keller,
    C15: number,
    C32: number,
    C13: number
  ): number {
    const { SchaetzwertA, SchaetzwertB } =
      this.constants.kellerProperties[kellerTyp];
    const schaetzwertA = SchaetzwertA;
    const schaetzwertB = SchaetzwertB;
    // G31 = (1 + C15) * (((Daten!B26 * $C$32) + Daten!C26)) * $C$13 / 100
    return ((1 + C15) * (schaetzwertA * C32 + schaetzwertB) * C13) / 100;
  }

  calculateKellerKosten(kellerKostenM2: number, C29: number): number {
    return kellerKostenM2 * C29;
  }

  calculateKellerSowiesoKosten(kellerKosten: number, J31: number): number {
    // I31 = H31 - J31
    return kellerKosten - J31;
  }

  calculateKellerEnergetischBedingteMehrkosten(
    kellerTyp: Keller,
    kellerKosten: number,
    C29: number,
    C32: number
  ) {
    if (
      kellerTyp === 'unterseitig ohne Bekleidung' ||
      kellerTyp === 'unterseitig mit Bekleidung'
    ) {
      return kellerKosten;
    } else {
      return 8.96 * C29 + 1.62 * C32 * C29;
    }
  }

  // Calculations
  // Sowieso-Kosten | Kosten [€/m² Bauteil]
  // I19 → 3WSV, Dreh/Kipp, Passivhaus EFH&MFH für F&Ft
  // I20 → 3WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // I21 → 2WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // I19 = I20 = I21 =G21
  // fensterSowiesoKosten = fensterKostenM('2WSV konventionell',baunebenkosten,fensterflaeche,gesamtPreisindex);

  constructor(private constants: einzelmassnahmen) {}
}
