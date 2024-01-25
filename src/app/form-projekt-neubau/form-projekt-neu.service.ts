import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormProjektNeuService {
  // User price
  // Wohnfläche centralized form values
  userPrice: userPriceObj = {
    min: 100,
    init: 5000,
    max: 20000,
    step: 10,
    title: 'Price estimation [€/m²] ',
    description: 'Price estimation description',
    disabled: true,
  };

  // Wohnfläche centralized form values
  wohnflaeche: wohnflaecheObj = {
    min: 20,
    init: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²] ',
    description: 'Wohnflaeche description',
    disabled: false,
  };

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    init: 10,
    max: 1000,
    step: 1,
    title: 'Anzahl Wohnungen ',
    description: 'Anzahl Wohnungen description',
    disabled: false,
  };

  // Energiestandard centralized form values
  energiestandard: EnergiestandardNeubauObj = {
    options: [
      { id: 'enstd1', value: 'EH 40', disabled: false },
      { id: 'enstd2', value: 'GEG', disabled: false },
      { id: 'enstd3', value: 'EH 70', disabled: false },
      // { id: 'enstd4', value: 'EH 100' },
      // { id: 'enstd5', value: 'EH 115' },
    ],
    title: 'Energiestandard ',
    description: 'Energiestandard description',
  };

  // Konstruktion centralized form values
  konstruktion: KonstruktionObj = {
    options: [
      { id: 'konst1', value: 'Holzbau', disabled: false },
      { id: 'konst2', value: 'Konventionell', disabled: false },
    ],
    title: 'Konstruktion ',
    description: 'Konstruktion description',
  };

  // Zertifizierung centralized form values
  zertifizierung: ZertifizierungNeubauObj = {
    options: [
      { id: 'zert1', value: 'Keine', text: 'Keine Zertifizierung', disabled: false },
      { id: 'zert2', value: 'ohne QNG', text: 'ohne QNG Siegel', disabled: false },
      { id: 'zert3', value: 'mit QNG', text: 'mit QNG Siegel', disabled: false },
    ],
    title: 'Zertifizierung klimafreundlicher Neubau ',
    description: 'Neubau Zertifizierung klimafreundlicher description',
  };
  // Signal to edit the disable property
  zertifizierungWarningMessage$i = signal('');

  // Details
  // Kellergeschoss
  kellergeschoss: KellergeschossObj = {
    options: [
      { id: 'kelgesc1', value: 'Vorhanden', disabled: false },
      { id: 'kelgesc2', value: 'Nicht Vorhanden', disabled: false },
    ],
    title: 'Kellergeschoss ',
    description: 'Kellergeschoss description',
  };

  stellplaetze: StellplaetzeObj = {
    options: [
      { id: 'stpl1', value: 'Tiefgarage', disabled: false },
      { id: 'stpl2', value: 'Garage', disabled: false },
      { id: 'stpl3', value: 'Parkpalette', disabled: false },
    ],
    title: 'Stellplätze ',
    description: 'Stellplaetze description',
  };

  // Aufzugsanlage
  aufzugsanlage: AufzugsanlageObj = {
    options: [
      { id: 'aufanl1', value: 'Vorhanden', disabled: false },
      { id: 'aufanl2', value: 'Nicht Vorhanden', disabled: false },
    ],
    title: 'Aufzugsanlage ',
    description: 'Aufzugsanlage description',
  };

  // Barrierefreiheit
  barrierefreiheit: BarrierefreiesBauenObj = {
    options: [
      { id: 'barfre1', value: 'Barrierereduziert', text: 'Reduziert', disabled: false },
      { id: 'barfre2', value: 'Barrierefrei', text: 'Frei', disabled: false },
      { id: 'barfre3', value: 'Barrierefrei (R)', text: 'Frei (R)', disabled: false },
      { id: 'barfre4', value: 'Keine Anforderungen', text: 'Keine', disabled: false },
    ],
    title: 'Barrierefreies Bauen ',
    description: 'Barrierefreiheit description',
  };

  // Dachbegruenung
  dachbegruenung: DachbegruenungObj = {
    options: [
      { id: 'dachbe1', value: 'Vorhanden', disabled: false },
      { id: 'dachbe2', value: 'Nicht Vorhanden', disabled: false },
    ],
    title: 'Dachbegrünung ',
    description: 'Dachbegruenung description',
  };

  // Baustellenlogistik
  baustellenlogistik: BaustellenlogistikObj = {
    options: [
      { id: 'baulog1', value: 'Vorhanden', disabled: false },
      { id: 'baulog2', value: 'Nicht Vorhanden', disabled: false },
    ],
    title: 'Anspruchsvolle Baustellenlogistik ',
    description: 'Baustellenlogistik description',
  };

  // Aussenanlagen
  aussenanlagen: AussenanlagenObj = {
    options: [
      { id: 'ausanl1', value: 'Gering', disabled: false },
      { id: 'ausanl2', value: 'Mittel', disabled: false },
      { id: 'ausanl3', value: 'Hoch', disabled: false },
    ],
    title: 'Außenanlagen ',
    description: 'Aussenanlagen description',
  };

  // Grundstücksbezogene Kosten
  grundstKosten: grundstKostenObj = {
    init: 0,
    min: 0,
    max: 1000,
    step: 1,
    title: 'Grundstuecksbezogene Kosten [€/m²] ',
    description: 'Grundstücksbezogene Kosten description',
    disabled: false,
  };

  // Baunebenkosten (excl. Finanzierung)
  baunebenkostenKeinFin = {
    init: 0,
    min: 0,
    max: 1000,
    step: 1,
    title: 'Baunebenkosten Kein Finanz. [€/m²] ',
    description: 'Baunebenkosten (excl. Finanzierung) description',
    disabled: false,
  };

  // Observable and set function for user price toggle
  private userPriceToggleSource = new BehaviorSubject<boolean>(
    this.userPrice.disabled
  );
  currentUserPriceToggle$ = this.userPriceToggleSource.asObservable();

  // Here it has to be the oposite of the toggle (!data)
  public setUserPriceToggle(data: boolean) {
    this.userPriceToggleSource.next(!data);
    this.kellergeschoss.options.forEach(obj => obj.disabled = data);
    this.stellplaetze.options.forEach(obj => obj.disabled = data);
    this.aufzugsanlage.options.forEach(obj => obj.disabled = data);
    this.barrierefreiheit.options.forEach(obj => obj.disabled = data);
    this.dachbegruenung.options.forEach(obj => obj.disabled = data);
    this.baustellenlogistik.options.forEach(obj => obj.disabled = data);
    this.aussenanlagen.options.forEach(obj => obj.disabled = data);
    this.grundstKosten.disabled = data;
    this.baunebenkostenKeinFin.disabled = data;
  }

  // Observable and set function for user price
  private userPriceSource = new BehaviorSubject<number>(this.userPrice.init);
  currentUserPrice$ = this.userPriceSource.asObservable();

  public setUserPrice(data: number) {
    this.userPriceSource.next(data);
  }

  // Observable and set function for Wohnflaeche
  private wohnflaecheSource = new BehaviorSubject<number>(
    this.wohnflaeche.init
  );
  currentWohnflaeche$ = this.wohnflaecheSource.asObservable();

  // This method is used inside the form component and is triggered everytime the form changes
  public setWohnflaeche(value: number) {
    // It gets the form value
    this.wohnflaecheSource.next(value);
    // And trigger the update() method which cascade triggering all methods
  }

  // Observable and set function for Anzahl Wohnungen
  private anzahlWohnungenSource = new BehaviorSubject<number>(
    this.anzahlWohnungen.init
  );
  currentAnzahlWohnungen$ = this.anzahlWohnungenSource.asObservable();

  public setAnzahlWohnungen(data: number) {
    this.anzahlWohnungenSource.next(data);
  }

  // Observable and set function for Energiestandard
  private energiestandardSource = new BehaviorSubject<EnergiestandardNeubau>(
    this.energiestandard.options[0].value
  );
  currentEnergiestandard$ = this.energiestandardSource.asObservable();

  public setEnergiestandard(data: EnergiestandardNeubau) {
    this.energiestandardSource.next(data);
  }

  // Observable and set function for Konstruktion
  private konstruktionSource = new BehaviorSubject<Konstruktion>(
    this.konstruktion.options[0].value
  );
  currentKonstruktion$ = this.konstruktionSource.asObservable();

  public setKonstruktion(data: Konstruktion) {
    this.konstruktionSource.next(data);
  }

  // Observable and set function for Zertifizierung
  private zertifizierungSource = new BehaviorSubject<ZertifizierungNeubau>(
    this.zertifizierung.options[0].value
  );
  currentZertifizierung$ = this.zertifizierungSource.asObservable();

  public setZertifizierung(data: ZertifizierungNeubau) {
    this.zertifizierungSource.next(data);
  }

  // Observable and set function for Kellergeschoss
  private kellergeschossSource = new BehaviorSubject<Kellergeschoss>(
    this.kellergeschoss.options[0].value
  );
  currentKellergeschoss$ = this.kellergeschossSource.asObservable();

  public setKellergeschoss(data: Kellergeschoss) {
    this.kellergeschossSource.next(data);
  }

  // Observable and set function for Stellplätze
  private stellplaetzeSource = new BehaviorSubject<Stellplaetze>(
    this.stellplaetze.options[0].value
  );
  currentStellplaetze$ = this.stellplaetzeSource.asObservable();

  public setStellplaetzeIn(data: Stellplaetze) {
    this.stellplaetzeSource.next(data);
  }

  // Observable and set function for Aufzugsanlage
  private aufzugsanlageSource = new BehaviorSubject<Aufzugsanlage>(
    this.aufzugsanlage.options[0].value
  );
  currentAufzugsanlage$ = this.aufzugsanlageSource.asObservable();

  public setAufzugsanlageIn(data: Aufzugsanlage) {
    this.aufzugsanlageSource.next(data);
  }

  // Observable and set function for Barriere Freiheit
  private barriereFreiheitSource = new BehaviorSubject<BarrierefreiesBauen>(
    this.barrierefreiheit.options[0].value
  );
  currentBarriereFreiheit$ = this.barriereFreiheitSource.asObservable();

  public setBarrierefreiheitIn(data: BarrierefreiesBauen) {
    this.barriereFreiheitSource.next(data);
  }

  // Observable and set function for Dachbegruenung
  private dachbegruenungSource = new BehaviorSubject<Dachbegruenung>(
    this.dachbegruenung.options[0].value
  );
  currentDachbegruenun$ = this.dachbegruenungSource.asObservable();

  public setDachbegruenungIn(data: Dachbegruenung) {
    this.dachbegruenungSource.next(data);
  }

  // Observable and set function for Baustellenlogistik
  private baustellenlogistikSource = new BehaviorSubject<Baustellenlogistik>(
    this.baustellenlogistik.options[0].value
  );
  currentBaustellenlogistik$ = this.baustellenlogistikSource.asObservable();

  public setBaustellenlogistikIn(data: Baustellenlogistik) {
    this.baustellenlogistikSource.next(data);
  }

  // Observable and set function for Außenanlage
  private aussenanlageSource = new BehaviorSubject<Aussenanlagen>(
    this.aussenanlagen.options[0].value
  );
  currentAussenanlage$ = this.aussenanlageSource.asObservable();

  public setAussenanlagenIn(data: Aussenanlagen) {
    this.aussenanlageSource.next(data);
  }

  // Observable and set function for Grundstuecksbezogenekosten
  private grundstuecksbezogeneKostenSource = new BehaviorSubject<number>(
    this.grundstKosten.init
  );
  currentGrundstuecksbezogeneKosten$ =
    this.grundstuecksbezogeneKostenSource.asObservable();

  public setGrundstuecksbezogeneKosten(data: number) {
    this.grundstuecksbezogeneKostenSource.next(data);
  }

  // Observable and set function for Baunebenkosten Kein Fin
  private baunebenkostenKeinFinSource = new BehaviorSubject<number>(
    this.baunebenkostenKeinFin.init
  );
  currentBaunebenkostenKeinFin$ =
    this.baunebenkostenKeinFinSource.asObservable();

  public setBaunebenkostenKeinFin(data: number) {
    this.baunebenkostenKeinFinSource.next(data);
  }

  constructor() {}
}
