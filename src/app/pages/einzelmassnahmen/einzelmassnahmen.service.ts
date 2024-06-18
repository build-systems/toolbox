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

  // Fenster
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
    const { SchaetzwertA, SchaetzwertB } = this.constants.fenster[fensterTyp];
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
  // Sowieso-Kosten | Kosten [€/m² Bauteil]
  // I19 → 3WSV, Dreh/Kipp, Passivhaus EFH&MFH für F&Ft
  // I20 → 3WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // I21 → 2WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // I19 = I20 = I21 =G21
  // fensterSowiesoKosten = fensterKostenM('2WSV konventionell',baunebenkosten,fensterflaeche,gesamtPreisindex);
  calculateSowiesoKosten(
    baunebenkosten: number,
    fensterflaeche: number,
    gesamtPreisindex: number
  ): number {
    return this.calculateFensterKostenM2(
      '2WSV konventionell',
      baunebenkosten,
      fensterflaeche,
      gesamtPreisindex
    );
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
    HausTyp: Haus,
    C15: number,
    C13: number
  ): number {
    const { SchaetzwertA } = this.constants.dachflaechenfenster[HausTyp];
    const schaetzwertA = SchaetzwertA;
    return ((1 + C15) * schaetzwertA * C13) / 100;
  }

  // Vollkosten | Kosten [€/m² Bauteil]
  // G24 → Haustür EFH
  // G25 → Haustür MFH
  calculateTuerKostenM2(hausTyp: Haus, C15: number, C13: number): number {
    const { SchaetzwertA } = this.constants.tuer[hausTyp];
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
        (this.constants.wdvs.Geruestkosten.SchaetzwertA * C32 +
          this.constants.wdvs.Geruestkosten.SchaetzwertB) *
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
      (((this.constants.wdvs.EnergiebedingteMehrkosten.SchaetzwertA * C32 +
        this.constants.wdvs.EnergiebedingteMehrkosten.SchaetzwertB) *
        C13) /
        100) *
      C29
    );
  }

  // G30 = (1 + C15) * ((Daten!B25 * $C$32) + Daten!C25) * $C$13 / 100
  calculateAussenwandKostenM2(C15: number, C32: number, C13: number): number {
    return (
      ((1 + C15) *
        (this.constants.aussenwand.SchaetzwertA * C32 +
          this.constants.aussenwand.SchaetzwertB) *
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
    const { SchaetzwertA, SchaetzwertB } = this.constants.keller[kellerTyp];
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

  // Bodenplatte
  // G34 → Vollkosten | Kosten [€/m² Bauteil]
  // G34 = (1 + C15) * ((18 + 17 + 10) * 110.6 / (99.2 + 1.04 * C32)) * $C$13 / 100
  calculateBodenplatteKostenM2(C15: number, C32: number, C13: number): number {
    return (
      ((((1 + C15) * (18 + 17 + 10) * 110.6) / (99.2 + 1.04 * C32)) * C13) / 100
    );
  }
  // H34 → Vollkosten | Kosten [€]
  calculateBodenplatteKosten(bodenplatteKostenM2: number, C29: number): number {
    // H34 = G34 * $C$29
    return bodenplatteKostenM2 * C29;
  }
  // I34 → Sowieso-Kosten | Kosten [€]
  calculateBodenplatteSowiesoKosten(
    bodenplatteKosten: number,
    J34: number
  ): number {
    // I34 = H34 - J34
    return bodenplatteKosten - J34;
  }
  // J34 → Energetisch bedingte Mehrkosten | Kosten [€]
  // =H34

  // Innenwand
  // G35 → Vollkosten | Kosten [€/m² Bauteil]
  // G35 = (1 + C15) * (((Daten!B26 * $C$32) + Daten!C26)) * $C$13 / 100
  calculateInnenwandKostenM2(C15: number, C32: number, C13: number): number {
    return (
      ((1 + C15) *
        (this.constants.keller['unterseitig ohne Bekleidung'].SchaetzwertA *
          C32 +
          this.constants.keller['unterseitig ohne Bekleidung'].SchaetzwertB) *
        C13) /
      100
    );
  }
  // H35 → Vollkosten | Kosten [€]
  // H35 = G35 * $C$29
  calculateInnenwandKosten(innenwandKostenM2: number, C29: number): number {
    return innenwandKostenM2 * C29;
  }
  // I35 → Sowieso-Kosten | Kosten [€]
  calculateInnenwandSowiesoKosten(
    innenwandKosten: number,
    J35: number
  ): number {
    // I35 = H35 - J35
    return innenwandKosten - J35;
  }
  // 35 → Energetisch bedingte Mehrkosten | Kosten [€]
  // =H35

  // Oberste Geschossdecke
  // Vollkosten | Kosten [€/m² Bauteil]
  // G36 → Oberste Geschossdecke, begehbar
  calculateObersteGeschossdeckeKostenM2(
    obersteGeschossdeckeTyp: ObersteGeschossdecke,
    C15: number,
    C32: number,
    C13: number
  ): number {
    const { SchaetzwertA, SchaetzwertB } =
      this.constants.obersteGeschossdecke[obersteGeschossdeckeTyp];
    const schaetzwertA = SchaetzwertA;
    const schaetzwertB = SchaetzwertB;
    // G36 = (1 + C15) * (((Daten!B29 * $C$32) + Daten!C29)) * $C$13 / 100
    return ((1 + C15) * (schaetzwertA * C32 + schaetzwertB) * C13) / 100;
  }
  // Vollkosten | Kosten [€]
  // H36 → Oberste Geschossdecke, begehbar
  // H36 = G36 * $C$29
  calculateObersteGeschossdeckeKosten(
    obersteGeschossdeckeKostenM2: number,
    C29: number
  ): number {
    return obersteGeschossdeckeKostenM2 * C29;
  }
  // Sowieso-Kosten | Kosten [€]
  // I36 → Oberste Geschossdecke, begehbar
  // I36 = H36 - J36
  calculateObersteGeschossdeckeSowiesoKosten(
    obersteGeschossdeckeKosten: number,
    J36: number
  ): number {
    return obersteGeschossdeckeKosten - J36;
  }
  // Energetisch bedingte Mehrkosten | Kosten [€]
  // J36 → Oberste Geschossdecke, begehbar
  // =H36
  // J37 → Oberste Geschossdecke, nicht begehbar
  // =H37

  // Flachdach
  // Vollkosten | Kosten [€/m² Bauteil]
  // G38 → Flachdach ohne Lichtkuppeln
  // G38 = (1 + C15) * (((Daten!B31 * $C$32) + Daten!C31)) * $C$13 / 100
  calculateFlachdachKostenM2(
    hausTyp: Haus,
    flachdachTyp: Flachdach,
    C15: number,
    C32: number,
    C13: number
  ): number {
    let schaetzwertA: number;
    let schaetzwertB: number;
    if (flachdachTyp === 'ohne Lichtkuppeln') {
      const { SchaetzwertA, SchaetzwertB } =
        this.constants.flachdach[flachdachTyp];
      schaetzwertA = SchaetzwertA;
      schaetzwertB = SchaetzwertB;
    } else {
      const { SchaetzwertA, SchaetzwertB } =
        this.constants.flachdach[`${flachdachTyp} ${hausTyp}`];
      schaetzwertA = SchaetzwertA;
      schaetzwertB = SchaetzwertB;
    }
    return ((1 + C15) * (schaetzwertA * C32 + schaetzwertB) * C13) / 100;
  }
  // Vollkosten | Kosten [€]
  // H38 → Flachdach ohne Lichtkuppeln
  // H38 = G38 * $C$29
  calculateFlachdachKosten(flachdachKostenM2: number, C29: number): number {
    return flachdachKostenM2 * C29;
  }
  // Sowieso-Kosten | Kosten [€]
  // I38 → Flachdach ohne Lichtkuppeln
  // I38 = H38 - J38
  calculateFlachdachSowiesoKosten(flachdachKosten: number, J38: number) {
    return flachdachKosten - J38;
  }
  // Energetisch bedingte Mehrkosten | Kosten [€]
  // J38 → Flachdach ohne Lichtkuppeln
  // J38 = ((((Daten!B34 * $C$32) + Daten!C34)) * $C$13 / 100) * C29
  calculateFlachdachEnergetischBedingteMehrkosten(
    C32: number,
    C13: number,
    C29: number
  ): number {
    return (
      (((this.constants.flachdach['energiebedingte Mehrkosten'].SchaetzwertA *
        C32 +
        this.constants.flachdach['energiebedingte Mehrkosten'].SchaetzwertB) *
        C13) /
        100) *
      C29
    );
  }

  // Steildach
  // G41 → Vollkosten | Kosten [€/m² Bauteil]
  calculateSteildachKostenM2(C15: number, C32: number, C13: number): number {
    // G41 = (1 + C15) * (((Daten!B35 * $C$32) + Daten!C35)) * $C$13 / 100
    return (
      ((1 + C15) *
        (this.constants.steildach.Steildach.SchaetzwertA * C32 +
          this.constants.steildach.Steildach.SchaetzwertB) *
        C13) /
      100
    );
  }
  // H41 → Vollkosten | Kosten [€]
  calculateSteildachKosten(steildachKostenM2: number, C29: number): number {
    // H41 = G41 * $C$29
    return steildachKostenM2 * C29;
  }
  // I41 → Sowieso-Kosten | Kosten [€]
  // I41 = H41 - J41
  calculateSteildachSowiesoKosten(
    steildachKosten: number,
    J41: number
  ): number {
    return steildachKosten - J41;
  }
  // J41 → Energetisch bedingte Mehrkosten | Kosten [€]
  // J41 = ((((Daten!B36 * $C$32) + Daten!C36)) * $C$13 / 100) * C29
  calculateSteildachEnergetischBedingteMehrkosten(
    C32: number,
    C13: number,
    C29: number
  ): number {
    return (
      (((this.constants.steildach['energiebedingte Mehrkosten'].SchaetzwertA *
        C32 +
        this.constants.steildach['energiebedingte Mehrkosten'].SchaetzwertB) *
        C13) /
        100) *
      C29
    );
  }

  // Steildachgauben
  // Vollkosten | Kosten [€/m² Bauteil]
  // G42 Steildachgauben im EFH ohne Fenster
  // G42 = Daten!C37 * $C$13 / 100
  calculateSteildachgaubenKostenM2(hausTyp: Haus, C13: number): number {
    const { SchaetzwertB } = this.constants.steildachgauben[hausTyp];
    const schaetzwertB = SchaetzwertB;
    return (schaetzwertB * C13) / 100;
  }
  // Vollkosten | Kosten [€]
  // H42 Steildachgauben im EFH ohne Fenster
  calculateSteildachgaubenKosten(
    steildachgaubenKostenM2: number,
    C15: number,
    C42: number
  ): number {
    // H42 = (1 + C15) * $C$42 * G42
    return (1 + C15) * C42 * steildachgaubenKostenM2;
  }

  // Vorbaurollladen
  // Vollkosten | Kosten [€/m² Bauteil]
  // G44 → Vorbaurollladen, Kunststoff, Gurt
  // G44 = (1 + C15) * Daten!C39 * $C$13 / 100
  calculateVorbaurollladenKostenM2(
    vorbaurollladenTyp: Vorbaurollladen,
    C15: number,
    C13: number
  ): number {
    const { SchaetzwertB } = this.constants.vorbaurollladen[vorbaurollladenTyp];
    const schaetzwertB = SchaetzwertB;
    return ((1 + C15) * schaetzwertB * C13) / 100;
  }
  // Vollkosten | Kosten [€]
  // H44 → Vorbaurollladen, Kunststoff, Gurt
  // H44 = $C$44 * G44
  calculateVorbaurollladenKosten(
    vorbaurollladenKostenM2: number,
    C44: number
  ): number {
    return C44 * vorbaurollladenKostenM2;
  }
  // Sowieso-Kosten | Kosten [€]
  // I44 → Vorbaurollladen, Kunststoff, Gurt
  // =H44
  // I45 → Vorbaurollladen, Kunststoff, Elektro
  // =H45
  // I46 → Vorbaurollladen, Alu, Gurt
  // =H46
  // I47 → Vorbaurollladen, Alu, Elektro
  // =H47
  calculateVorbaurollladenSowiesoKosten(vorbaurollladenKosten: number): number {
    return vorbaurollladenKosten;
  }

  // nergetisch bedingte Mehrkosten | Kosten [€]
  // J44 → Vorbaurollladen, Kunststoff, Gurt
  // J44 = H44 - I44
  calculateVorbaurollladenEnergetischBedingteMehrkosten(
    vorbaurollladenKosten: number,
    vorbaurollladenSowiesoKosten: number
  ): number {
    return vorbaurollladenKosten - vorbaurollladenSowiesoKosten;
  }

  // Calculations

  constructor(private constants: einzelmassnahmen) {}
}
