import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatengrundlageService {
  private datengrundlageVisibleSignal = signal<boolean>(false);

  readonly datengrundlageVisible = this.datengrundlageVisibleSignal.asReadonly();

  clickDatengrundlage() {
    this.datengrundlageVisibleSignal.set(!this.datengrundlageVisibleSignal());
  }
  
  constructor() { }
}
