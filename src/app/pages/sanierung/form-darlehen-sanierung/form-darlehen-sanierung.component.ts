import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDarlehenSanierungService } from './form-darlehen-sanierung.service';

@Component({
  selector: 'app-form-darlehen-sanierung',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-darlehen-sanierung.component.html',
  styleUrl: './form-darlehen-sanierung.component.css',
  host: {
    class: 'host-forms',
  },
})
export class FormDarlehenSanierungComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  // The reactive forms do two things:
  // Update the bi-directional number fields (input <-> range).
  // Update the form service.

  darlehenForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public formService: FormDarlehenSanierungService
  ) {}

  ngOnInit(): void {
    this.darlehenForm = this.fb.group({
      kalkRealzinsRange: [
        this.formService.kalkRealzins.init,
        [
          Validators.min(this.formService.kalkRealzins.min),
          Validators.max(this.formService.kalkRealzins.max),
        ],
      ],
      kalkRealzins: [
        this.formService.kalkRealzins.init,
        [
          Validators.min(this.formService.kalkRealzins.min),
          Validators.max(this.formService.kalkRealzins.max),
        ],
      ],
      kreditlaufzeitRange: [
        this.formService.kreditlaufzeit.init,
        [
          Validators.min(this.formService.kreditlaufzeit.min),
          Validators.max(this.formService.kreditlaufzeit.max),
        ],
      ],
      kreditlaufzeit: [
        this.formService.kreditlaufzeit.init,
        [
          Validators.min(this.formService.kreditlaufzeit.min),
          Validators.max(this.formService.kreditlaufzeit.max),
        ],
      ],
      kfWDarlehen: new FormControl(
        this.formService.kfWDarlehenOptions[0]['value']
      ),
      bankDarlehen: new FormControl(
        this.formService.bankDarlehenOptions[0]['value']
      ),
    });

    // Kalkulationszinssatz (Realzins)
    this.darlehenForm
      .get('kalkRealzinsRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.darlehenForm
          .get('kalkRealzins')
          ?.setValue(value.toFixed(2), { emitEvent: false });
        // Updates the sanierungService observable
        this.formService.setKalkRealzins(value);
      });

    this.darlehenForm.get('kalkRealzins')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      this.darlehenForm
        .get('kalkRealzinsRange')
        ?.setValue(value, { emitEvent: false });
      // Also updates the sanierungService observable
      this.formService.setKalkRealzins(value);
    });

    // Kreditlaufzeit
    this.darlehenForm
      .get('kreditlaufzeitRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.darlehenForm
          .get('kreditlaufzeit')
          ?.setValue(value, { emitEvent: false });
        // Also updates the sanierungService
        this.formService.setKreditlaufzeit(value);
        // Check if inside Endfälliges range
        this.noEndfaelliges = this.updateNoEndfaelliges(value);
      });

    // When number input changes...
    this.darlehenForm.get('kreditlaufzeit')?.valueChanges.subscribe((value) => {
      // ...update range input
      this.darlehenForm
        .get('kreditlaufzeitRange')
        ?.setValue(value, { emitEvent: false });
      // and also updates the formService
      this.formService.setKreditlaufzeit(value);
      // Check if inside Endfälliges range
      this.noEndfaelliges = this.updateNoEndfaelliges(value);
    });

    // KfW Darlehen
    this.darlehenForm.get('kfWDarlehen')?.valueChanges.subscribe((value) => {
      // Update the sanierungService
      this.formService.setKfWDarlehen(value);
    });

    // Bank Darlehen
    this.darlehenForm.get('bankDarlehen')?.valueChanges.subscribe((value) => {
      // Update the sanierungService
      this.formService.setBankDarlehen(value);
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
