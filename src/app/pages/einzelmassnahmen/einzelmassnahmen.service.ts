import {
  Injectable,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormEinzelmassnahmenService } from './form-einzelmassnahmen/form-einzelmassnahmen.service';
import { einzelmassnahmen } from '../../shared/constants';
import { SharedService } from '../../shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from '../../shared/app-settings';

@Injectable({
  providedIn: 'root',
})
export class EinzelmassnahmenService {
  private constants = inject(einzelmassnahmen);
  private formService = inject(FormEinzelmassnahmenService);
  private sharedService = inject(SharedService);
  private snackBar = inject(MatSnackBar);
  private appDelay = inject(delay);

  // Titles
  titleKostenM2: EinzelmassnahmenValueTitle = 'Kosten';
  titleVollkosten: EinzelmassnahmenValueTitle = 'Vollkosten';
  titleSowiesoKosten: EinzelmassnahmenValueTitle = 'Sowieso-Kosten';
  titleEnergetischMehrkosten: EinzelmassnahmenValueTitle = 'Energetisch Kosten';
  descriptionEnergetischMehrkosten = 'Energetisch bedingte Mehrkosten';
  projectTitle = signal<string>('Untitled');
  debouncedProjectTitle = this.sharedService.debouncedSignal(
    this.projectTitle,
    300
  );
  projectsEinzelmassnahmen = signal<any[]>([]);

  // baupreisindexErrechnet: number;
  baupreisindexErrechnet: number;
  calculateBaupreisindexErrechnet(
    baupreisindexAktuell: number,
    baupreisindex2015: number
  ): number {
    return (baupreisindexAktuell / baupreisindex2015) * 100;
  }

  // Preisindex C13 → Gesamt
  gesamtPreisindex: number;
  calculateGesamtPreisindex(
    baupreisindexErrechnet: number,
    ortsfaktor: number
  ): number {
    return (baupreisindexErrechnet / 100) * ortsfaktor * 100;
  }

