import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormProjektSanierungService {
  userPrice: userPriceObj = {
    min: 100,
    value: 2000,
    max: 10000,
    step: 10,
    title: 'Price estimation [€/m²] ',
    description: 'Price estimation description',
    disabled: true,
  };

  // Wohnfläche centralized form values
  wohnflaeche: wohnflaecheObj = {
    min: 20,
    value: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²] ',
    description: 'Wohnflaeche description',
    disabled: false,
  };

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    value: 10,
    max: 100,
    step: 1,
    title: 'Anzahl Wohnungen ',
    description: 'Anzahl Wohnungen description',
    disabled: false,
  };

  energiestandard: EnergiestandardSanierungObj = {
    options: [
      { id: 'enstd1', value: 'EH 40', disabled: false },
      { id: 'enstd2', value: 'EH 55', disabled: false },
      { id: 'enstd3', value: 'EH 70', disabled: false },
      { id: 'enstd4', value: 'EH 85', disabled: false },
    ],
    title: 'Energiestandard ',
    description: 'Energiestandard description',
  };

  // Zertifizierung centralized form values
  zertifizierung: ZertifizierungSanierungObj = {
    options: [
      { id: 'zert1', value: 'QNG', text: 'mit QNG Siegel', disabled: false },
      {
        id: 'zert2',
        value: 'Keine Zertifizierung',
        text: 'Keine',
        disabled: false,
      },
    ],
    title: 'Zertifizierung klimafreundlicher ',
    description: 'Zertifizierung klimafreundlicher description',
  };

  // This will be converted to the ABCDEFGH energieaussweis
  worstPerformingBuilding: WorstPerformingBuildingObj = {
    value: true,
    title: 'Worst Performing Building ',
    description:
      'Ein "Worst Performing Building" ist ein Gebäude, das hinsichtlich des energetischen Sanierungs\u00ADzustands zu den schlechtesten 25% der Gebäude in Deutschland gehört. Erfüllen Sie mit Ihrer Immobilie die Anforderungen an ein Worst Performing Building? Dann steigt Ihr Tilgungs\u00ADzuschuss um 10 Prozentpunkte (kfw.de)',
    disabled: false,
  };

  // Martin metioned this is more for big enterprises?
  // Should it be activated after a certain square meters?
  serielleSanierung: SerielleSanierungObj = {
    value: true,
    title: 'Serielle Sanierung ',
    description:
      'Das heißt, Sie verwenden vorgefertigte Bauele\u00ADmente für Fassa\u00ADde und gegebenen\u00ADfalls Dach. Erreicht Ihre Immobilie im Rahmen der Seriellen Sanierung die Effizienzhaus-Stufe 40 oder 55? Dann steigt Ihr Tilgungs\u00ADzuschuss um 15 Prozentpunkte (kfw.de)',
    disabled: false,
  };

  // Zustand Bestand
  zustandBestand: ZustandBestandObj = {
    options: [
      { id: 'zusbest1', value: 'Unsaniert', disabled: false },
      { id: 'zusbest2', value: 'Teilsaniert', disabled: false },
      { id: 'zusbest3', value: 'Umfassend saniert', disabled: false },
    ],
    title: 'Zustand Bestand',
    description: 'Zustand Bestand description',
  };

  // Erneuerbare-Energien-Klasse
  eeKlasse: EeKlasseObj = {
    value: true,
    // title: 'Erneuerbare-Energien-Klasse ',
    title: 'EE-Klasse ',
    description:
      'Die höhere Förderung für die Erneuerbare-Energien-Klasse können Sie in Anspruch nehmen, wenn Sie im Zuge der Sanierung zum Effizienz\u00ADhaus eine neue Heizungs\u00ADanlage auf Basis erneuer\u00ADbarer Energien einbauen und damit mindestens 65% des Energie\u00ADbedarfs des Gebäudes gedeckt wird. Die höhere Förderung erhalten Sie auch, wenn mindestens 65% des Energie\u00ADbedarfs des Hauses zum Teil oder ganz durch unvermeidbare Abwärme erbracht werden (kfw.de)',
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
    // Disable all the following form elements
    this.zustandBestand.options.forEach(obj => obj.disabled = data);
  }

  // Observable and set function for user price
  private userPriceSource = new BehaviorSubject<number>(this.userPrice.value);
  currentUserPrice$ = this.userPriceSource.asObservable();

  public setUserPrice(data: number) {
    this.userPriceSource.next(data);
  }

  // Observable and set function for Wohnflaeche
  private wohnflaecheSource = new BehaviorSubject<number>(
    this.wohnflaeche.value
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
    this.anzahlWohnungen.value
  );
  currentAnzahlWohnungen$ = this.anzahlWohnungenSource.asObservable();

  public setAnzahlWohnungen(data: number) {
    this.anzahlWohnungenSource.next(data);
  }

  // Observable and set function for Energiestandard
  private energiestandardSource = new BehaviorSubject<EnergiestandardSanierung>(
    this.energiestandard.options[0].value
  );
  currentEnergiestandard$ = this.energiestandardSource.asObservable();

  public setEnergiestandard(data: EnergiestandardSanierung) {
    this.energiestandardSource.next(data);
  }

  // Observable and set function for Zertifizierung
  private zertifizierungSource = new BehaviorSubject<ZertifizierungSanierung>(
    this.zertifizierung.options[0].value
  );
  currentZertifizierung$ = this.zertifizierungSource.asObservable();

  public setZertifizierung(data: ZertifizierungSanierung) {
    this.zertifizierungSource.next(data);
  }

  // Observable and set function for Worst Performing Building
  private wpcSource = new BehaviorSubject<boolean>(
    this.worstPerformingBuilding.value
  );
  currentWpc$ = this.wpcSource.asObservable();

  public setWpc(data: boolean) {
    this.wpcSource.next(data);
  }

  // Observable and set function for Serielle Sanierung
  private serielleSanierungSource = new BehaviorSubject<boolean>(
    this.serielleSanierung.value
  );
  currentSerielleSanierung$ = this.serielleSanierungSource.asObservable();

  public setSerielleSanierung(data: boolean) {
    this.serielleSanierungSource.next(data);
  }

  // Observable and set function for Zustand Bestand
  private zustandBestandSource = new BehaviorSubject<ZustandBestand>(
    this.zustandBestand.options[0].value
  );
  currentZustandBestand$ = this.zustandBestandSource.asObservable();

  public setZustandBestand(data: ZustandBestand) {
    this.zustandBestandSource.next(data);
  }

  // Observable and set function for EE-Klasse
  private eeKlasseSourcde = new BehaviorSubject<boolean>(this.eeKlasse.value);
  currentEeKlasse$ = this.eeKlasseSourcde.asObservable();

  public setEeKlasse(data: boolean) {
    this.eeKlasseSourcde.next(data);
  }

  constructor() {}
}
