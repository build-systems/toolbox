import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  projektName = signal('New Projekt');

  constructor() {}
}
