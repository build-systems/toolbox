import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDarlehenSanierungService {
  // Kalkulationszinssatz (Realzins) centralized form values
  kalkRealzins = {
    min: 0.1,
    value: 4,
    max: 8,
    step: 0.1,
  };

  // Kreditlaufzeit centralized form values
  kreditlaufzeit = {
    min: 1,
    value: 10,
    max: 30,
    step: 1,
  };

  // KfW-Darlehen centralized form values
  kfWDarlehen: KfWDarlehenObj = {
    options: [
      { id: 'kfwd2', value: 'Annuitäten', disabled: false },
      { id: 'kfwd3', value: 'Endfälliges', disabled: false },
      { id: 'kfwd1', value: 'kein', disabled: false },
    ],
    title: 'KfW-Darlehen ',
    description: 'KfW-Darlehen description',
  };

  // Bank-Darlehen centralized form values
  bankDarlehen: BankDarlehenObj = {
    options: [
      { id: 'bankd1', value: 'Annuitäten', disabled: false },
      { id: 'bankd2', value: 'Endfälliges', disabled: false },
    ],
    title: 'Bank-Darlehen',
    description: 'Bank-Darlehen description'
  };

  darlehenFormSanierung = this.fb.group({
    kalkRealzinsRange: [
      this.kalkRealzins.value,
      [
        Validators.required,
        Validators.min(this.kalkRealzins.min),
        Validators.max(this.kalkRealzins.max),
      ],
    ],
    kalkRealzins: [
      this.kalkRealzins.value.toFixed(2),
      [
        Validators.required,
        Validators.min(this.kalkRealzins.min),
        Validators.max(this.kalkRealzins.max),
      ],
    ],
    kreditlaufzeitRange: [
      this.kreditlaufzeit.value,
      [
        Validators.required,
        Validators.min(this.kreditlaufzeit.min),
        Validators.max(this.kreditlaufzeit.max),
      ],
    ],
    kreditlaufzeit: [
      this.kreditlaufzeit.value,
      [
        Validators.required,
        Validators.min(this.kreditlaufzeit.min),
        Validators.max(this.kreditlaufzeit.max),
      ],
    ],
    kfWDarlehen: this.kfWDarlehen.options[0].value,
    bankDarlehen: this.bankDarlehen.options[0].value,
  });

  constructor(private fb: FormBuilder) {
    // Kalkulationszinssatz (Realzins)
    this.darlehenFormSanierung
      .get('kalkRealzinsRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          // Update number input when range input changes
          this.darlehenFormSanierung
            .get('kalkRealzins')
            ?.setValue(value.toFixed(2), { emitEvent: false });
        }
      });

    this.darlehenFormSanierung
      .get('kalkRealzins')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          // Update range input when number input changes
          this.darlehenFormSanierung
            .get('kalkRealzinsRange')
            ?.setValue(Number(value), { emitEvent: false });
        }
      });

    // Kreditlaufzeit
    this.darlehenFormSanierung
      .get('kreditlaufzeitRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          // Update number input when range input changes
          this.darlehenFormSanierung
            .get('kreditlaufzeit')
            ?.setValue(value, { emitEvent: false });
          // Check if inside Endfälliges range
          this.noEndfaelliges = this.updateNoEndfaelliges(value);
        }
      });

    // When number input changes...
    this.darlehenFormSanierung
      .get('kreditlaufzeit')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          // ...update range input
          this.darlehenFormSanierung
            .get('kreditlaufzeitRange')
            ?.setValue(value, { emitEvent: false });
          // Check if inside Endfälliges range
          this.noEndfaelliges = this.updateNoEndfaelliges(value);
        }
      });
  }

  // Enfälliges not possible
  public noEndfaelliges = false;
  private updateNoEndfaelliges(value: number) {
    if (value > 10 || value < 4) {
      return true;
    } else {
      return false;
    }
  }
}
