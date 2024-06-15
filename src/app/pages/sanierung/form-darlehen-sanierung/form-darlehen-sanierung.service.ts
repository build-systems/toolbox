import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormDarlehenSanierungService {
  // Zinssatz Hausbank (Sollzins) old Kalkulationszinssatz (Realzins)
  zinssatzBank: SliderNumberObj = {
    value: 4,
    min: 0.1,
    max: 8,
    step: 0.1,
    title: 'Zinssatz Hausbank (Sollzins) [%]',
    disabled: false,
  };

  // Kreditlaufzeit centralized form values
  // KfW 261, Checked on 2024/02/21 at https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger

  kreditlaufzeit: SliderNumberObj = {
    value: 10,
    min: 4,
    max: 30,
    step: 1,
    title: 'Kreditlaufzeit [a]',
    disabled: false,
  };

  // KfW-Darlehen centralized form values
  kfWDarlehen: KfWDarlehenObj = {
    title: 'KfW-Darlehen',
    options: [
      { id: 'kfwd1', value: 'Annuitäten', disabled: false },
      { id: 'kfwd2', value: 'Endfälliges', disabled: false },
      // { id: 'kfwd3', value: 'kein', disabled: false },
    ],
  };

  // Bank-Darlehen centralized form values
  bankDarlehen: BankDarlehenObj = {
    title: 'Bank-Darlehen',
    options: [
      { id: 'bankd1', value: 'Annuitäten', disabled: false },
      { id: 'bankd2', value: 'Endfälliges', disabled: false },
    ],
  };

  darlehenForm = this.fb.group({
    zinssatzBankRange: [
      this.zinssatzBank.value,
      [
        Validators.required,
        Validators.min(this.zinssatzBank.min),
        Validators.max(this.zinssatzBank.max),
      ],
    ],
    zinssatzBank: [
      this.zinssatzBank.value.toFixed(2),
      {
        Validators: [
          Validators.required,
          Validators.min(this.zinssatzBank.min),
          Validators.max(this.zinssatzBank.max),
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
      .get('zinssatzBankRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          // Update number input when range input changes
          this.darlehenForm
            .get('zinssatzBank')
            ?.setValue(value.toFixed(2), { emitEvent: false });
        }
      });

    this.darlehenForm.get('zinssatzBank')?.valueChanges.subscribe((value) => {
      if (value && Number(value) >= this.kreditlaufzeit.min) {
        const valueNumber = Number(value);
        // Update range input when number input changes
        this.darlehenForm
          .get('zinssatzBankRange')
          ?.setValue(valueNumber, { emitEvent: false });
        this.darlehenForm
          .get('zinssatzBank')
          ?.setValue(valueNumber.toFixed(2), {
            emitEvent: false,
          });
      } else {
        this.darlehenForm
          .get('zinssatzBank')
          ?.setValue(this.zinssatzBank.min.toFixed(2), {
            emitEvent: false,
          });
        this.darlehenForm
          .get('zinssatzBankRange')
          ?.setValue(this.zinssatzBank.min, { emitEvent: false });
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
