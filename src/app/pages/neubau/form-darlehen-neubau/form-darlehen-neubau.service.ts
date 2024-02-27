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
  zinssatzBank: zinssatzBankObj = {
    value: 4,
    min: 0.1,
    max: 8,
    step: 0.1,
    title: 'Zinssatz Hausbank (Sollzins) ',
    description: 'Hier bestimmen Sie den Zinssatz, den Sie bei Ihrer Hausbank oder einem anderen Finanzierer erhalten und zu dem Sie die KfW Konditionen vergleichen möchten. Alle Zinsraten sind als Sollzins angegeben.',
    disabled: false,
  };

  // Kreditlaufzeit centralized form values
  // KfW 298, Checked on 2024/02/21 at https://www.kfw-formularsammlung.de/KonditionenanzeigerINet/KonditionenAnzeiger
  kreditlaufzeit: KreditlaufzeitObj = {
    value: 10,
    min: 4,
    max: 35,
    step: 1,
    title: 'Kreditlaufzeit [a] ',
    description: 'Die Kreditlaufzeit gibt an, wie viele Monate bzw. Jahre es dauert, bis ein Darlehen vollständig zurückgezahlt wird.',
    disabled: false,
  };

  // KfW-Darlehen centralized form values
  kfWDarlehen: KfWDarlehenObj = {
    options: [
      { id: 'kfwd1', value: 'Annuitäten', disabled: false },
      { id: 'kfwd2', value: 'Endfälliges', disabled: false },
      // { id: 'kfwd3', value: 'kein', disabled: false },
    ],
    title: 'KfW-Darlehen ',
    description: 'Bestimmen Sie hier, auf welche Art Ihr Kredit zurück gezahlt werden soll. Bei einem Annuitäten­darlehen zahlen Sie in den ersten Jahren (tilgungs­freie Anlauf­zeit) nur Zinsen – danach gleich hohe monat­liche Annuitäten. Diese stellen den Rückzahlungsbetrag dar, der sich aus Zins und Tilgung zusammen­setzt. Beim endfälligen Darlehen zahlen Sie während der gesamten Lauf­zeit nur die Zinsen und am Ende den kompletten Kredit­betrag in einer Summe zurück. Ein endfälliges Darlehen ist nur bei einer Laufzeit von bis zu 10 Jahren möglich.',
  };

  // Bank-Darlehen centralized form values
  bankDarlehen: BankDarlehenObj = {
    options: [
      { id: 'bankd1', value: 'Annuitäten', disabled: false },
      { id: 'bankd2', value: 'Endfälliges', disabled: false },
    ],
    title: 'Bank-Darlehen ',
    description: 'Bestimmen Sie hier, auf welche Art Ihr Kredit zurück gezahlt werden soll. Bei einem Annuitäten­darlehen zahlen Sie in den ersten Jahren (tilgungs­freie Anlauf­zeit) nur Zinsen – danach gleich hohe monat­liche Annuitäten. Diese stellen den Rückzahlungsbetrag dar, der sich aus Zins und Tilgung zusammen­setzt. Beim endfälligen Darlehen zahlen Sie während der gesamten Lauf­zeit nur die Zinsen und am Ende den kompletten Kredit­betrag in einer Summe zurück.',
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
