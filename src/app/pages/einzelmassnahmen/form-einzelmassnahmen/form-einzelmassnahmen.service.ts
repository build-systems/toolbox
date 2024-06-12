import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormEinzelmassnahmenService {
  // Energiestandard centralized form values
  energiestandard: EnergiestandardNeubauObj = {
    options: [
      { id: 'enstd1', value: 'EH 40', disabled: false },
      { id: 'enstd2', value: 'GEG', disabled: false },
      // { id: 'enstd3', value: 'EH 70', disabled: false },
      // { id: 'enstd4', value: 'EH 100' },
      // { id: 'enstd5', value: 'EH 115' },
    ],
    title: 'Stufe Energieeffizienzhaus',
  };

  formEinzelmassnahmen = this.fb.group({});

  constructor(private fb: FormBuilder) {}
}
