import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormProjektNeuService {
  // Wohnfläche centralized form values
  wohnflaeche: wohnflaecheObj = {
    min: 20,
    init: 1000,
    max: 10000,
    step: 1,
    description: 'Wohnflaeche description',
  };

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    init: 10,
    max: 1000,
    step: 1,
    description: 'Anzahl Wohnungen description',
  };

  // Energiestandard centralized form values
  energiestandard: EnergiestandardNeubauObj = {
    options: [
      { id: 'enstd1', value: 'EH 40' },
      { id: 'enstd2', value: 'EH 55' },
      { id: 'enstd3', value: 'EH 70' },
      // { id: 'enstd4', value: 'EH 100' },
      // { id: 'enstd5', value: 'EH 115' },
    ],
    description: 'Energiestandard description',
  };

  // Konstruktion centralized form values
  konstruktion: KonstruktionObj = {
    options: [
      { id: 'konst1', value: 'Konventionell' },
      { id: 'konst2', value: 'Holzbau' },
    ],
    description: 'Konstruktion description',
  };

  // Zertifizierung centralized form values
  zertifizierung: ZertifizierungNeubauObj = {
    options: [
      { id: 'zert1', value: 'ohne QNG', text: 'ohne QNG Siegel' },
      { id: 'zert2', value: 'mit QNG', text: 'mit QNG Siegel' },
      { id: 'zert3', value: 'Keine', text: 'Keine Zertifizierung' },
    ],
    description: 'Neubau Zertifizierung klimafreundlicher description',
  };

  // Details
  // Kellergeschoss
  kellergeschoss: KellergeschossObj = {
    options: [
      { id: 'kelgesc1', value: 'Vorhanden' },
      { id: 'kelgesc2', value: 'Nicht Vorhanden' },
    ],
    description: 'Kellergeschoss description',
  };

  stellplaetze: StellplaetzeObj = {
    options: [
      { id: 'stpl1', value: 'Tiefgarage' },
      { id: 'stpl2', value: 'Garage' },
      { id: 'stpl3', value: 'Parkpalette' },
    ],
    description: "Stellplaetze description" 
  }

  // Aufzugsanlage
  aufzugsanlage: AufzugsanlageObj = {
    options: [
      { id: 'aufanl1', value: 'Vorhanden' },
      { id: 'aufanl2', value: 'Nicht Vorhanden' },
    ],
    description: "Aufzugsanlage description"
  }

  // Barrierefreiheit
  barrierefreiheit: BarrierefreiesBauenObj = {
    options: [
      { id: 'barfre1', value: 'Barrierereduziert', text: 'Reduziert' },
      { id: 'barfre2', value: 'Barrierefrei', text: 'Frei' },
      { id: 'barfre3', value: 'Barrierefrei (R)', text: 'Frei (R)' },
      { id: 'barfre4', value: 'Keine Anforderungen', text: 'Keine' },
    ],
    description: "Barrierefreiheit description" 
  }

  // Dachbegruenung
  dachbegruenung: DachbegruenungObj = {
    options: [
      { id: 'dachbe1', value: 'Vorhanden' },
      { id: 'dachbe2', value: 'Nicht Vorhanden' },
    ],
    description: "Dachbegruenung description"
  } 
 
  // Baustellenlogistik
  baustellenlogistik: BaustellenlogistikObj = {
    options: [
      { id: 'baulog1', value: 'Vorhanden' },
      { id: 'baulog2', value: 'Nicht Vorhanden' },
    ],
    description: "Baustellenlogistik description"
  }
  
  // Aussenanlagen
  aussenanlagen: AussenanlagenObj = {
    options: [
      { id: 'ausanl1', value: 'Gering' },
      { id: 'ausanl2', value: 'Mittel' },
      { id: 'ausanl3', value: 'Hoch' },
    ],
    description: "Aussenanlagen description"
  }
  
  // GrundstKosten
  grundstKosten = {
    init: 0,
    min: 0,
    max: 200,
    step: 1,
    description: "GrundstKosten Kein Fin description"
  };

  // Baunebenkosten Kein Fin
  baunebenkostenKeinFin = {
    init: 0,
    min: 0,
    max: 200,
    step: 1,
    description: "Baunebenkosten Kein Fin description"
  };

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
  private energiestandardSource = new BehaviorSubject<EnergiestandardNeubau>(
    this.energiestandard.options[0].value
  );
  currentEnergiestandard$ = this.energiestandardSource.asObservable();

  // Observable for Konstruktion
  private konstruktionSource = new BehaviorSubject<Konstruktion>(
    this.konstruktion.options[0].value
  );
  currentKonstruktion$ = this.konstruktionSource.asObservable();

  // Observable for Zertifizierung
  private zertifizierungSource = new BehaviorSubject<ZertifizierungNeubau>(
    this.zertifizierung.options[0].value
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

  public setEnergiestandard(data: EnergiestandardNeubau) {
    this.energiestandardSource.next(data);
  }

  public setKonstruktion(data: Konstruktion) {
    this.konstruktionSource.next(data);
  }

  public setZertifizierung(data: ZertifizierungNeubau) {
    this.zertifizierungSource.next(data);
  }

  // Details
  // Observables
  private kellergeschossSource = new BehaviorSubject<Kellergeschoss>(
    this.kellergeschoss.options[0].value
  );
  currentKellergeschoss$ = this.kellergeschossSource.asObservable();

  private stellplaetzeSource = new BehaviorSubject<Stellplaetze>(
    this.stellplaetze.options[0].value
  );
  currentStellplaetze$ = this.stellplaetzeSource.asObservable();

  private aufzugsanlageSource = new BehaviorSubject<Aufzugsanlage>(
    this.aufzugsanlage.options[0].value
  );
  currentAufzugsanlage$ = this.aufzugsanlageSource.asObservable();

  private barriereFreiheitSource = new BehaviorSubject<BarrierefreiesBauen>(
    this.barrierefreiheit.options[0].value
  );
  currentBarriereFreiheit$ = this.barriereFreiheitSource.asObservable();

  private dachbegruenungSource = new BehaviorSubject<Dachbegruenung>(
    this.dachbegruenung.options[0].value
  );
  currentDachbegruenun$ = this.dachbegruenungSource.asObservable();

  private baustellenlogistikSource = new BehaviorSubject<Baustellenlogistik>(
    this.baustellenlogistik.options[0].value
  );
  currentBaustellenlogistik$ = this.baustellenlogistikSource.asObservable();

  private aussenanlageSource = new BehaviorSubject<Aussenanlagen>(
    this.aussenanlagen.options[0].value
  );
  currentAussenanlage$ = this.aussenanlageSource.asObservable();

  private grundstuecksbezogeneKostenSource = new BehaviorSubject<number>(
    this.grundstKosten.init
  );
  currentGrundstuecksbezogeneKosten$ =
    this.grundstuecksbezogeneKostenSource.asObservable();

  private baunebenkostenKeinFinSource = new BehaviorSubject<number>(
    this.baunebenkostenKeinFin.init
  );
  currentBaunebenkostenKeinFin$ =
    this.baunebenkostenKeinFinSource.asObservable();

  // Set Neubau methods
  public setKellergeschoss(data: Kellergeschoss) {
    this.kellergeschossSource.next(data);
  }

  public setStellplaetzeIn(data: Stellplaetze) {
    this.stellplaetzeSource.next(data);
  }

  public setAufzugsanlageIn(data: Aufzugsanlage) {
    this.aufzugsanlageSource.next(data);
  }

  public setBarrierefreiheitIn(data: BarrierefreiesBauen) {
    this.barriereFreiheitSource.next(data);
  }

  public setDachbegruenungIn(data: Dachbegruenung) {
    this.dachbegruenungSource.next(data);
  }

  public setBaustellenlogistikIn(data: Baustellenlogistik) {
    this.baustellenlogistikSource.next(data);
  }

  public setAussenanlagenIn(data: Aussenanlagen) {
    this.aussenanlageSource.next(data);
  }

  public setGrundstuecksbezogeneKosten(data: number) {
    this.grundstuecksbezogeneKostenSource.next(data);
  }

  public setBaunebenkostenKeinFin(data: number) {
    this.baunebenkostenKeinFinSource.next(data);
  }

  constructor() {}
}
