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
    description: 'Wohnflaeche description',
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
  zertifizierung: ZertifizierungSanierungObj = {
    options: [
      { id: 'zert1', value: 'QNG', text: 'mit QNG Siegel' },
      { id: 'zert2', value: 'Keine Zertifizierung', text: 'Keine' },
    ],
    title: 'Zertifizierung klimafreundlicher ',
    description: 'Zertifizierung klimafreundlicher description',
  };

  // This will be converted to the ABCDEFGH energieaussweis
  worstPerformingBuilding: WorstPerformingBuildingObj = {
    value: true,
    title: 'Worst Performing Building ',
    description: 'Ein "Worst Performing Building" ist ein Gebäude, das hinsichtlich des energetischen Sanierungs\u00ADzustands zu den schlechtesten 25% der Gebäude in Deutschland gehört. Erfüllen Sie mit Ihrer Immobilie die Anforderungen an ein Worst Performing Building? Dann steigt Ihr Tilgungs\u00ADzuschuss um 10 Prozentpunkte (kfw.de)'
  }
  
  // Martin metioned this is more for big enterprises?
  // Should it be activated after a certain square meters?
  serielleSanierung: SerielleSanierungObj = {
    value: true,
    title: 'Serielle Sanierung ',
    description: "Das heißt, Sie verwenden vorgefertigte Bauele\u00ADmente für Fassa\u00ADde und gegebenen\u00ADfalls Dach. Erreicht Ihre Immobilie im Rahmen der Seriellen Sanierung die Effizienzhaus-Stufe 40 oder 55? Dann steigt Ihr Tilgungs\u00ADzuschuss um 15 Prozentpunkte (kfw.de)"
  }

  // Zustand Bestand
  zustandBestand: ZustandBestandObj = {
    options: [
      { id: 'zusbest1', value: 'Unsaniert' },
      { id: 'zusbest2', value: 'Teilsaniert' },
      { id: 'zusbest3', value: 'Umfassend saniert' },
    ],
    title: 'Zustand Bestand',
    description: 'Zustand Bestand description',
  }

  // Erneuerbare-Energien-Klasse
  eeKlasse: EeKlasseObj = {
    value: true,
    title: 'Erneuerbare-Energien-Klasse ',
    description: 'Die höhere Förderung für die Erneuerbare-Energien-Klasse können Sie in Anspruch nehmen, wenn Sie im Zuge der Sanierung zum Effizienz\u00ADhaus eine neue Heizungs\u00ADanlage auf Basis erneuer\u00ADbarer Energien einbauen und damit mindestens 65% des Energie\u00ADbedarfs des Gebäudes gedeckt wird. Die höhere Förderung erhalten Sie auch, wenn mindestens 65% des Energie\u00ADbedarfs des Hauses zum Teil oder ganz durch unvermeidbare Abwärme erbracht werden (kfw.de)'
  }

  // Observable Worst Performing Building
  private wpcSource = new BehaviorSubject<boolean>(
    this.worstPerformingBuilding.value
  );
  currentWpc$ = this.wpcSource.asObservable();

  // Observable Serielle Sanierung
  private serielleSanierungSource = new BehaviorSubject<boolean>(
    this.serielleSanierung.value
  );
  currentSerielleSanierung$ = this.serielleSanierungSource.asObservable();

  // Observable Zustand Bestand
  private zustandBestandSource = new BehaviorSubject<ZustandBestand>(
    this.zustandBestand.options[0].value
  );
  currentZustandBestand$ = this.zustandBestandSource.asObservable();

  // Observable EE-Klasse
  private eeKlasseSourcde = new BehaviorSubject<boolean>(this.eeKlasse.value);
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

  public setEnergiestandard(data: EnergiestandardSanierung) {
    this.energiestandardSource.next(data);
  }

  public setZertifizierung(data: ZertifizierungSanierung) {
    this.zertifizierungSource.next(data);
  }

  constructor() {}
}
