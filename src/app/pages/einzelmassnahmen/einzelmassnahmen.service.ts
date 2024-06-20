import { Injectable, computed, effect, signal } from '@angular/core';
import { FormEinzelmassnahmenService } from './form-einzelmassnahmen/form-einzelmassnahmen.service';
import { einzelmassnahmen } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class EinzelmassnahmenService {
  // baupreisindexErrechnet: number;
  // C11 → Baupreisindex errechnet
  // C11 = ((C10 / C9) * 100)
  baupreisindexErrechnet: number;
  calculateBaupreisindexErrechnet(
    baupreisindexAktuell: number,
    baupreisindex2015: number
  ): number {
    return (baupreisindexAktuell / baupreisindex2015) * 100;
  }

  // Preisindex C13 → Gesamt
  // C13 = ((C11 / 100) * C12 * 100)
  gesamtPreisindex: number;
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
  fensterKostenM2 = signal<number>(0);
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

  // Vollkosten | Kosten [€]
  fensterKosten = signal<number>(0);
  private calculateFensterKosten(
    fensterKostenM2: number,
    anzahlFenster: number,
    fensterflaeche: number
  ): number {
    return fensterKostenM2 * (anzahlFenster * fensterflaeche);
  }
  // Sowieso-Kosten | Kosten [€/m² Bauteil]
  // I19 → 3WSV, Dreh/Kipp, Passivhaus EFH&MFH für F&Ft
  // I20 → 3WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // I21 → 2WSV, Dreh/Kipp, H/K konv. EFH&MFH für F&Ft
  // I19 = I20 = I21 =G21
  // fensterSowiesoKosten = fensterKostenM('2WSV konventionell',baunebenkosten,fensterflaeche,gesamtPreisindex);

  fensterSowiesoKosten = signal<number>(0);
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
  fensterEnergetischBedingteMehrkosten = signal<number>(0);
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
  dachflaechenfensterKosten = signal<number>(0);
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
  tuerKosten = signal<number>(0);
  private calculateTuerKosten(
    tuerflaeche: number,
    tuerKostenM2: number
  ): number {
    // H24 = C24 * G24
    return tuerflaeche * tuerKostenM2;
  }

  tuerEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateTuerEnergetischBedingteMehrkosten(tuerKostenM2: number) {
    return 0.33 * tuerKostenM2;
  }

  tuerSowiesoKosten = signal<number>(0);
  private calculateTuerSowiesoKosten(
    tuerKostenM2: number,
    tuerEnergetischBedingteMehrkosten: number
  ): number {
    return tuerKostenM2 - tuerEnergetischBedingteMehrkosten;
  }

  // C32 → Äqu. Dämmstoffdicke WLG 035 [cm]
  // Äquivalente Dämmstoffdicke
  // C32 = C30 / C31 * 0.035
  aequDaemmstoffdicke = signal<number>(0);
  private calculateAequDaemmstoffdicke(daemmstoffdicke: number): number {
    return (daemmstoffdicke / this.constants.warrmeleitfaehigkeit) * 0.035;
  }

  // G29 → Vollkosten | Kosten [€/m² Bauteil]
  wdvsKostenM2 = signal<number>(0);
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
  wdvsKosten = signal<number>(0);
  private calculateWdvsKosten(
    wdvsKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return wdvsKostenM2 * gedaemmteflaeche;
  }

  // I29 = H29 - J29
  wdvsSowiesoKosten = signal<number>(0);
  private calculateWdvsSowiesoKosten(
    wdvsKosten: number,
    wdvsEnergetischBedingteMehrkosten: number
  ): number {
    return wdvsKosten - wdvsEnergetischBedingteMehrkosten;
  }

  wdvsEnergetischBedingteMehrkosten = signal<number>(0);
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
  aussenwandKostenM2 = signal<number>(0);
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
  aussenwandKosten = signal<number>(0);
  private calculateAussenwandKosten(
    aussenwandKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return aussenwandKostenM2 * gedaemmteflaeche;
  }

  // Keller
  // Vollkosten | Kosten [€/m² Bauteil]
  // G31 → Keller, unterseitig, ohne Bekleidung
  kellerKostenM2 = signal<number>(0);
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

  kellerKosten = signal<number>(0);
  private calculateKellerKosten(
    kellerKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return kellerKostenM2 * gedaemmteflaeche;
  }

  kellerSowiesoKosten = signal<number>(0);
  private calculateKellerSowiesoKosten(
    kellerKosten: number,
    kellerEnergetischBedingteMehrkosten: number
  ): number {
    // I31 = H31 - J31
    return kellerKosten - kellerEnergetischBedingteMehrkosten;
  }

  // J31
  kellerEnergetischBedingteMehrkosten = signal<number>(0);
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
  bodenplatteKostenM2 = signal<number>(0);
  private calculateBodenplatteKostenM2(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    return (
      ((1 + this.constants.baunebenkosten) *
        (((18 + 17 + 10) * 110.6) / 99.2 + 1.04 * aequDaemmstoffdicke) *
        gesamtPreisindex) /
      100
    );
  }
  // H34 → Vollkosten | Kosten [€]
  bodenplatteKosten = signal<number>(0);
  private calculateBodenplatteKosten(
    bodenplatteKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    // H34 = G34 * $C$29
    return bodenplatteKostenM2 * gedaemmteflaeche;
  }
  // I34 → Sowieso-Kosten | Kosten [€]
  bodenplatteSowiesoKosten = signal<number>(0);
  private calculateBodenplatteSowiesoKosten(
    bodenplatteKosten: number,
    bodenplatteEnergetischBedingteMehrkosten: number
  ): number {
    // I34 = H34 - J34
    return bodenplatteKosten - bodenplatteEnergetischBedingteMehrkosten;
  }
  // J34 → Energetisch bedingte Mehrkosten | Kosten [€]
  // =H34
  bodenplatteEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateBodenplatteEnergetischBedingteMehrkosten(
    bodenplatteKosten: number
  ) {
    return bodenplatteKosten;
  }

  // Innenwand
  // G35 → Vollkosten | Kosten [€/m² Bauteil]
  // G35 = (1 + C15) * (((Daten!B26 * $C$32) + Daten!C26)) * $C$13 / 100
  innenwandKostenM2 = signal<number>(0);
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
  innenwandKosten = signal<number>(0);
  private calculateInnenwandKosten(
    innenwandKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return innenwandKostenM2 * gedaemmteflaeche;
  }
  // I35 → Sowieso-Kosten | Kosten [€]
  innenwandSowiesoKosten = signal<number>(0);
  private calculateInnenwandSowiesoKosten(
    innenwandKosten: number,
    innenwandEnergetischBedingteMehrkosten: number
  ): number {
    // I35 = H35 - J35
    return innenwandKosten - innenwandEnergetischBedingteMehrkosten;
  }
  // J35 → Energetisch bedingte Mehrkosten | Kosten [€]
  // =H35
  innenwandEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateInnenwandEnergetischBedingteMehrkosten(
    innenwandKosten: number
  ) {
    return innenwandKosten;
  }

  // Oberste Geschossdecke
  // Vollkosten | Kosten [€/m² Bauteil]
  // G36 → Oberste Geschossdecke, begehbar
  obersteGeschossdeckeKostenM2 = signal<number>(0);
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
  obersteGeschossdeckeKosten = signal<number>(0);
  private calculateObersteGeschossdeckeKosten(
    obersteGeschossdeckeKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return obersteGeschossdeckeKostenM2 * gedaemmteflaeche;
  }
  // Sowieso-Kosten | Kosten [€]
  // I36 → Oberste Geschossdecke, begehbar
  // I36 = H36 - J36
  obersteGeschossdeckeSowiesoKosten = signal<number>(0);
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
  obersteGeschossdeckeEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateObersteGeschossdeckeEnergetischBedingteMehrkosten(
    obersteGeschossdeckeKosten: number
  ) {
    return obersteGeschossdeckeKosten;
  }

  // Flachdach
  // Vollkosten | Kosten [€/m² Bauteil]
  // G38 → Flachdach ohne Lichtkuppeln
  // G38 = (1 + C15) * (((Daten!B31 * $C$32) + Daten!C31)) * $C$13 / 100
  flachdachKostenM2 = signal<number>(0);
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
  flachdachKosten = signal<number>(0);
  private calculateFlachdachKosten(
    flachdachKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return flachdachKostenM2 * gedaemmteflaeche;
  }
  // Sowieso-Kosten | Kosten [€]
  // I38 → Flachdach ohne Lichtkuppeln
  // I38 = H38 - J38
  flachdachSowiesoKosten = signal<number>(0);
  private calculateFlachdachSowiesoKosten(
    flachdachKosten: number,
    flachdachEnergetischBedingteMehrkosten: number
  ) {
    return flachdachKosten - flachdachEnergetischBedingteMehrkosten;
  }
  // Energetisch bedingte Mehrkosten | Kosten [€]
  // J38 → Flachdach ohne Lichtkuppeln
  // J38 = ((((Daten!B34 * $C$32) + Daten!C34)) * $C$13 / 100) * C29
  flachdachEnergetischBedingteMehrkosten = signal<number>(0);
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
  steildachKostenM2 = signal<number>(0);
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
  steildachKosten = signal<number>(0);
  private calculateSteildachKosten(
    steildachKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    // H41 = G41 * $C$29
    return steildachKostenM2 * gedaemmteflaeche;
  }
  // I41 → Sowieso-Kosten | Kosten [€]
  // I41 = H41 - J41
  steildachSowiesoKosten = signal<number>(0);
  private calculateSteildachSowiesoKosten(
    steildachKosten: number,
    steildachEnergetischBedingteMehrkosten: number
  ): number {
    return steildachKosten - steildachEnergetischBedingteMehrkosten;
  }
  // J41 → Energetisch bedingte Mehrkosten | Kosten [€]
  // J41 = ((((Daten!B36 * $C$32) + Daten!C36)) * $C$13 / 100) * C29
  steildachEnergetischBedingteMehrkosten = signal<number>(0);
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
  steildachgaubenKostenM2 = signal<number>(0);
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
  steildachgaubenKosten = signal<number>(0);
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
  vorbaurollladenKostenM2 = signal<number>(0);
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
  vorbaurollladenKosten = signal<number>(0);
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
  vorbaurollladenSowiesoKosten = signal<number>(0);
  private calculateVorbaurollladenSowiesoKosten(
    vorbaurollladenKosten: number
  ): number {
    return vorbaurollladenKosten;
  }

  // nergetisch bedingte Mehrkosten | Kosten [€]
  // J44 → Vorbaurollladen, Kunststoff, Gurt
  // J44 = H44 - I44
  vorbaurollladenEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateVorbaurollladenEnergetischBedingteMehrkosten(
    vorbaurollladenKosten: number,
    vorbaurollladenSowiesoKosten: number
  ): number {
    return vorbaurollladenKosten - vorbaurollladenSowiesoKosten;
  }

  kostenM2: number = 0;
  kosten: number = 0;
  sowiesoKosten: number = 0;
  energetischMehrkosten: number = 0;

  outputEinzelmassnahmen: OutputEinzelmassnahmen = {
    kostenM2: 0,
    kosten: 0,
    sowiesoKosten: 0,
    energetischMehrkosten: 0,
  };

  switchBauteil(
    bauteilSelected: string,
    dachSelected: Dach
  ): OutputEinzelmassnahmen {
    switch (bauteilSelected) {
      case 'Außenwand':
        return {
          kostenM2: this.aussenwandKostenM2(),
          kosten: this.aussenwandKosten(),
          sowiesoKosten: 0,
          energetischMehrkosten: 0,
        };
      case 'Bodenplatte':
        return {
          kostenM2: this.bodenplatteKostenM2(),
          kosten: this.bodenplatteKosten(),
          sowiesoKosten: this.bodenplatteSowiesoKosten(),
          energetischMehrkosten:
            this.bodenplatteEnergetischBedingteMehrkosten(),
        };
      case 'Dach':
        if (dachSelected === 'Flachdach') {
          return {
            kostenM2: this.flachdachKostenM2(),
            kosten: this.flachdachKosten(),
            sowiesoKosten: this.flachdachSowiesoKosten(),
            energetischMehrkosten:
              this.flachdachEnergetischBedingteMehrkosten(),
          };
        } else {
          return {
            kostenM2: this.steildachKostenM2(),
            kosten: this.steildachKosten(),
            sowiesoKosten: this.steildachSowiesoKosten(),
            energetischMehrkosten:
              this.steildachEnergetischBedingteMehrkosten(),
          };
        }
      case 'Dachflächenfenster':
        return {
          kostenM2: 0,
          kosten: this.dachflaechenfensterKosten(),
          sowiesoKosten: 0,
          energetischMehrkosten: 0,
        };
      case 'Fenster':
        return {
          kostenM2: this.fensterKostenM2(),
          kosten: this.fensterKosten(),
          sowiesoKosten: this.fensterSowiesoKosten(),
          energetischMehrkosten: this.fensterEnergetischBedingteMehrkosten(),
        };
      case 'Innenwand':
        return {
          kostenM2: this.innenwandKostenM2(),
          kosten: this.innenwandKosten(),
          sowiesoKosten: this.innenwandSowiesoKosten(),
          energetischMehrkosten: this.innenwandEnergetischBedingteMehrkosten(),
        };
      case 'Keller':
        return {
          kostenM2: this.kellerKostenM2(),
          kosten: this.kellerKosten(),
          sowiesoKosten: this.kellerSowiesoKosten(),
          energetischMehrkosten: this.kellerEnergetischBedingteMehrkosten(),
        };
      case 'ObersteGeschossdecke':
        return {
          kostenM2: this.obersteGeschossdeckeKostenM2(),
          kosten: this.obersteGeschossdeckeKosten(),
          sowiesoKosten: this.obersteGeschossdeckeSowiesoKosten(),
          energetischMehrkosten:
            this.obersteGeschossdeckeEnergetischBedingteMehrkosten(),
        };
      case 'Steildachgauben':
        return {
          kostenM2: this.steildachgaubenKostenM2(),
          kosten: this.steildachgaubenKosten(),
          sowiesoKosten: 0,
          energetischMehrkosten: 0,
        };
      case 'Türen':
        return {
          kostenM2: this.tuerKostenM2(),
          kosten: this.tuerKosten(),
          sowiesoKosten: this.tuerSowiesoKosten(),
          energetischMehrkosten: this.tuerEnergetischBedingteMehrkosten(),
        };
      case 'Vorbaurollladen':
        return {
          kostenM2: this.vorbaurollladenKostenM2(),
          kosten: this.vorbaurollladenKosten(),
          sowiesoKosten: this.vorbaurollladenSowiesoKosten(),
          energetischMehrkosten:
            this.vorbaurollladenEnergetischBedingteMehrkosten(),
        };
      case 'Wärmedämmverbundsystem':
        return {
          kostenM2: this.wdvsKostenM2(),
          kosten: this.wdvsKosten(),
          sowiesoKosten: this.wdvsSowiesoKosten(),
          energetischMehrkosten: this.wdvsEnergetischBedingteMehrkosten(),
        };
      default:
        return {
          kostenM2: 0,
          kosten: 0,
          sowiesoKosten: 0,
          energetischMehrkosten: 0,
        };
    }
  }

  // Calculations
  constructor(
    private constants: einzelmassnahmen,
    private formService: FormEinzelmassnahmenService
  ) {
    effect(() => {
      this.outputEinzelmassnahmen = this.switchBauteil(
        this.formService.bauteilSelected(),
        this.formService.dachSelected()
      );
    });

    this.baupreisindexErrechnet = this.calculateBaupreisindexErrechnet(
      this.constants.baupreisindexAktuell,
      this.constants.baupreisindex2015
    );

    this.gesamtPreisindex = this.calculateGesamtPreisindex(
      this.baupreisindexErrechnet,
      this.constants.ortsfaktor
    );

    effect(
      () => {
        this.fensterKostenM2.set(
          this.calculateFensterKostenM2(
            this.formService.fensterSelected(),
            this.formService.fensterflaecheValue(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.fensterKosten.set(
          this.calculateFensterKosten(
            this.fensterKostenM2(),
            this.formService.anzahlFensterValue(),
            this.formService.fensterflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.fensterSowiesoKosten.set(
          this.calculateFensterSowiesoKosten(
            this.formService.fensterflaecheValue(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.fensterEnergetischBedingteMehrkosten.set(
          this.calculateFensterEnergetischBedingteMehrkosten(
            this.fensterKostenM2(),
            this.fensterSowiesoKosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.dachflaechenfensterKosten.set(
          this.calculateDachflaechenfensterKosten(
            this.formService.hausSelected(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.tuerKostenM2.set(
          this.calculateTuerKostenM2(
            this.formService.hausSelected(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.tuerKosten.set(
          this.calculateTuerKosten(
            this.formService.tuerflaecheValue(),
            this.tuerKostenM2()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.tuerEnergetischBedingteMehrkosten.set(
          this.calculateTuerEnergetischBedingteMehrkosten(this.tuerKostenM2())
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.tuerSowiesoKosten.set(
          this.calculateTuerSowiesoKosten(
            this.tuerKostenM2(),
            this.tuerEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.aequDaemmstoffdicke.set(
          this.calculateAequDaemmstoffdicke(
            this.formService.daemmstoffdickeValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.wdvsKostenM2.set(
          this.calculateWdvsKostenM2(
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.wdvsKosten.set(
          this.calculateWdvsKosten(
            this.wdvsKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.wdvsSowiesoKosten.set(
          this.calculateWdvsSowiesoKosten(
            this.wdvsKosten(),
            this.wdvsEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.wdvsEnergetischBedingteMehrkosten.set(
          this.calculateWdvsEnergetischBedingteMehrkosten(
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex,
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.aussenwandKostenM2.set(
          this.calculateAussenwandKostenM2(
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.aussenwandKosten.set(
          this.calculateAussenwandKosten(
            this.aussenwandKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.kellerKostenM2.set(
          this.calculateKellerKostenM2(
            this.formService.kellerSelected(),
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.kellerKosten.set(
          this.calculateKellerKosten(
            this.kellerKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.kellerSowiesoKosten.set(
          this.calculateKellerSowiesoKosten(
            this.kellerKosten(),
            this.kellerEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.kellerEnergetischBedingteMehrkosten.set(
          this.calculateKellerEnergetischBedingteMehrkosten(
            this.formService.kellerSelected(),
            this.kellerKosten(),
            this.formService.gedaemmteflaecheValue(),
            this.aequDaemmstoffdicke()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.bodenplatteKostenM2.set(
          this.calculateBodenplatteKostenM2(
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.bodenplatteKosten.set(
          this.calculateBodenplatteKosten(
            this.bodenplatteKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.bodenplatteSowiesoKosten.set(
          this.calculateBodenplatteSowiesoKosten(
            this.bodenplatteKosten(),
            this.bodenplatteEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.bodenplatteEnergetischBedingteMehrkosten.set(
          this.calculateBodenplatteEnergetischBedingteMehrkosten(
            this.bodenplatteKosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.innenwandKostenM2.set(
          this.calculateInnenwandKostenM2(
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.innenwandKosten.set(
          this.calculateInnenwandKosten(
            this.innenwandKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.innenwandSowiesoKosten.set(
          this.calculateInnenwandSowiesoKosten(
            this.innenwandKosten(),
            this.innenwandEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.innenwandEnergetischBedingteMehrkosten.set(
          this.calculateInnenwandEnergetischBedingteMehrkosten(
            this.innenwandKosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.obersteGeschossdeckeKostenM2.set(
          this.calculateObersteGeschossdeckeKostenM2(
            this.formService.obersteGeschossdeckeSelected(),
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.obersteGeschossdeckeKosten.set(
          this.calculateObersteGeschossdeckeKosten(
            this.obersteGeschossdeckeKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.obersteGeschossdeckeSowiesoKosten.set(
          this.calculateObersteGeschossdeckeSowiesoKosten(
            this.obersteGeschossdeckeKosten(),
            this.obersteGeschossdeckeEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.obersteGeschossdeckeEnergetischBedingteMehrkosten.set(
          this.calculateObersteGeschossdeckeEnergetischBedingteMehrkosten(
            this.obersteGeschossdeckeKosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.flachdachKostenM2.set(
          this.calculateFlachdachKostenM2(
            this.formService.hausSelected(),
            this.formService.flachdachSelected(),
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.flachdachKosten.set(
          this.calculateFlachdachKosten(
            this.flachdachKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.flachdachSowiesoKosten.set(
          this.calculateFlachdachSowiesoKosten(
            this.flachdachKosten(),
            this.flachdachEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.flachdachEnergetischBedingteMehrkosten.set(
          this.calculateFlachdachEnergetischBedingteMehrkosten(
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex,
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.steildachKostenM2.set(
          this.calculateSteildachKostenM2(
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.steildachKosten.set(
          this.calculateSteildachKosten(
            this.steildachKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.steildachSowiesoKosten.set(
          this.calculateSteildachSowiesoKosten(
            this.steildachKosten(),
            this.steildachEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.steildachEnergetischBedingteMehrkosten.set(
          this.calculateSteildachEnergetischBedingteMehrkosten(
            this.aequDaemmstoffdicke(),
            this.gesamtPreisindex,
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.steildachgaubenKostenM2.set(
          this.calculateSteildachgaubenKostenM2(
            this.formService.hausSelected(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.steildachgaubenKosten.set(
          this.calculateSteildachgaubenKosten(
            this.steildachgaubenKostenM2(),
            this.formService.gaubeflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.vorbaurollladenKostenM2.set(
          this.calculateVorbaurollladenKostenM2(
            this.formService.vorbaurollladenSelected(),
            this.gesamtPreisindex
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.vorbaurollladenKosten.set(
          this.calculateVorbaurollladenKosten(
            this.vorbaurollladenKostenM2(),
            this.formService.rollladenflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.vorbaurollladenSowiesoKosten.set(
          this.calculateVorbaurollladenSowiesoKosten(
            this.vorbaurollladenKosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.vorbaurollladenEnergetischBedingteMehrkosten.set(
          this.calculateVorbaurollladenEnergetischBedingteMehrkosten(
            this.vorbaurollladenKosten(),
            this.vorbaurollladenSowiesoKosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    // this.vorbaurollladenEnergetischBedingteMehrkosten =
    //   this.calculateVorbaurollladenEnergetischBedingteMehrkosten(
    //     this.vorbaurollladenKosten,
    //     this.vorbaurollladenSowiesoKosten
    //   );
  }
}