  // Fenster
  // Vollkosten | Kosten [€/m² Bauteil]
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
    const value = fensterKostenM2 - fensterSowiesoKosten;
    return value;
  }

  // Vollkosten | Kosten [€]
  dachflaechenfensterKosten = signal<number>(0);
  private calculateDachflaechenfensterKosten(
    hausTyp: Haus,
    gesamtPreisindex: number,
    anzahlDachflaechenfenster: number
  ): number {
    const { SchaetzwertA } = this.constants.dachflaechenfenster[hausTyp];
    const schaetzwertA = SchaetzwertA;
    return (
      (((1 + this.constants.baunebenkosten) * schaetzwertA * gesamtPreisindex) /
        100) *
      anzahlDachflaechenfenster
    );
  }

  // Vollkosten | Kosten [€/m² Bauteil]
  tuerKostenM2 = signal<number>(0);
  private calculateTuerKostenM2(
    hausTyp: Haus,
    gesamtPreisindex: number
  ): number {
    const { SchaetzwertA } = this.constants.tuer[hausTyp];
    const schaetzwertA = SchaetzwertA;
    return (
      ((1 + this.constants.baunebenkosten) * schaetzwertA * gesamtPreisindex) /
      100
    );
  }

  // Vollkosten | Kosten [€]
  tuerKosten = signal<number>(0);
  private calculateTuerKosten(
    tuerflaeche: number,
    tuerKostenM2: number,
    tuerAnzahl: number
  ): number {
    return tuerflaeche * tuerKostenM2 * tuerAnzahl;
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
  aequDaemmstoffdicke = signal<number>(0);
  private calculateAequDaemmstoffdicke(daemmstoffdicke: number): number {
    return (daemmstoffdicke / this.constants.warrmeleitfaehigkeit) * 0.035;
  }

  // G29 → Vollkosten | Kosten [€/m² Bauteil]
  aussenwandKostenM2 = signal<number>(0);
  private calculateWdvsKostenM2(
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    return (
      ((1 + this.constants.baunebenkosten) *
        (this.constants.wdvs.Geruestkosten.SchaetzwertA * aequDaemmstoffdicke +
          this.constants.wdvs.Geruestkosten.SchaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }

  aussenwandKosten = signal<number>(0);
  private calculateWdvsKosten(
    wdvsKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return wdvsKostenM2 * gedaemmteflaeche;
  }

  aussenwandSowiesoKosten = signal<number>(0);
  private calculateWdvsSowiesoKosten(
    wdvsKosten: number,
    wdvsEnergetischBedingteMehrkosten: number
  ): number {
    return wdvsKosten - wdvsEnergetischBedingteMehrkosten;
  }

  aussenwandEnergetischBedingteMehrkosten = signal<number>(0);
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

  aussenwandAltKostenM2 = signal<number>(0);
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

  aussenwandAltKosten = signal<number>(0);
  private calculateAussenwandKosten(
    aussenwandKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return aussenwandKostenM2 * gedaemmteflaeche;
  }

  // Keller
  // Vollkosten | Kosten [€/m² Bauteil]
  kellerKostenM2 = signal<number>(0);
  private calculateKellerKostenM2(
    kellerTyp: Keller,
    aequDaemmstoffdicke: number,
    gesamtPreisindex: number
  ): number {
    const { SchaetzwertA, SchaetzwertB } = this.constants.keller[kellerTyp];
    const schaetzwertA = SchaetzwertA;
    const schaetzwertB = SchaetzwertB;
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
    return kellerKosten - kellerEnergetischBedingteMehrkosten;
  }

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
    return bodenplatteKostenM2 * gedaemmteflaeche;
  }
  // I34 → Sowieso-Kosten | Kosten [€]
  bodenplatteSowiesoKosten = signal<number>(0);
  private calculateBodenplatteSowiesoKosten(
    bodenplatteKosten: number,
    bodenplatteEnergetischBedingteMehrkosten: number
  ): number {
    return bodenplatteKosten - bodenplatteEnergetischBedingteMehrkosten;
  }
  // J34 → Energetisch bedingte Mehrkosten | Kosten [€]
  bodenplatteEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateBodenplatteEnergetischBedingteMehrkosten(
    bodenplatteKosten: number
  ) {
    return bodenplatteKosten;
  }

  // Innenwand
  // G35 → Vollkosten | Kosten [€/m² Bauteil]
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
    return innenwandKosten - innenwandEnergetischBedingteMehrkosten;
  }
  // J35 → Energetisch bedingte Mehrkosten | Kosten [€]
  innenwandEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateInnenwandEnergetischBedingteMehrkosten(
    innenwandKosten: number
  ) {
    return innenwandKosten;
  }

  // Oberste Geschossdecke
  // Vollkosten | Kosten [€/m² Bauteil]
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
    return (
      ((1 + this.constants.baunebenkosten) *
        (schaetzwertA * aequDaemmstoffdicke + schaetzwertB) *
        gesamtPreisindex) /
      100
    );
  }
  // Vollkosten | Kosten [€]
  obersteGeschossdeckeKosten = signal<number>(0);
  private calculateObersteGeschossdeckeKosten(
    obersteGeschossdeckeKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return obersteGeschossdeckeKostenM2 * gedaemmteflaeche;
  }
  // Sowieso-Kosten | Kosten [€]
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
  obersteGeschossdeckeEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateObersteGeschossdeckeEnergetischBedingteMehrkosten(
    obersteGeschossdeckeKosten: number
  ) {
    return obersteGeschossdeckeKosten;
  }

  // Flachdach
  // Vollkosten | Kosten [€/m² Bauteil]
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
  flachdachKosten = signal<number>(0);
  private calculateFlachdachKosten(
    flachdachKostenM2: number,
    gedaemmteflaeche: number
  ): number {
    return flachdachKostenM2 * gedaemmteflaeche;
  }
  // Sowieso-Kosten | Kosten [€]
  flachdachSowiesoKosten = signal<number>(0);
  private calculateFlachdachSowiesoKosten(
    flachdachKosten: number,
    flachdachEnergetischBedingteMehrkosten: number
  ) {
    return flachdachKosten - flachdachEnergetischBedingteMehrkosten;
  }
  // Energetisch bedingte Mehrkosten | Kosten [€]
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
    return steildachKostenM2 * gedaemmteflaeche;
  }
  // I41 → Sowieso-Kosten | Kosten [€]
  steildachSowiesoKosten = signal<number>(0);
  private calculateSteildachSowiesoKosten(
    steildachKosten: number,
    steildachEnergetischBedingteMehrkosten: number
  ): number {
    return steildachKosten - steildachEnergetischBedingteMehrkosten;
  }
  // J41 → Energetisch bedingte Mehrkosten | Kosten [€]
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
  steildachgaubenKosten = signal<number>(0);
  private calculateSteildachgaubenKosten(
    steildachgaubenKostenM2: number,
    gaubeflaeche: number,
    anzahlGauben: number
  ): number {
    return (
      (1 + this.constants.baunebenkosten) *
      gaubeflaeche *
      steildachgaubenKostenM2 *
      anzahlGauben
    );
  }

  // Vorbaurollladen
  // Vollkosten | Kosten [€/m² Bauteil]
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
  vorbaurollladenKosten = signal<number>(0);
  private calculateVorbaurollladenKosten(
    vorbaurollladenKostenM2: number,
    rollladenflaeche: number
  ): number {
    return rollladenflaeche * vorbaurollladenKostenM2;
  }
  // Sowieso-Kosten | Kosten [€]
  vorbaurollladenSowiesoKosten = signal<number>(0);
  private calculateVorbaurollladenSowiesoKosten(
    vorbaurollladenKosten: number
  ): number {
    return vorbaurollladenKosten;
  }

  // nergetisch bedingte Mehrkosten | Kosten [€]
  vorbaurollladenEnergetischBedingteMehrkosten = signal<number>(0);
  private calculateVorbaurollladenEnergetischBedingteMehrkosten(
    vorbaurollladenKosten: number,
    vorbaurollladenSowiesoKosten: number
  ): number {
    return vorbaurollladenKosten - vorbaurollladenSowiesoKosten;
  }

  einzelmassnahmenOutputItem: EinzelmassnahmenItem = {
    title: undefined,
    id: undefined,
    values: [],
  };

  einzelmassnahmenOutputProject = signal<EinzelmassnahmenProject>({
    title: 'Untitled',
    id: undefined,
    items: [],
    vollkosten: 0,
  });

  totalKosten = signal<number>(0);

  addOutputItemToProject(
    newItem: EinzelmassnahmenItem,
    project: WritableSignal<EinzelmassnahmenProject>
  ) {
    if (newItem.title != undefined) {
      project.update((old) => ({
        ...old,
        items: [...old.items, newItem],
        vollkosten:
          old.vollkosten + this.findValueByTitle(newItem, 'Vollkosten'),
      }));
      this.snackBar.open('Added to the list', 'Ok', {
        duration: this.appDelay.snackbar,
      });
    }
  }

  findValueByTitle(
    obj: EinzelmassnahmenItem,
    title: EinzelmassnahmenValueTitle
  ): any {
    if (obj.values && Array.isArray(obj.values)) {
      for (const item of obj.values) {
        if (item.title === title) {
          return item.value;
        }
      }
    }
    return null;
  }

  switchBauteil(
    bauteilSelected: string,
    dachSelected: Dach
  ): EinzelmassnahmenItem {
    switch (bauteilSelected) {
      case 'Außenwand':
        return {
          title: 'Außenwand (WDVS)',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.aussenwandKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.aussenwandKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: this.aussenwandSowiesoKosten(),
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: this.aussenwandEnergetischBedingteMehrkosten(),
              unit: '€',
            },
          ],
        };
      case 'Bodenplatte':
        return {
          title: 'Bodenplatte',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.bodenplatteKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.bodenplatteKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: this.bodenplatteSowiesoKosten(),
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: this.bodenplatteEnergetischBedingteMehrkosten(),
              unit: '€',
            },
          ],
        };
      case 'Dach':
        if (dachSelected === 'Flachdach') {
          return {
            title: 'Flachdach',
            id: undefined,
            values: [
              {
                title: this.titleKostenM2,
                id: undefined,
                value: this.flachdachKostenM2(),
                unit: '€/m² Bauteil',
              },
              {
                title: this.titleVollkosten,
                id: undefined,
                value: this.flachdachKosten(),
                unit: '€',
              },
              {
                title: this.titleSowiesoKosten,
                id: undefined,
                value: this.flachdachSowiesoKosten(),
                unit: '€',
              },
              {
                title: this.titleEnergetischMehrkosten,
                id: undefined,
                value: this.flachdachEnergetischBedingteMehrkosten(),
                unit: '€',
              },
            ],
          };
        } else {
          return {
            title: 'Steildach',
            id: undefined,
            values: [
              {
                title: this.titleKostenM2,
                id: undefined,
                value: this.steildachKostenM2(),
                unit: '€/m² Bauteil',
              },
              {
                title: this.titleVollkosten,
                id: undefined,
                value: this.steildachKosten(),
                unit: '€',
              },
              {
                title: this.titleSowiesoKosten,
                id: undefined,
                value: this.steildachSowiesoKosten(),
                unit: '€',
              },
              {
                title: this.titleEnergetischMehrkosten,
                id: undefined,
                value: this.steildachEnergetischBedingteMehrkosten(),
                unit: '€',
              },
            ],
          };
        }
      case 'Dachflächenfenster':
        return {
          title: 'Dachflächenfenster',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: 0,
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.dachflaechenfensterKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: 0,
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: 0,
              unit: '€',
            },
          ],
        };
      case 'Fenster':
        return {
          title: 'Fenster',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.fensterKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.fensterKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: this.fensterSowiesoKosten(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: this.fensterEnergetischBedingteMehrkosten(),
              unit: '€/m² Bauteil',
            },
          ],
        };
      case 'Innenwand':
        return {
          title: 'Innenwand',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.innenwandKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.innenwandKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: this.innenwandSowiesoKosten(),
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: this.innenwandEnergetischBedingteMehrkosten(),
              unit: '€',
            },
          ],
        };
      case 'Kellerdecke':
        return {
          title: 'Kellerdecke',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.kellerKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.kellerKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: this.kellerSowiesoKosten(),
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: this.kellerEnergetischBedingteMehrkosten(),
              unit: '€',
            },
          ],
        };
      case 'ObersteGeschossdecke':
        return {
          title: 'Oberste Geschossdecke',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.obersteGeschossdeckeKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.obersteGeschossdeckeKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: this.obersteGeschossdeckeSowiesoKosten(),
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: this.obersteGeschossdeckeEnergetischBedingteMehrkosten(),
              unit: '€',
            },
          ],
        };
      case 'Steildachgauben':
        return {
          title: 'Neue Steildachgauben',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.steildachgaubenKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.steildachgaubenKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: 0,
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: 0,
              unit: '€',
            },
          ],
        };
      case 'Türen':
        return {
          title: 'Tür',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.tuerKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.tuerKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: this.tuerSowiesoKosten(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: this.tuerEnergetischBedingteMehrkosten(),
              unit: '€/m² Bauteil',
            },
          ],
        };
      case 'Vorbaurollladen':
        return {
          title: 'Vorbaurollladen',
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: this.vorbaurollladenKostenM2(),
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: this.vorbaurollladenKosten(),
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: this.vorbaurollladenSowiesoKosten(),
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: this.vorbaurollladenEnergetischBedingteMehrkosten(),
              unit: '€',
            },
          ],
        };
      default:
        return {
          title: undefined,
          id: undefined,
          values: [
            {
              title: this.titleKostenM2,
              id: undefined,
              value: 0,
              unit: '€/m² Bauteil',
            },
            {
              title: this.titleVollkosten,
              id: undefined,
              value: 0,
              unit: '€',
            },
            {
              title: this.titleSowiesoKosten,
              id: undefined,
              value: 0,
              unit: '€',
            },
            {
              title: this.titleEnergetischMehrkosten,
              id: undefined,
              value: 0,
              unit: '€',
            },
          ],
        };
    }
  }

  // Calculations
  constructor() {
    effect(
      () => {
        let vollkosten = this.einzelmassnahmenOutputProject().items.reduce(
          (sum, item) => sum + this.findValueByTitle(item, 'Vollkosten'),
          0
        );
        this.totalKosten.set(vollkosten);
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      this.einzelmassnahmenOutputItem = this.switchBauteil(
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
            this.gesamtPreisindex,
            this.formService.anzahlDachflaechenfensterValue()
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
            this.tuerKostenM2(),
            this.formService.anzahlTuerValue()
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
        this.aussenwandKostenM2.set(
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
        this.aussenwandKosten.set(
          this.calculateWdvsKosten(
            this.aussenwandKostenM2(),
            this.formService.gedaemmteflaecheValue()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.aussenwandSowiesoKosten.set(
          this.calculateWdvsSowiesoKosten(
            this.aussenwandKosten(),
            this.aussenwandEnergetischBedingteMehrkosten()
          )
        );
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        this.aussenwandEnergetischBedingteMehrkosten.set(
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
        this.aussenwandAltKostenM2.set(
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
        this.aussenwandAltKosten.set(
          this.calculateAussenwandKosten(
            this.aussenwandAltKostenM2(),
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
            this.formService.gaubeflaecheValue(),
            this.formService.anzahlSteildachgaubenValue()
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
  }
}
