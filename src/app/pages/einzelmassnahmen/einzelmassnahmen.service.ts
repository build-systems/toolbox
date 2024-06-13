import { Injectable, signal } from '@angular/core';
import { FormEinzelmassnahmenService } from './form-einzelmassnahmen/form-einzelmassnahmen.service';

@Injectable({
  providedIn: 'root',
})
export class EinzelmassnahmenService {
  // Active form tab
  // public currentTab = signal(1);
  bauteil: Bauteil = this.formEinzelmassnahmenService.bauteil.options[0].value;
  fensterflaeche: number =
    this.formEinzelmassnahmenService.fensterflaeche.value;
  gesamtFensterflaeche: number =
    this.formEinzelmassnahmenService.gesamtFensterflaeche.value;
  fensterTyp: Fenster =
    this.formEinzelmassnahmenService.fensterTyp.options[0].value;
  dachflaechenfensterTyp: Dachflaechenfenster =
    this.formEinzelmassnahmenService.dachflaechenfensterTyp.options[0].value;
  tuerflaeche: number = this.formEinzelmassnahmenService.tuerflaeche.value;
  tuerTyp: Tuer = this.formEinzelmassnahmenService.tuerTyp.options[0].value;
  gedaemmteflaeche: number =
    this.formEinzelmassnahmenService.gedaemmteflaeche.value;
  daemmstoffdicke: number =
    this.formEinzelmassnahmenService.daemmstoffdicke.value;
  kellerTyp: Keller =
    this.formEinzelmassnahmenService.kellerTyp.options[0].value;
  obersteGeschossdeckeTyp: ObersteGeschossdecke =
    this.formEinzelmassnahmenService.obersteGeschossdeckeTyp.options[0].value;
  flachdachTyp: Flachdach =
    this.formEinzelmassnahmenService.flachdachTyp.options[0].value;
  gaubeflaeche: number = this.formEinzelmassnahmenService.gaubeflaeche.value;
  rollladenflaeche: number =
    this.formEinzelmassnahmenService.rollladenflaeche.value;

  constructor(
    private formEinzelmassnahmenService: FormEinzelmassnahmenService
  ) {
    this.formEinzelmassnahmenService.formEinzelmassnahmen.valueChanges.subscribe(
      (value) => {
        this.bauteil = value.bauteil!;
        this.fensterflaeche = value.fensterflaecheRange!;
        this.gesamtFensterflaeche = value.gesamtFensterflaecheRange!;
        this.fensterTyp = value.fensterTyp!;
        this.dachflaechenfensterTyp = value.dachflaechenfensterTyp!;
        this.tuerflaeche = value.tuerflaeche!;
        this.tuerTyp = value.tuerTyp!;
        this.gedaemmteflaeche = value.gedaemmteflaeche!;
        this.daemmstoffdicke = value.daemmstoffdicke!;
        this.kellerTyp = value.kellerTyp!;
        this.obersteGeschossdeckeTyp = value.obersteGeschossdeckeTyp!;
        this.flachdachTyp = value.flachdachTyp!;
        this.gaubeflaeche = value.gaubeflaeche!;
        this.rollladenflaeche = value.rollladenflaeche!;
        this.update();
      }
    );
    this.update();
  }

  public update() {}
}
