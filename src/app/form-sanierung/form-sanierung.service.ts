import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormSanierungService {
  
  
  worstPerformingBuilding: boolean = true;
  serielleSanierung: boolean = true;
  eeKlasse: boolean = true;
  
  // Zustand Bestand centralized form control
  zustandBestandOptions: ZustandBestandOptions[] = [
    { id: 'zusbest1', value: 'Unsaniert' },
    { id: 'zusbest2', value: 'Teilsaniert' },
    { id: 'zusbest3', value: 'Umfassend saniert' },
  ];

  // Observable Worst Performing Building
  wpcSource = new BehaviorSubject<boolean>(this.worstPerformingBuilding);
  currentWpc$ = this.wpcSource.asObservable();

  // Observable Serielle Sanierung
  serielleSanierungSource = new BehaviorSubject<boolean>(this.serielleSanierung);
  currentSerielleSanierung$ = this.serielleSanierungSource.asObservable();

  // Observable Zustand Bestand
  zustandBestandSource = new BehaviorSubject<ZustandBestand>(this.zustandBestandOptions[0].value);
  currentZustandBestand$ = this.zustandBestandSource.asObservable();

  // Observable EE-Klasse
  eeKlasseSourcde = new BehaviorSubject<boolean>(this.eeKlasse);
  currentEeKlasse$ = this.eeKlasseSourcde.asObservable();

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

  constructor() {}
}
