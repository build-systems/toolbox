import { Injectable, effect, signal } from '@angular/core';
import { FormEinzelmassnahmenService } from './form-einzelmassnahmen/form-einzelmassnahmen.service';
import { einzelmassnahmen } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class EinzelmassnahmenService {
  // baupreisindexErrechnet: number;
  // C11 → Baupreisindex errechnet
  // C11 = ((C10 / C9) * 100)
  calculateBaupreisindexErrechnet(
    baupreisindexAktuell: number,
    baupreisindex2015: number
  ): number {
    return (baupreisindexAktuell / baupreisindex2015) * 100;
  }

  // gesamtPreisindex: number;
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
  fensterKostenM2: number = 0;
  calculateFensterKostenM2(
    fensterTyp: Fenster,
    fensterflaeche: number,
    gesamtPreisindex: number
  ) {
    const { SchaetzwertA, SchaetzwertB } = this.constants.fenster[fensterTyp];
    const schaetzwertA = SchaetzwertA;
    const schaetzwertB = SchaetzwertB;
    const value =
      (1 + this.constants.baunebenkosten) *
      ((schaetzwertA *
        Math.pow(fensterflaeche, schaetzwertB) *
        gesamtPreisindex) /
        100);
    return value;
  }

  // fensterKosten: number;
  // Vollkosten | Kosten [€]
  private calculateFensterKosten(
    fensterKostenM2: number,
    gesamtFensterflaeche: number
  ): number {
    return fensterKostenM2 * gesamtFensterflaeche;
  }
  // Sowieso-Kosten | Kosten [€/m² Bauteil]
  // I19 → 3WSV, Dreh/Kipp, Passivhaus EFH&MFH für F&Ft
  // I20 → 3WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // I21 → 2WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // I19 = I20 = I21 =G21
  // fensterSowiesoKosten = fensterKostenM('2WSV konventionell',baunebenkosten,fensterflaeche,gesamtPreisindex);

  // fensterSowiesoKosten: number;
  private calculateFensterSowiesoKosten(
    fensterflaeche: number,
    gesamtPreisindex: number
  ): number {
    return this.calculateFensterKostenM2(
      '2WSV konventionell',
      fensterflaeche,
      gesamtPreisindex
    );
  }

  // Energetisch bedingte Mehrkosten | Kosten [€/m² Bauteil]
  // fensterEnergetischBedingteMehrkosten: number;
  private calculateFensterEnergetischBedingteMehrkosten(
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
  // dachflaechenfensterKosten: number;
  private calculateDachflaechenfensterKosten(
    hausTyp: Haus,
    gesamtPreisindex: number
  ): number {
    const { SchaetzwertA } = this.constants.dachflaechenfenster[hausTyp];
    const schaetzwertA = SchaetzwertA;
    return (
      ((1 + this.constants.baunebenkosten) * schaetzwertA * gesamtPreisindex) /
      100
    );
  }

  // Vollkosten | Kosten [€/m² Bauteil]
  // G24 → Haustür EFH
  // G25 → Haustür MFH
  tuerKostenM2 = signal<number>(0);
  private calculateTuerKostenM2(
    hausTyp: Haus,
    gesamtPreisindex: number
  ): number {
    const { SchaetzwertA } = this.constants.tuer[hausTyp];
    const schaetzwertA = SchaetzwertA;
    // G24 = (1 + C15) * DatenC19 * C13 / 100
    return (
      ((1 + this.constants.baunebenkosten) * schaetzwertA * gesamtPreisindex) /
      100
    );
  }

  // Vollkosten | Kosten [€]
  // H24 → Haustür EFH
  // H25 → Haustür MFH
  // tuerKosten: number;
  private calculateTuerKosten(
    tuerflaeche: number,
    tuerKostenM2: number
  ): number {
    // H24 = C24 * G24
    return tuerflaeche * tuerKostenM2;
  }

  // tuerEnergetischBedingteMehrkosten: number;
  private calculateTuerEnergetischBedingteMehrkosten(tuerKostenM2: number) {
    return 0.33 * tuerKostenM2;
  }

  // tuerSowiesoKosten: number;
  private calculateTuerSowiesoKosten(
    tuerKostenM2: number,
    tuerEnergetischBedingteMehrkosten: number
  ): number {
    return tuerKostenM2 * tuerEnergetischBedingteMehrkosten;
  }

  // C32 → Äqu. Dämmstoffdicke WLG 035 [cm]
  // Äquivalente Dämmstoffdicke
  // C32 = C30 / C31 * 0.035
  // aequDaemmstoffdicke: number;
  private calculateAequDaemmstoffdicke(daemmstoffdicke: number): number {
    return (daemmstoffdicke / this.constants.warrmeleitfaehigkeit) * 0.035;
  }

  // G29 → Vollkosten | Kosten [€/m² Bauteil]
  // wdvsKostenM2: number;
  private calculateWdvsKostenM2(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    // G29 = (1 + C15) * (((Daten!B23 * $C$32) + Daten!C23)) * $C$13 / 100
    return (
      ((1 + this.constants.baunebenkosten) *
        (this.constants.wdvs.Geruestkosten.SchaetzwertA * aequDaemmstoffdicke +
          this.constants.wdvs.Geruestkosten.SchaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }

  // H29 = G29 * $C$29
  // wdvsKosten: number;
  private calculateWdvsKosten(
    wdvsKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return wdvsKostenM2 * gedaemmteflaeche;
  }

  // I29 = H29 - J29
  // wdvsSowiesoKosten: number;
  private calculateWdvsSowiesoKosten(
    wdvsKosten: number,
    wdvsEnergetischBedingteMehrkosten: number
  ): number {
    return wdvsKosten - wdvsEnergetischBedingteMehrkosten;
  }

  // wdvsEnergetischBedingteMehrkosten: number;
  private calculateWdvsEnergetischBedingteMehrkosten(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number,
    gedaemmteflaeche: number
  ): number {
    // J29 = ((((Daten!B24 * $C$32) + Daten!C24)) * $C$13 / 100) * C29
    return (
      (((this.constants.wdvs.EnergiebedingteMehrkosten.SchaetzwertA *
        aequDaemmstoffdicke +
        this.constants.wdvs.EnergiebedingteMehrkosten.SchaetzwertB) *
        gesamtPreisindex) /
        100) *
      gedaemmteflaeche
    );
  }

  // G30 = (1 + C15) * ((Daten!B25 * $C$32) + Daten!C25) * $C$13 / 100
  // aussenwandKostenM2: number;
  private calculateAussenwandKostenM2(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    return (
      ((1 + this.constants.baunebenkosten) *
        (this.constants.aussenwand.SchaetzwertA * aequDaemmstoffdicke +
          this.constants.aussenwand.SchaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }

  // H30 = G30 * $C$29
  // aussenwandKosten: number;
  private calculateAussenwandKosten(
    aussenwandKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return aussenwandKostenM2 * gedaemmteflaeche;
  }

  // Keller
  // Vollkosten | Kosten [€/m² Bauteil]
  // G31 → Keller, unterseitig, ohne Bekleidung
  // kellerKostenM2: number;
  private calculateKellerKostenM2(
    kellerTyp: Keller,
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    const { SchaetzwertA, SchaetzwertB } = this.constants.keller[kellerTyp];
    const schaetzwertA = SchaetzwertA;
    const schaetzwertB = SchaetzwertB;
    // G31 = (1 + C15) * (((Daten!B26 * $C$32) + Daten!C26)) * $C$13 / 100
    return (
      ((1 + this.constants.baunebenkosten) *
        (schaetzwertA * aequDaemmstoffdicke + schaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }

  // kellerKosten: number;
  private calculateKellerKosten(
    kellerKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return kellerKostenM2 * gedaemmteflaeche;
  }

  // kellerSowiesoKosten: number;
  private calculateKellerSowiesoKosten(
    kellerKosten: number,
    kellerEnergetischBedingteMehrkosten: number
  ): number {
    // I31 = H31 - J31
    return kellerKosten - kellerEnergetischBedingteMehrkosten;
  }

  // J31
  // kellerEnergetischBedingteMehrkosten: number;
  private calculateKellerEnergetischBedingteMehrkosten(
    kellerTyp: Keller,
    kellerKosten: number,
    gedaemmteflaeche: number,
    aequDaemmstoffdicke: number
  ) {
    if (
      kellerTyp === 'unterseitig ohne Bekleidung' ||
      kellerTyp === 'unterseitig mit Bekleidung'
    ) {
      return kellerKosten;
    } else {
      return (
        8.96 * gedaemmteflaeche + 1.62 * aequDaemmstoffdicke * gedaemmteflaeche
      );
    }
  }

  // Bodenplatte
  // G34 → Vollkosten | Kosten [€/m² Bauteil]
  // G34 = (1 + C15) * ((18 + 17 + 10) * 110.6 / (99.2 + 1.04 * C32)) * $C$13 / 100
  // bodenplatteKostenM2: number;
  private calculateBodenplatteKostenM2(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    return (
      ((((1 + this.constants.baunebenkosten) * (18 + 17 + 10) * 110.6) /
        (99.2 + 1.04 * aequDaemmstoffdicke)) *
        gesamtPreisindex) /
      100
    );
  }
  // H34 → Vollkosten | Kosten [€]
  // bodenplatteKosten: number;
  private calculateBodenplatteKosten(
    bodenplatteKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    // H34 = G34 * $C$29
    return bodenplatteKostenM2 * gedaemmteflaeche;
  }
  // I34 → Sowieso-Kosten | Kosten [€]
  // bodenplatteSowiesoKosten: number;
  private calculateBodenplatteSowiesoKosten(
    bodenplatteKosten: number,
    bodenplatteEnergetischBedingteMehrkosten: number
  ): number {
    // I34 = H34 - J34
    return bodenplatteKosten - bodenplatteEnergetischBedingteMehrkosten;
  }
  // J34 → Energetisch bedingte Mehrkosten | Kosten [€]
  // =H34
  // bodenplatteEnergetischBedingteMehrkosten: number;
  private calculateBodenplatteEnergetischBedingteMehrkosten(
    bodenplatteKosten: number
  ) {
    return bodenplatteKosten;
  }

  // Innenwand
  // G35 → Vollkosten | Kosten [€/m² Bauteil]
  // G35 = (1 + C15) * (((Daten!B26 * $C$32) + Daten!C26)) * $C$13 / 100
  // innenwandKostenM2: number;
  private calculateInnenwandKostenM2(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    return (
      ((1 + this.constants.baunebenkosten) *
        (this.constants.keller['unterseitig ohne Bekleidung'].SchaetzwertA *
          aequDaemmstoffdicke +
          this.constants.keller['unterseitig ohne Bekleidung'].SchaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }
  // H35 → Vollkosten | Kosten [€]
  // H35 = G35 * $C$29
  // innenwandKosten: number;
  private calculateInnenwandKosten(
    innenwandKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return innenwandKostenM2 * gedaemmteflaeche;
  }
  // I35 → Sowieso-Kosten | Kosten [€]
  // innenwandSowiesoKosten: number;
  private calculateInnenwandSowiesoKosten(
    innenwandKosten: number,
    innenwandEnergetischBedingteMehrkosten: number
  ): number {
    // I35 = H35 - J35
    return innenwandKosten - innenwandEnergetischBedingteMehrkosten;
  }
  // J35 → Energetisch bedingte Mehrkosten | Kosten [€]
  // =H35
  // innenwandEnergetischBedingteMehrkosten: number;
  private calculateInnenwandEnergetischBedingteMehrkosten(
    innenwandKosten: number
  ) {
    return innenwandKosten;
  }

  // Oberste Geschossdecke
  // Vollkosten | Kosten [€/m² Bauteil]
  // G36 → Oberste Geschossdecke, begehbar
  // obersteGeschossdeckeKostenM2: number;
  private calculateObersteGeschossdeckeKostenM2(
    obersteGeschossdeckeTyp: ObersteGeschossdecke,
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    const { SchaetzwertA, SchaetzwertB } =
      this.constants.obersteGeschossdecke[obersteGeschossdeckeTyp];
    const schaetzwertA = SchaetzwertA;
    const schaetzwertB = SchaetzwertB;
    // G36 = (1 + C15) * (((Daten!B29 * $C$32) + Daten!C29)) * $C$13 / 100
    return (
      ((1 + this.constants.baunebenkosten) *
        (schaetzwertA * aequDaemmstoffdicke + schaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }
  // Vollkosten | Kosten [€]
  // H36 → Oberste Geschossdecke, begehbar
  // H36 = G36 * $C$29
  // obersteGeschossdeckeKosten: number;
  private calculateObersteGeschossdeckeKosten(
    obersteGeschossdeckeKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return obersteGeschossdeckeKostenM2 * gedaemmteflaeche;
  }
  // Sowieso-Kosten | Kosten [€]
  // I36 → Oberste Geschossdecke, begehbar
  // I36 = H36 - J36
  // obersteGeschossdeckeSowiesoKosten: number;
  private calculateObersteGeschossdeckeSowiesoKosten(
    obersteGeschossdeckeKosten: number,
    obersteGeschossdeckeEnergetischBedingteMehrkosten: number
  ): number {
    return (
      obersteGeschossdeckeKosten -
      obersteGeschossdeckeEnergetischBedingteMehrkosten
    );
  }
  // Energetisch bedingte Mehrkosten | Kosten [€]
  // J36 → Oberste Geschossdecke, begehbar
  // =H36
  // J37 → Oberste Geschossdecke, nicht begehbar
  // =H37
  // obersteGeschossdeckeEnergetischBedingteMehrkosten: number;
  private calculateObersteGeschossdeckeEnergetischBedingteMehrkosten(
    obersteGeschossdeckeKosten: number
  ) {
    return obersteGeschossdeckeKosten;
  }

  // Flachdach
  // Vollkosten | Kosten [€/m² Bauteil]
  // G38 → Flachdach ohne Lichtkuppeln
  // G38 = (1 + C15) * (((Daten!B31 * $C$32) + Daten!C31)) * $C$13 / 100
  // flachdachKostenM2: number;
  private calculateFlachdachKostenM2(
    hausTyp: Haus,
    flachdachTyp: Flachdach,
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
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
    return (
      ((1 + this.constants.baunebenkosten) *
        (schaetzwertA * aequDaemmstoffdicke + schaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }
  // Vollkosten | Kosten [€]
  // H38 → Flachdach ohne Lichtkuppeln
  // H38 = G38 * $C$29
  // flachdachKosten: number;
  private calculateFlachdachKosten(
    flachdachKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return flachdachKostenM2 * gedaemmteflaeche;
  }
  // Sowieso-Kosten | Kosten [€]
  // I38 → Flachdach ohne Lichtkuppeln
  // I38 = H38 - J38
  // flachdachSowiesoKosten: number;
  private calculateFlachdachSowiesoKosten(
    flachdachKosten: number,
    flachdachEnergetischBedingteMehrkosten: number
  ) {
    return flachdachKosten - flachdachEnergetischBedingteMehrkosten;
  }
  // Energetisch bedingte Mehrkosten | Kosten [€]
  // J38 → Flachdach ohne Lichtkuppeln
  // J38 = ((((Daten!B34 * $C$32) + Daten!C34)) * $C$13 / 100) * C29
  // flachdachEnergetischBedingteMehrkosten: number;
  private calculateFlachdachEnergetischBedingteMehrkosten(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number,
    gedaemmteflaeche: number
  ): number {
    return (
      (((this.constants.flachdach['energiebedingte Mehrkosten'].SchaetzwertA *
        aequDaemmstoffdicke +
        this.constants.flachdach['energiebedingte Mehrkosten'].SchaetzwertB) *
        gesamtPreisindex) /
        100) *
      gedaemmteflaeche
    );
  }

  // Steildach
  // G41 → Vollkosten | Kosten [€/m² Bauteil]
  // steildachKostenM2: number;
  private calculateSteildachKostenM2(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    // G41 = (1 + C15) * (((Daten!B35 * $C$32) + Daten!C35)) * $C$13 / 100
    return (
      ((1 + this.constants.baunebenkosten) *
        (this.constants.steildach.Steildach.SchaetzwertA * aequDaemmstoffdicke +
          this.constants.steildach.Steildach.SchaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }
  // H41 → Vollkosten | Kosten [€]
  // steildachKosten: number;
  private calculateSteildachKosten(
    steildachKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    // H41 = G41 * $C$29
    return steildachKostenM2 * gedaemmteflaeche;
  }
  // I41 → Sowieso-Kosten | Kosten [€]
  // I41 = H41 - J41
  // steildachSowiesoKosten: number;
  private calculateSteildachSowiesoKosten(
    steildachKosten: number,
    steildachEnergetischBedingteMehrkosten: number
  ): number {
    return steildachKosten - steildachEnergetischBedingteMehrkosten;
  }
  // J41 → Energetisch bedingte Mehrkosten | Kosten [€]
  // J41 = ((((Daten!B36 * $C$32) + Daten!C36)) * $C$13 / 100) * C29
  // steildachEnergetischBedingteMehrkosten: number;
  private calculateSteildachEnergetischBedingteMehrkosten(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number,
    gedaemmteflaeche: number
  ): number {
    return (
      (((this.constants.steildach['energiebedingte Mehrkosten'].SchaetzwertA *
        aequDaemmstoffdicke +
        this.constants.steildach['energiebedingte Mehrkosten'].SchaetzwertB) *
        gesamtPreisindex) /
        100) *
      gedaemmteflaeche
    );
  }

  // Steildachgauben
  // Vollkosten | Kosten [€/m² Bauteil]
  // G42 Steildachgauben im EFH ohne Fenster
  // G42 = Daten!C37 * $C$13 / 100
  // steildachgaubenKostenM2: number;
  private calculateSteildachgaubenKostenM2(
    hausTyp: Haus,
    gesamtPreisindex: number
  ): number {
    const { SchaetzwertB } = this.constants.steildachgauben[hausTyp];
    const schaetzwertB = SchaetzwertB;
    return (schaetzwertB * gesamtPreisindex) / 100;
  }
  // Vollkosten | Kosten [€]
  // H42 Steildachgauben im EFH ohne Fenster
  // steildachgaubenKosten: number;
  private calculateSteildachgaubenKosten(
    steildachgaubenKostenM2: number,
    gaubeflaeche: number
  ): number {
    // H42 = (1 + C15) * $C$42 * G42
    return (
      (1 + this.constants.baunebenkosten) *
      gaubeflaeche *
      steildachgaubenKostenM2
    );
  }

  // Vorbaurollladen
  // Vollkosten | Kosten [€/m² Bauteil]
  // G44 → Vorbaurollladen, Kunststoff, Gurt
  // G44 = (1 + C15) * Daten!C39 * $C$13 / 100
  // vorbaurollladenKostenM2: number;
  private calculateVorbaurollladenKostenM2(
    vorbaurollladenTyp: Vorbaurollladen,
    gesamtPreisindex: number
  ): number {
    const { SchaetzwertB } = this.constants.vorbaurollladen[vorbaurollladenTyp];
    const schaetzwertB = SchaetzwertB;
    return (
      ((1 + this.constants.baunebenkosten) * schaetzwertB * gesamtPreisindex) /
      100
    );
  }
  // Vollkosten | Kosten [€]
  // H44 → Vorbaurollladen, Kunststoff, Gurt
  // H44 = $C$44 * G44
  // vorbaurollladenKosten: number;
  private calculateVorbaurollladenKosten(
    vorbaurollladenKostenM2: number,
    rollladenflaeche: number
  ): number {
    return rollladenflaeche * vorbaurollladenKostenM2;
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
  // vorbaurollladenSowiesoKosten: number;
  private calculateVorbaurollladenSowiesoKosten(
    vorbaurollladenKosten: number
  ): number {
    return vorbaurollladenKosten;
  }

  // nergetisch bedingte Mehrkosten | Kosten [€]
  // J44 → Vorbaurollladen, Kunststoff, Gurt
  // J44 = H44 - I44
  // vorbaurollladenEnergetischBedingteMehrkosten: number;
  private calculateVorbaurollladenEnergetischBedingteMehrkosten(
    vorbaurollladenKosten: number,
    vorbaurollladenSowiesoKosten: number
  ): number {
    return vorbaurollladenKosten - vorbaurollladenSowiesoKosten;
  }

  test: number = 0;

  // Calculations
  constructor(
    private constants: einzelmassnahmen,
    private formService: FormEinzelmassnahmenService
  ) {
    effect(() => {
      this.test = formService.fensterflaecheValue();
    });

    // this.fensterKosten = this.calculateFensterKosten(
    //   this.fensterKostenM2,
    //   this.formService.gesamtFensterflaecheValue()
    // );

    // this.fensterSowiesoKosten = this.calculateFensterSowiesoKosten(
    //   this.formService.fensterflaecheValue(),
    //   this.gesamtPreisindex
    // );

    // this.fensterEnergetischBedingteMehrkosten =
    //   this.calculateFensterEnergetischBedingteMehrkosten(
    //     this.fensterKostenM2,
    //     this.fensterSowiesoKosten
    //   );

    // this.dachflaechenfensterKosten = this.calculateDachflaechenfensterKosten(
    //   this.formService.hausSelected(),
    //   this.gesamtPreisindex
    // );

    // this.tuerKostenM2.set(
    //   this.calculateTuerKostenM2(
    //     this.formService.hausSelected(),
    //     this.gesamtPreisindex
    //   )
    // );

    // this.tuerKosten = this.calculateTuerKosten(
    //   this.formService.tuerflaecheValue(),
    //   this.tuerKostenM2()
    // );

    // this.tuerEnergetischBedingteMehrkosten =
    //   this.calculateTuerEnergetischBedingteMehrkosten(this.tuerKostenM2());

    // this.tuerSowiesoKosten = this.calculateTuerSowiesoKosten(
    //   this.tuerKostenM2(),
    //   this.tuerEnergetischBedingteMehrkosten
    // );

    // this.aequDaemmstoffdicke = this.calculateAequDaemmstoffdicke(
    //   this.formService.daemmstoffdickeValue()
    // );

    // this.wdvsKostenM2 = this.calculateWdvsKostenM2(
    //   this.aequDaemmstoffdicke,
    //   this.gesamtPreisindex
    // );

    // this.wdvsKosten = this.calculateWdvsKosten(
    //   this.wdvsKostenM2,
    //   this.formService.gedaemmteflaecheValue()
    // );

    // this.wdvsEnergetischBedingteMehrkosten =
    //   this.calculateWdvsEnergetischBedingteMehrkosten(
    //     this.aequDaemmstoffdicke,
    //     this.gesamtPreisindex,
    //     this.formService.gedaemmteflaecheValue()
    //   );

    // this.wdvsSowiesoKosten = this.calculateWdvsSowiesoKosten(
    //   this.wdvsKosten,
    //   this.wdvsEnergetischBedingteMehrkosten
    // );

    // this.aussenwandKostenM2 = this.calculateAussenwandKostenM2(
    //   this.aequDaemmstoffdicke,
    //   this.gesamtPreisindex
    // );

    // this.aussenwandKosten = this.calculateAussenwandKosten(
    //   this.aussenwandKostenM2,
    //   this.formService.gedaemmteflaecheValue()
    // );

    // this.kellerKostenM2 = this.calculateKellerKostenM2(
    //   this.formService.kellerSelected(),
    //   this.aequDaemmstoffdicke,
    //   this.gesamtPreisindex
    // );

    // this.kellerKosten = this.calculateKellerKosten(
    //   this.kellerKostenM2,
    //   this.formService.gedaemmteflaecheValue()
    // );

    // this.kellerEnergetischBedingteMehrkosten =
    //   this.calculateKellerEnergetischBedingteMehrkosten(
    //     this.formService.kellerSelected(),
    //     this.kellerKosten,
    //     this.formService.gedaemmteflaecheValue(),
    //     this.aequDaemmstoffdicke
    //   );

    // this.kellerSowiesoKosten = this.calculateKellerSowiesoKosten(
    //   this.kellerKosten,
    //   this.kellerEnergetischBedingteMehrkosten
    // );

    // this.bodenplatteKostenM2 = this.calculateBodenplatteKostenM2(
    //   this.aequDaemmstoffdicke,
    //   this.gesamtPreisindex
    // );

    // this.bodenplatteKosten = this.calculateBodenplatteKosten(
    //   this.bodenplatteKostenM2,
    //   this.formService.gedaemmteflaecheValue()
    // );

    // this.bodenplatteEnergetischBedingteMehrkosten =
    //   this.calculateBodenplatteEnergetischBedingteMehrkosten(
    //     this.bodenplatteKosten
    //   );

    // this.bodenplatteSowiesoKosten = this.calculateBodenplatteSowiesoKosten(
    //   this.bodenplatteKosten,
    //   this.bodenplatteEnergetischBedingteMehrkosten
    // );

    // this.innenwandKostenM2 = this.calculateInnenwandKostenM2(
    //   this.aequDaemmstoffdicke,
    //   this.gesamtPreisindex
    // );

    // this.innenwandKosten = this.calculateInnenwandKosten(
    //   this.innenwandKostenM2,
    //   this.formService.gedaemmteflaecheValue()
    // );

    // this.innenwandEnergetischBedingteMehrkosten =
    //   this.calculateInnenwandEnergetischBedingteMehrkosten(
    //     this.innenwandKosten
    //   );

    // this.innenwandSowiesoKosten = this.calculateInnenwandSowiesoKosten(
    //   this.innenwandKosten,
    //   this.innenwandEnergetischBedingteMehrkosten
    // );

    // this.obersteGeschossdeckeKostenM2 =
    //   this.calculateObersteGeschossdeckeKostenM2(
    //     this.formService.obersteGeschossdeckeSelected(),
    //     this.aequDaemmstoffdicke,
    //     this.gesamtPreisindex
    //   );

    // this.obersteGeschossdeckeKosten = this.calculateObersteGeschossdeckeKosten(
    //   this.obersteGeschossdeckeKostenM2,
    //   this.formService.gedaemmteflaecheValue()
    // );

    // this.obersteGeschossdeckeEnergetischBedingteMehrkosten =
    //   this.calculateObersteGeschossdeckeEnergetischBedingteMehrkosten(
    //     this.obersteGeschossdeckeKosten
    //   );

    // this.obersteGeschossdeckeSowiesoKosten =
    //   this.calculateObersteGeschossdeckeSowiesoKosten(
    //     this.obersteGeschossdeckeKosten,
    //     this.obersteGeschossdeckeEnergetischBedingteMehrkosten
    //   );

    // this.flachdachKostenM2 = this.calculateFlachdachKostenM2(
    //   this.formService.hausSelected(),
    //   this.formService.flachdachSelected(),
    //   this.aequDaemmstoffdicke,
    //   this.gesamtPreisindex
    // );

    // this.flachdachKosten = this.calculateFlachdachKosten(
    //   this.flachdachKostenM2,
    //   this.formService.gedaemmteflaecheValue()
    // );

    // this.flachdachEnergetischBedingteMehrkosten =
    //   this.calculateFlachdachEnergetischBedingteMehrkosten(
    //     this.aequDaemmstoffdicke,
    //     this.gesamtPreisindex,
    //     this.formService.gedaemmteflaecheValue()
    //   );

    // this.flachdachSowiesoKosten = this.calculateFlachdachSowiesoKosten(
    //   this.flachdachKosten,
    //   this.flachdachEnergetischBedingteMehrkosten
    // );

    // this.steildachKostenM2 = this.calculateSteildachKostenM2(
    //   this.aequDaemmstoffdicke,
    //   this.gesamtPreisindex
    // );

    // this.steildachKosten = this.calculateSteildachKosten(
    //   this.steildachKostenM2,
    //   this.formService.gedaemmteflaecheValue()
    // );

    // this.steildachEnergetischBedingteMehrkosten =
    //   this.calculateSteildachEnergetischBedingteMehrkosten(
    //     this.aequDaemmstoffdicke,
    //     this.gesamtPreisindex,
    //     this.formService.gedaemmteflaecheValue()
    //   );

    // this.steildachSowiesoKosten = this.calculateSteildachSowiesoKosten(
    //   this.steildachKosten,
    //   this.steildachEnergetischBedingteMehrkosten
    // );

    // this.steildachgaubenKostenM2 = this.calculateSteildachgaubenKostenM2(
    //   this.formService.hausSelected(),
    //   this.gesamtPreisindex
    // );

    // this.steildachgaubenKosten = this.calculateSteildachKosten(
    //   this.steildachgaubenKostenM2,
    //   this.formService.gaubeflaecheValue()
    // );

    // this.vorbaurollladenKostenM2 = this.calculateVorbaurollladenKostenM2(
    //   this.formService.vorbaurollladenSelected(),
    //   this.gesamtPreisindex
    // );

    // this.vorbaurollladenKosten = this.calculateVorbaurollladenKosten(
    //   this.vorbaurollladenKostenM2,
    //   this.formService.rollladenflaecheValue()
    // );

    // this.vorbaurollladenSowiesoKosten =
    //   this.calculateVorbaurollladenSowiesoKosten(this.vorbaurollladenKosten);

    // this.vorbaurollladenEnergetischBedingteMehrkosten =
    //   this.calculateVorbaurollladenEnergetischBedingteMehrkosten(
    //     this.vorbaurollladenKosten,
    //     this.vorbaurollladenSowiesoKosten
    //   );
  }
}
