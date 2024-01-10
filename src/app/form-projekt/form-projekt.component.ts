import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormProjektService } from './form-projekt.service';

@Component({
  selector: 'app-form-projekt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-projekt.component.html',
  styleUrl: './form-projekt.component.css',
  host: {
    class: 'container-forms',
  },
})
export class FormProjektComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  // The reactive forms do two things:
  // Update the bi-directional number fields (input <-> range).
  // Update the form service.

  constructor(
    private fb: FormBuilder,
    public formService: FormProjektService
  ) {}

  // Inititalize projekt form
  projektForm!: FormGroup;

  ngOnInit(): void {
    this.projektForm = this.fb.group({
      // These are form controls that go into the html
      wohnflaecheRange: [
        // The values come from the FormProjektService
        this.formService.wohnflaeche.init,
        [
          Validators.min(this.formService.wohnflaeche.min),
          Validators.max(this.formService.wohnflaeche.max),
        ],
      ],
      wohnflaeche: [
        this.formService.wohnflaeche.init,
        [
          Validators.min(this.formService.wohnflaeche.min),
          Validators.max(this.formService.wohnflaeche.max),
        ],
      ],
      anzahlWohnungenRange: [
        this.formService.anzahlWohnungen.init,
        [
          Validators.min(this.formService.anzahlWohnungen.min),
          Validators.max(this.formService.anzahlWohnungen.max),
        ],
      ],
      anzahlWohnungen: [
        this.formService.anzahlWohnungen.init,
        [
          Validators.min(this.formService.anzahlWohnungen.min),
          Validators.max(this.formService.anzahlWohnungen.max),
        ],
      ],
      energiestandard: new FormControl(
        this.formService.energiestandardOptions[0].value
      ),
      zertifizierung: new FormControl(
        this.formService.zertifizierungOptions[0].value
      ),
    });

    // Wohnflaeche
    this.projektForm
      .get('wohnflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektForm
          .get('wohnflaeche')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formService.setWohnflaeche(value);
      });

    this.projektForm.get('wohnflaeche')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      this.projektForm
        .get('wohnflaecheRange')
        ?.setValue(value, { emitEvent: false });
      // Also updates the FormProjektService
      this.formService.setWohnflaeche(value);
    });

    // Anzahl WohnungenRange
    this.projektForm
      .get('anzahlWohnungenRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektForm
          .get('anzahlWohnungen')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formService.setAnzahlWohnungen(value);
      });

    this.projektForm.get('anzahlWohnungen')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      this.projektForm
        .get('anzahlWohnungenRange')
        ?.setValue(value, { emitEvent: false });
      // Also updates the FormProjektService
      this.formService.setAnzahlWohnungen(value);
    });

    // Energiestandard
    this.projektForm.get('energiestandard')?.valueChanges.subscribe((value) => {
      // Updates the sanierungService
      this.formService.setEnergiestandard(value);
    });

    // Zertifizierung
    this.projektForm.get('zertifizierung')?.valueChanges.subscribe((value) => {
      // Updates the sanierungService
      this.formService.setZertifizierung(value);
    });
  }

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
