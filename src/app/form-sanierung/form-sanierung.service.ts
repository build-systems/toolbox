import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormSanierungService {
  
  // Centralized form control
  worstPerformingBuilding: boolean = true;
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

  constructor() {}
}
