import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormProjektService {

  // Wohnfläche centralized form values
  wohnflaeche = {
    min: 50,
    init: 5000,
    max: 50_000,
    step: 50
  }

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen = {
    min: 1,
    init: 50,
    max: 1000,
    step: 1
  }

  energiestandardOptions: EnergiestandardOptions[] = [
    { id: "enstd1", value: "EH 40" },
    { id: "enstd2", value: "EH 55" },
    { id: "enstd3", value: "EH 70" },
    { id: "enstd4", value: "EH 100" },
    { id: "enstd5", value: "EH 115" },
  ]

  // Konstruktion centralized form values
  konstruktionOptions: KonstruktionOptions[] = [
    { id: "konst1", value: "Konventionell" },
    { id: "konst2", value: "Holzbau" }
  ]

  // Zertifizierung centralized form values
  zertifizierungOptions: ZertifizierungOptions[] = [
    { id: "zert1", value: "Keine Zertifizierung" },
    { id: "zert2", value: "QNG" }
  ]

  // Observable for Wohnflaeche
  private wohnflaecheSource = new BehaviorSubject<number>(this.wohnflaeche.init);
  currentWohnflaeche$ = this.wohnflaecheSource.asObservable();

  // Observable for Anzahl Wohnungen
  private anzahlWohnungenSource = new BehaviorSubject<number>(this.anzahlWohnungen.init);
  currentAnzahlWohnungen$ = this.anzahlWohnungenSource.asObservable();

  // Observable for Energiestandard
  private energiestandardSource = new BehaviorSubject<Energiestandard>(this.energiestandardOptions[0].value);
  currentEnergiestandard$ = this.energiestandardSource.asObservable();

  // Observable for Konstruktion
  private konstruktionSource = new BehaviorSubject<Konstruktion>(this.konstruktionOptions[0].value);
  currentKonstruktion$ = this.konstruktionSource.asObservable();

  // Observable for Zertifizierung
  private zertifizierungSource = new BehaviorSubject<Zertifizierung>(this.zertifizierungOptions[0].value);
  currentZertifizierung$ = this.zertifizierungSource.asObservable();

  // This method is used inside the form component and is triggered everytime the form changes
  public setWohnflaeche(value: number) {
    // It gets the form value
    this.wohnflaecheSource.next(value);
    // And trigger the update() method which cascade triggering all methods
  }

  // I repeated this for all form inputs
  public setAnzahlWohnungen(value: number) {
    this.anzahlWohnungenSource.next(value);
  }

  public setEnergiestandard(text: Energiestandard) {
    this.energiestandardSource.next(text);
  }

  public setKonstruktion(text: Konstruktion) {
    this.konstruktionSource.next(text);
  }

  public setZertifizierung(text: Zertifizierung) {
    this.zertifizierungSource.next(text);
  }

  constructor() { }
}
