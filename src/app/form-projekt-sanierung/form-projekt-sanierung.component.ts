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
    class: 'host-forms',
  },
})
export class FormProjektSanierungComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  // The reactive forms do two things:
  // Update the bi-directional number fields (input <-> range).
  // Update the form service.

  // public withUserPrice: boolean = false;
    // Zertifizierung warning: if user try to select conflicting
  public noQNG: boolean = false;

  constructor(
    private fb: FormBuilder,
    public formService: FormProjektSanService
  ) {}

  // Inititalize projekt form
  projektFormSan!: FormGroup;

  ngOnInit(): void {
    this.projektFormSan = this.fb.group({
      // These are form controls that go into the html
      userPriceToggle: new FormControl(false),
      userPriceRange: [
        this.formService.userPrice.init, // init
        [
          Validators.min(this.formService.userPrice.min),
          Validators.max(this.formService.userPrice.max),
        ],
      ],
      userPrice: [
        this.formService.userPrice.init, // init
        [
          Validators.min(this.formService.userPrice.min),
          Validators.max(this.formService.userPrice.max),
        ],
      ],
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
        this.formService.energiestandard.options[0].value
      ),
      zertifizierung: new FormControl(
        this.formService.zertifizierung.options[0].value
      ),
      worstPerformingBuilding: new FormControl(
        this.formService.worstPerformingBuilding
      ),
      serielleSanierung: new FormControl(this.formService.serielleSanierung),
      zustandBestand: new FormControl(
        this.formService.zustandBestand.options[0].value
      ),
      eeKlasse: new FormControl(this.formService.eeKlasse),
    });

        //User price
        this.projektFormSan
        .get('userPriceToggle')
        ?.valueChanges.subscribe((value) => {
          this.formService.setUserPriceToggle(value);
        });
  
      this.projektFormSan
        .get('userPriceRange')
        ?.valueChanges.subscribe((value) => {
          this.projektFormSan
            .get('userPrice')
            ?.setValue(value, { emitEvent: false });
          this.formService.setUserPrice(value);
        });
  
      this.projektFormSan.get('userPrice')?.valueChanges.subscribe((value) => {
        this.projektFormSan
          .get('userPriceRange')
          ?.setValue(value, { emitEvent: false });
          this.formService.setUserPrice(value);
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
        this.formService.setWohnflaeche(value);
      });

    this.projektFormSan.get('wohnflaeche')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      this.projektFormSan
        .get('wohnflaecheRange')
        ?.setValue(value, { emitEvent: false });
      // Also updates the FormProjektService
      this.formService.setWohnflaeche(value);
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
        this.formService.setAnzahlWohnungen(value);
      });

    this.projektFormSan
      .get('anzahlWohnungen')
      ?.valueChanges.subscribe((value) => {
        // Update range input when number input changes
        this.projektFormSan
          .get('anzahlWohnungenRange')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formService.setAnzahlWohnungen(value);
      });

    // Energiestandard
    this.projektFormSan
      .get('energiestandard')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formService.setEnergiestandard(value);
        // Relationship with Zertifizierung
        const zertifizierung = this.projektFormSan.get('zertifizierung');
        if (value != 'EH 40') {
          if (zertifizierung?.value === 'QNG') {
            zertifizierung?.setValue('Keine Zertifizierung');
          }
          // Disable mit QNG Siegel
          this.formService.zertifizierung.options[0].disabled = true;
          this.noQNG = true;
        } else {
          // Enable mit QNG Siegel
          this.formService.zertifizierung.options[0].disabled = false;
          this.noQNG = false;
        }
      });

    // Zertifizierung
    this.projektFormSan
      .get('zertifizierung')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formService.setZertifizierung(value);
        // Relationship with Energiestandard
        const energiestandard = this.projektFormSan.get('energiestandard');
        if (value === 'QNG' && energiestandard?.value != 'EH 40') {
          energiestandard?.setValue('EH 40');
          this.noQNG = true;
        } else {
          this.noQNG = false;
        }
      });
    // Worst Performing Building
    this.projektFormSan
      .get('worstPerformingBuilding')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formService.setWpc(value);
      });

    // Serielle Sanierung
    this.projektFormSan
      .get('serielleSanierung')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formService.setSerielleSanierung(value);
      });

    // Zustand Bestand
    this.projektFormSan
      .get('zustandBestand')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formService.setZustandBestand(value);
      });

    // EE Klasse
    this.projektFormSan.get('eeKlasse')?.valueChanges.subscribe((value) => {
      // Updates the sanierungService
      this.formService.setEeKlasse(value);
    });
  }

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
