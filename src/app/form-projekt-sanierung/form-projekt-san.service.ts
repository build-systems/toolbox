import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormProjektSanService {
  // Wohnfläche centralized form values
  wohnflaeche = {
    min: 20,
    init: 1000,
    max: 10000,
    step: 1,
  };

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen = {
    min: 1,
    init: 10,
    max: 1000,
    step: 1,
  };

  energiestandardOptions: EnergiestandardSanierungOptions[] = [
    { id: 'enstd1', value: 'EH 40' },
    { id: 'enstd2', value: 'EH 55' },
    { id: 'enstd3', value: 'EH 70' },
    { id: 'enstd4', value: 'EH 85' },
  ];

  // Konstruktion centralized form values
  konstruktionOptions: KonstruktionOptions[] = [
    { id: 'konst1', value: 'Konventionell' },
    { id: 'konst2', value: 'Holzbau' },
  ];

  // Zertifizierung centralized form values
  zertifizierungOptions: ZertifizierungSanierungOptions[] = [
    { id: 'zert1', value: 'Keine Zertifizierung', text: 'Keine' },
    { id: 'zert2', value: 'QNG', text: 'QNG' },
  ];

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
    this.energiestandardOptions[0].value
  );
  currentEnergiestandard$ = this.energiestandardSource.asObservable();

  // Observable for Konstruktion
  private konstruktionSource = new BehaviorSubject<Konstruktion>(
    this.konstruktionOptions[0].value
  );
  currentKonstruktion$ = this.konstruktionSource.asObservable();

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

  public setKonstruktion(data: Konstruktion) {
    this.konstruktionSource.next(data);
  }

  public setZertifizierung(data: ZertifizierungSanierung) {
    this.zertifizierungSource.next(data);
  }

  constructor() {}
}
