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
  // KfW 261, Checked on 2024/02/21 at https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger
  kreditlaufzeit = {
    min: 4,
    value: 10,
    max: 30,
    step: 1,
  };

  // KfW-Darlehen centralized form values
  kfWDarlehen: KfWDarlehenObj = {
    options: [
      { id: 'kfwd1', value: 'Annuitäten', disabled: false },
      { id: 'kfwd2', value: 'Endfälliges', disabled: false },
      // { id: 'kfwd3', value: 'kein', disabled: false },
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
    description: 'Bank-Darlehen description',
  };

  darlehenForm = this.fb.group({
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
      {
        Validators: [
          Validators.required,
          Validators.min(this.kalkRealzins.min),
          Validators.max(this.kalkRealzins.max),
        ],
        updateOn: 'blur',
      },
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
      {
        Validators: [
          Validators.required,
          Validators.min(this.kreditlaufzeit.min),
          Validators.max(this.kreditlaufzeit.max),
        ],
        updateOn: 'blur',
      },
    ],
    kfWDarlehen: this.kfWDarlehen.options[0].value,
    bankDarlehen: this.bankDarlehen.options[0].value,
  });

  constructor(private fb: FormBuilder) {
    // Kalkulationszinssatz (Realzins)
    this.darlehenForm
      .get('kalkRealzinsRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          // Update number input when range input changes
          this.darlehenForm
            .get('kalkRealzins')
            ?.setValue(value.toFixed(2), { emitEvent: false });
        }
      });

    this.darlehenForm.get('kalkRealzins')?.valueChanges.subscribe((value) => {
      if (value && Number(value) >= this.kreditlaufzeit.min) {
        const valueNumber = Number(value);
        // Update range input when number input changes
        this.darlehenForm
          .get('kalkRealzinsRange')
          ?.setValue(valueNumber, { emitEvent: false });
        this.darlehenForm
          .get('kalkRealzins')
          ?.setValue(valueNumber.toFixed(2), {
            emitEvent: false,
          });
      } else {
        this.darlehenForm
          .get('kalkRealzins')
          ?.setValue(this.kalkRealzins.min.toFixed(2), {
            emitEvent: false,
          });
        this.darlehenForm
          .get('kalkRealzinsRange')
          ?.setValue(this.kalkRealzins.min, { emitEvent: false });
      }
    });

    // Kreditlaufzeit
    this.darlehenForm
      .get('kreditlaufzeitRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          // Update number input when range input changes
          this.darlehenForm
            .get('kreditlaufzeit')
            ?.setValue(value, { emitEvent: false });
          // Check if inside Endfälliges range
          this.noEndfaelliges = this.updateNoEndfaelliges(value);
        }
      });

    // When number input changes...
    this.darlehenForm.get('kreditlaufzeit')?.valueChanges.subscribe((value) => {
      if (value && value >= this.kreditlaufzeit.min) {
        // ...update range input
        this.darlehenForm
          .get('kreditlaufzeitRange')
          ?.setValue(value, { emitEvent: false });
        // Check if inside Endfälliges range
        this.noEndfaelliges = this.updateNoEndfaelliges(value);
      } else {
        // Prevent non-realistic values and non-suported formats
        this.darlehenForm
          .get('kreditlaufzeitRange')
          ?.setValue(this.kreditlaufzeit.value, { emitEvent: false });
        this.darlehenForm
          .get('kreditlaufzeit')
          ?.setValue(this.kreditlaufzeit.value, { emitEvent: false });
        this.kfWDarlehen.options[1].disabled = false;
        this.noEndfaelliges = this.updateNoEndfaelliges(
          this.kreditlaufzeit.value
        );
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
