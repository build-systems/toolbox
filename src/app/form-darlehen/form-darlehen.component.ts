import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormDarlehenService } from './form-darlehen.service';

@Component({
  selector: 'app-form-darlehen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-darlehen.component.html',
  styleUrl: './form-darlehen.component.css',
  host: {
    class: 'container-forms',
  },
})
export class FormDarlehenComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  // The reactive forms do two things:
  // Update the bi-directional number fields (input <-> range).
  // Update the form service.

  darlehenForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public formService: FormDarlehenService
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
          ?.setValue(value, { emitEvent: false });
        // Also updates the sanierungService
        this.formService.setKalkRealzins(value);
      });

    this.darlehenForm.get('kalkRealzins')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      this.darlehenForm
        .get('kalkRealzinsRange')
        ?.setValue(value, { emitEvent: false });
      // Also updates the sanierungService\
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
      });

    // When number input changes...
    this.darlehenForm.get('kreditlaufzeit')?.valueChanges.subscribe((value) => {
      // ...update range input
      this.darlehenForm
        .get('kreditlaufzeitRange')
        ?.setValue(value, { emitEvent: false });
      // and also updates the formService
      this.formService.setKreditlaufzeit(value);
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
}
