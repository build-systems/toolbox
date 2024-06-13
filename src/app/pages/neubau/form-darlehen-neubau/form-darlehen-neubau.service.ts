import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormDarlehenNeubauService {
  // This service stores all the information about the Darlehen Form for Neubau
  // It also updates the bi-directional number fields (input <-> range).
  // It is a source for Neubau Service.

  // Kalkulationszinssatz (Realzins) centralized form values
  zinssatzBank: SliderNumberObj = {
    value: 4,
    min: 0.1,
    max: 8,
    step: 0.1,
    title: 'Zinssatz Hausbank (Sollzins)',
    disabled: false,
  };

  // Kreditlaufzeit centralized form values
  // KfW 298, Checked on 2024/02/21 at https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger
  kreditlaufzeit: SliderNumberObj = {
    value: 10,
    min: 4,
    max: 35,
    step: 1,
    title: 'Kreditlaufzeit [a]',
    disabled: false,
  };

  // KfW-Darlehen centralized form values
  kfWDarlehen: KfWDarlehenObj = {
    options: [
      { id: 'kfwd1', value: 'Annuitäten', disabled: false },
      { id: 'kfwd2', value: 'Endfälliges', disabled: false },
      // { id: 'kfwd3', value: 'kein', disabled: false },
    ],
    title: 'KfW-Darlehen',
  };

  // Bank-Darlehen centralized form values
  bankDarlehen: BankDarlehenObj = {
    options: [
      { id: 'bankd1', value: 'Annuitäten', disabled: false },
      { id: 'bankd2', value: 'Endfälliges', disabled: false },
    ],
    title: 'Bank-Darlehen',
  };

  // Define form controls
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
      // This form control is a string to have always two decimal places using toFixed
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
    kfWDarlehen: [this.kfWDarlehen.options[0]['value'], Validators.required],
    bankDarlehen: [this.bankDarlehen.options[0]['value'], Validators.required],
  });

  constructor(private fb: FormBuilder) {
    // Kalkulationszinssatz (Realzins)
    this.darlehenForm
      .get('zinssatzBankRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        if (value) {
          this.darlehenForm
            .get('zinssatzBank')
            ?.setValue(value.toFixed(2), { emitEvent: false });
        }
      });

    this.darlehenForm.get('zinssatzBank')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      if (value && Number(value) >= this.zinssatzBank.min) {
        const valueNumber = Number(value);
        this.darlehenForm
          .get('zinssatzBankRange')
          ?.setValue(valueNumber, { emitEvent: false });
        this.darlehenForm
          .get('zinssatzBank')
          ?.setValue(valueNumber.toFixed(2), { emitEvent: false });
      } else {
        // Prevent non-realistic values and non-suported formats
        this.darlehenForm
          .get('zinssatzBankRange')
          ?.setValue(this.zinssatzBank.min, { emitEvent: false });
        this.darlehenForm
          .get('zinssatzBank')
          ?.setValue(this.zinssatzBank.min.toFixed(2), { emitEvent: false });
      }
    });

    // Kreditlaufzeit
    this.darlehenForm
      .get('kreditlaufzeitRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          // Update number input when range input changes
          this.noEndfaelliges = this.updateNoEndfaelliges(value);
          const kfWDarlehenFormControl = this.darlehenForm.get('kfWDarlehen');
          this.darlehenForm
            .get('kreditlaufzeit')
            ?.setValue(value, { emitEvent: false });
          // Check if inside Endfälliges range
          if (this.noEndfaelliges) {
            if (kfWDarlehenFormControl?.value === 'Endfälliges') {
              kfWDarlehenFormControl.setValue('Annuitäten');
            }
            this.kfWDarlehen.options[1].disabled = true;
          } else {
            this.kfWDarlehen.options[1].disabled = false;
          }
        }
      });

    this.darlehenForm.get('kreditlaufzeit')?.valueChanges.subscribe((value) => {
      if (value && Number(value) >= this.kreditlaufzeit.min) {
        this.noEndfaelliges = this.updateNoEndfaelliges(value);
        const kfWDarlehenFormControl = this.darlehenForm.get('kfWDarlehen');
        this.darlehenForm
          .get('kreditlaufzeitRange')
          ?.setValue(value, { emitEvent: false });
        // Check if inside Endfälliges range
        if (this.noEndfaelliges) {
          if (kfWDarlehenFormControl?.value === 'Endfälliges') {
            kfWDarlehenFormControl.setValue('Annuitäten');
          }
          this.kfWDarlehen.options[1].disabled = true;
        } else {
          this.kfWDarlehen.options[1].disabled = false;
        }
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
