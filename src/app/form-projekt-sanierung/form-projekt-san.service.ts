import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormProjektSanService {
  // Wohnfläche centralized form values
  wohnflaeche: wohnflaecheObj = {
    min: 20,
    init: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²] ',
    description: 'Wohnflaeche description'
  };

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    init: 10,
    max: 1000,
    step: 1,
    title: 'Anzahl Wohnungen ',
    description: 'Anzahl Wohnungen description',
  };

  energiestandard: EnergiestandardSanierungObj = {
    options: [
      { id: 'enstd1', value: 'EH 40' },
      { id: 'enstd2', value: 'EH 55' },
      { id: 'enstd3', value: 'EH 70' },
      { id: 'enstd4', value: 'EH 85' },
    ],
    title: 'Energiestandard ',
    description: 'Energiestandard description',
  };

  // Zertifizierung centralized form values
  zertifizierungOptions: ZertifizierungSanierungOptions[] = [
    { id: 'zert1', value: 'Keine Zertifizierung', text: 'Keine' },
    { id: 'zert2', value: 'QNG', text: 'QNG' },
  ];

  // This will be converted to the ABCDEFGH energieaussweis
  worstPerformingBuilding: boolean = true;

  // Martin metioned this is more for big enterprises?
  // Should it be activated after a certain square meters?
  serielleSanierung: boolean = true;

  eeKlasse: boolean = true;

  zustandBestandOptions: ZustandBestandOptions[] = [
    { id: 'zusbest1', value: 'Unsaniert' },
    { id: 'zusbest2', value: 'Teilsaniert' },
    { id: 'zusbest3', value: 'Umfassend saniert' },
  ];

  // Observable Worst Performing Building
  private wpcSource = new BehaviorSubject<boolean>(this.worstPerformingBuilding);
  currentWpc$ = this.wpcSource.asObservable();

  // Observable Serielle Sanierung
  private serielleSanierungSource = new BehaviorSubject<boolean>(this.serielleSanierung);
  currentSerielleSanierung$ = this.serielleSanierungSource.asObservable();

  // Observable Zustand Bestand
  private zustandBestandSource = new BehaviorSubject<ZustandBestand>(this.zustandBestandOptions[0].value);
  currentZustandBestand$ = this.zustandBestandSource.asObservable();

  // Observable EE-Klasse
  private eeKlasseSourcde = new BehaviorSubject<boolean>(this.eeKlasse);
  currentEeKlasse$ = this.eeKlasseSourcde.asObservable();

  // Set methods
  public setWpc(data: boolean) {
    this.wpcSource.next(data);
  }

  public setSerielleSanierung(data: boolean) {
    this.serielleSanierungSource.next(data);
  }

  public setZustandBestand(data: ZustandBestand) {
    this.zustandBestandSource.next(data);
  }

  public setEeKlasse(data: boolean) {
    this.eeKlasseSourcde.next(data);
  }

  // Observable for Wohnflaeche
  private wohnflaecheSource = new BehaviorSubject<number>(
    this.wohnflaeche.init
  );
  currentWohnflaeche$ = this.wohnflaecheSource.asObservable();

  // Observable for Anzahl Wohnungen
  private anzahlWohnungenSource = new BehaviorSubject<number>(
    this.anzahlWohnungen.init
  );
  currentAnzahlWohnungen$ = this.anzahlWohnungenSource.asObservable();

  // Observable for Energiestandard
  private energiestandardSource = new BehaviorSubject<EnergiestandardSanierung>(
    this.energiestandard.options[0].value
  );
  currentEnergiestandard$ = this.energiestandardSource.asObservable();

  // Observable for Zertifizierung
  private zertifizierungSource = new BehaviorSubject<ZertifizierungSanierung>(
    this.zertifizierungOptions[0].value
  );
  currentZertifizierung$ = this.zertifizierungSource.asObservable();

  // This method is used inside the form component and is triggered everytime the form changes
  public setWohnflaeche(value: number) {
    // It gets the form value
    this.wohnflaecheSource.next(value);
    // And trigger the update() method which cascade triggering all methods
  }

  // I repeated this for all form inputs
  public setAnzahlWohnungen(data: number) {
    this.anzahlWohnungenSource.next(data);
  }

  public setEnergiestandard(data: EnergiestandardSanierung) {
    this.energiestandardSource.next(data);
  }

  public setZertifizierung(data: ZertifizierungSanierung) {
    this.zertifizierungSource.next(data);
  }

  constructor() {}
}
