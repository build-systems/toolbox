import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormProjektSanService } from './form-projekt-san.service';

@Component({
  selector: 'app-form-projekt-sanierung',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-projekt-sanierung.component.html',
  styleUrl: './form-projekt-sanierung.component.css',
  host: {
    class: 'container-forms',
  },
})
export class FormProjektSanierungComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  // The reactive forms do two things:
  // Update the bi-directional number fields (input <-> range).
  // Update the form service.

  constructor(
    private fb: FormBuilder,
    public formProjektSanService: FormProjektSanService
  ) {}

  // Inititalize projekt form
  projektFormSan!: FormGroup;

  ngOnInit(): void {
    this.projektFormSan = this.fb.group({
      // These are form controls that go into the html
      wohnflaecheRange: [
        // The values come from the FormProjektService
        this.formProjektSanService.wohnflaeche.init,
        [
          Validators.min(this.formProjektSanService.wohnflaeche.min),
          Validators.max(this.formProjektSanService.wohnflaeche.max),
        ],
      ],
      wohnflaeche: [
        this.formProjektSanService.wohnflaeche.init,
        [
          Validators.min(this.formProjektSanService.wohnflaeche.min),
          Validators.max(this.formProjektSanService.wohnflaeche.max),
        ],
      ],
      anzahlWohnungenRange: [
        this.formProjektSanService.anzahlWohnungen.init,
        [
          Validators.min(this.formProjektSanService.anzahlWohnungen.min),
          Validators.max(this.formProjektSanService.anzahlWohnungen.max),
        ],
      ],
      anzahlWohnungen: [
        this.formProjektSanService.anzahlWohnungen.init,
        [
          Validators.min(this.formProjektSanService.anzahlWohnungen.min),
          Validators.max(this.formProjektSanService.anzahlWohnungen.max),
        ],
      ],
      konstruktion: new FormControl(
        this.formProjektSanService.konstruktionOptions[0].value
      ),
      energiestandard: new FormControl(
        this.formProjektSanService.energiestandardOptions[0].value
      ),
      zertifizierung: new FormControl(
        this.formProjektSanService.zertifizierungOptions[0].value
      ),
      worstPerformingBuilding: new FormControl(
        this.formProjektSanService.worstPerformingBuilding
      ),
      serielleSanierung: new FormControl(
        this.formProjektSanService.serielleSanierung
      ),
      zustandBestand: new FormControl(
        this.formProjektSanService.zustandBestandOptions[0].value
      ),
      eeKlasse: new FormControl(this.formProjektSanService.eeKlasse),
    });

    // Wohnflaeche
    this.projektFormSan
      .get('wohnflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormSan
          .get('wohnflaeche')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formProjektSanService.setWohnflaeche(value);
      });

    this.projektFormSan.get('wohnflaeche')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      this.projektFormSan
        .get('wohnflaecheRange')
        ?.setValue(value, { emitEvent: false });
      // Also updates the FormProjektService
      this.formProjektSanService.setWohnflaeche(value);
    });

    // Anzahl WohnungenRange
    this.projektFormSan
      .get('anzahlWohnungenRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormSan
          .get('anzahlWohnungen')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formProjektSanService.setAnzahlWohnungen(value);
      });

    this.projektFormSan
      .get('anzahlWohnungen')
      ?.valueChanges.subscribe((value) => {
        // Update range input when number input changes
        this.projektFormSan
          .get('anzahlWohnungenRange')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formProjektSanService.setAnzahlWohnungen(value);
      });

    // Energiestandard
    this.projektFormSan
      .get('energiestandard')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formProjektSanService.setEnergiestandard(value);
      });

    // Konstruktion
    this.projektFormSan.get('konstruktion')?.valueChanges.subscribe((value) => {
      // Updates the sanierungService
      this.formProjektSanService.setKonstruktion(value);
    });

    // Zertifizierung
    this.projektFormSan
      .get('zertifizierung')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formProjektSanService.setZertifizierung(value);
      });
    // Worst Performing Building
    this.projektFormSan
      .get('worstPerformingBuilding')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formProjektSanService.setWpc(value);
      });

    // Serielle Sanierung
    this.projektFormSan
      .get('serielleSanierung')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formProjektSanService.setSerielleSanierung(value);
      });

    // Zustand Bestand
    this.projektFormSan
      .get('zustandBestand')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formProjektSanService.setZustandBestand(value);
      });

    // EE Klasse
    this.projektFormSan.get('eeKlasse')?.valueChanges.subscribe((value) => {
      // Updates the sanierungService
      this.formProjektSanService.setEeKlasse(value);
    });
  }

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
