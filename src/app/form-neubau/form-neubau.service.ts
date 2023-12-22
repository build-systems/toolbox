import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormNeubauService {
  // Centralized form control
  konstructionOptions: KonstruktionOptions[] = [
    {id: 'konst1', value: 'Konventionell'},
    {id: 'konst2', value: 'Holzbau'}
  ]
  kellergeschossOptions: KellergeschossOptions[] = [
    { id: 'kelgesc1', value: 'Vorhanden' },
    { id: 'kelgesc2', value: 'Nicht Vorhanden' },
  ];
  stellplaetzeOptions: StellplaetzeOptions[] = [
    { id: 'stpl1', value: 'Tiefgarage' },
    { id: 'stpl2', value: 'Garage' },
    { id: 'stpl3', value: 'Parkpalette' },
  ];
  aufzugsanlageOptions: AufzugsanlageOptions[] = [
    { id: 'aufanl1', value: 'Vorhanden' },
    { id: 'aufanl2', value: 'Nicht Vorhanden' },
  ];
  // I added the text field to also include html breakword syntax
  barrierefreiheitOptions: BarrierefreiesBauenOptions[] = [
    { id: 'barfre1', value: 'Barrierereduziert', text: 'Barriere<wbr />reduziert' },
    { id: 'barfre2', value: 'Barrierefrei', text: 'Barriere<wbr />frei' },
    { id: 'barfre3', value: 'Barrierefrei (R)', text: 'Barriere<wbr />frei (R)' },
    { id: 'barfre4', value: 'Keine Anforderungen', text: 'Keine' },
  ];
  dachbegruenungOptions: DachbegruenungOptions[] = [
    { id: 'dachbe1', value: 'Vorhanden' },
    { id: 'dachbe2', value: 'Nicht Vorhanden' },
  ];
  baustellenlogistikOptions: BaustellenlogistikOptions[] = [
    { id: 'baulog1', value: 'Vorhanden' },
    { id: 'baulog2', value: 'Nicht Vorhanden' },
  ];
  aussenanlagenOptions: AussenanlagenOptions[] = [
    { id: 'ausanl1', value: 'Gering' },
    { id: 'ausanl2', value: 'Hoch' },
    { id: 'ausanl3', value: 'Mittel' },
  ];
  grundstKosten = {
    init: 0,
    min: 0,
    max: 200,
    step: 1,
  };
  baunebenkostenKeinFin = {
    init: 0,
    min: 0,
    max: 200,
    step: 1,
  };

  // Observables
  private konstruktionSource = new BehaviorSubject<Konstruktion>(this.konstructionOptions[0].value);
  currentKonstruktion = this.konstruktionSource.asObservable();

  private kellergeschossSource = new BehaviorSubject<Kellergeschoss>(
    this.kellergeschossOptions[0].value
  );
  currentKellergeschoss$ = this.kellergeschossSource.asObservable();

  private stellplaetzeSource = new BehaviorSubject<Stellplaetze>(
    this.stellplaetzeOptions[0].value
  );
  currentStellplaetze$ = this.stellplaetzeSource.asObservable();

  private aufzugsanlageSource = new BehaviorSubject<Aufzugsanlage>(
    this.aufzugsanlageOptions[0].value
  );
  currentAufzugsanlage$ = this.aufzugsanlageSource.asObservable();

  private barriereFreiheitSource = new BehaviorSubject<BarrierefreiesBauen>(
    this.barrierefreiheitOptions[0].value
  );
  currentBarriereFreiheit$ = this.barriereFreiheitSource.asObservable();

  private dachbegruenungSource = new BehaviorSubject<Dachbegruenung>(
    this.dachbegruenungOptions[0].value
  );
  currentDachbegruenun$ = this.dachbegruenungSource.asObservable();

  private baustellenlogistikSource = new BehaviorSubject<Baustellenlogistik>(
    this.baustellenlogistikOptions[0].value
  );
  currentBaustellenlogistik$ = this.baustellenlogistikSource.asObservable();

  private aussenanlageSource = new BehaviorSubject<Aussenanlagen>(
    this.aussenanlagenOptions[0].value
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
  public setKonstruktion(data: Konstruktion) {
    this.konstruktionSource.next(data);
  }
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
