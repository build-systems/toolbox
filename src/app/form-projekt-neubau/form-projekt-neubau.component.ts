import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormProjektNeuService } from './form-projekt-neu.service';

@Component({
  selector: 'app-form-projekt-neubau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-projekt-neubau.component.html',
  styleUrl: './form-projekt-neubau.component.css',
  host: {
    class: 'container-forms',
  },
})
export class FormProjektNeubauComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  // The reactive forms do two things:
  // Update the bi-directional number fields (input <-> range).
  // Update the form service.

  constructor(
    private fb: FormBuilder,
    public formProjektNeuService: FormProjektNeuService
  ) {}

  // Inititalize projekt form
  projektFormNeu!: FormGroup;

  ngOnInit(): void {
    this.projektFormNeu = this.fb.group({
      // These are form controls that go into the html
      wohnflaecheRange: [
        // The values come from the FormProjektService
        this.formProjektNeuService.wohnflaeche.init,
        [
          Validators.min(this.formProjektNeuService.wohnflaeche.min),
          Validators.max(this.formProjektNeuService.wohnflaeche.max),
        ],
      ],
      wohnflaeche: [
        this.formProjektNeuService.wohnflaeche.init,
        [
          Validators.min(this.formProjektNeuService.wohnflaeche.min),
          Validators.max(this.formProjektNeuService.wohnflaeche.max),
        ],
      ],
      anzahlWohnungenRange: [
        this.formProjektNeuService.anzahlWohnungen.init,
        [
          Validators.min(this.formProjektNeuService.anzahlWohnungen.min),
          Validators.max(this.formProjektNeuService.anzahlWohnungen.max),
        ],
      ],
      anzahlWohnungen: [
        this.formProjektNeuService.anzahlWohnungen.init,
        [
          Validators.min(this.formProjektNeuService.anzahlWohnungen.min),
          Validators.max(this.formProjektNeuService.anzahlWohnungen.max),
        ],
      ],
      konstruktion: new FormControl(
        this.formProjektNeuService.konstruktionOptions[0].value
      ),
      energiestandard: new FormControl(
        this.formProjektNeuService.energiestandardOptions[0].value
      ),
      zertifizierung: new FormControl(
        this.formProjektNeuService.zertifizierungOptions[0].value
      ),
      // Details
      kellergeschossIn: new FormControl(
        this.formProjektNeuService.kellergeschossOptions[0].value
      ),
      stellplaetzeIn: new FormControl(
        this.formProjektNeuService.stellplaetzeOptions[0].value
      ),
      aufzugsanlageIn: new FormControl(
        this.formProjektNeuService.aufzugsanlageOptions[0].value
      ),
      barrierefreiheitIn: new FormControl(
        this.formProjektNeuService.barrierefreiheitOptions[0].value
      ),
      dachbegruenungIn: new FormControl(
        this.formProjektNeuService.dachbegruenungOptions[0].value
      ),
      baustellenlogistikIn: new FormControl(
        this.formProjektNeuService.baustellenlogistikOptions[0].value
      ),
      aussenanlagenIn: new FormControl(
        this.formProjektNeuService.aussenanlagenOptions[0].value
      ),
      grundstuecksbezogeneKostenRange: [
        this.formProjektNeuService.grundstKosten.init,
        [
          Validators.min(this.formProjektNeuService.grundstKosten.min),
          Validators.max(this.formProjektNeuService.grundstKosten.max),
        ],
      ],
      grundstuecksbezogeneKosten: [
        this.formProjektNeuService.grundstKosten.init,
        [
          Validators.min(this.formProjektNeuService.grundstKosten.min),
          Validators.max(this.formProjektNeuService.grundstKosten.max),
        ],
      ],
      baunebenkostenKeinFinRange: [
        this.formProjektNeuService.baunebenkostenKeinFin.init,
        [
          Validators.min(this.formProjektNeuService.baunebenkostenKeinFin.min),
          Validators.max(this.formProjektNeuService.baunebenkostenKeinFin.max),
        ],
      ],
      baunebenkostenKeinFin: [
        this.formProjektNeuService.baunebenkostenKeinFin.init,
        [
          Validators.min(this.formProjektNeuService.baunebenkostenKeinFin.min),
          Validators.max(this.formProjektNeuService.baunebenkostenKeinFin.max),
        ],
      ],
    });

    // Wohnflaeche
    this.projektFormNeu
      .get('wohnflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormNeu
          .get('wohnflaeche')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formProjektNeuService.setWohnflaeche(value);
      });

    this.projektFormNeu.get('wohnflaeche')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      this.projektFormNeu
        .get('wohnflaecheRange')
        ?.setValue(value, { emitEvent: false });
      // Also updates the FormProjektService
      this.formProjektNeuService.setWohnflaeche(value);
    });

    // Anzahl WohnungenRange
    this.projektFormNeu
      .get('anzahlWohnungenRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormNeu
          .get('anzahlWohnungen')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formProjektNeuService.setAnzahlWohnungen(value);
      });

    this.projektFormNeu
      .get('anzahlWohnungen')
      ?.valueChanges.subscribe((value) => {
        // Update range input when number input changes
        this.projektFormNeu
          .get('anzahlWohnungenRange')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formProjektNeuService.setAnzahlWohnungen(value);
      });

    // Energiestandard
    this.projektFormNeu
      .get('energiestandard')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formProjektNeuService.setEnergiestandard(value);
      });

    // Konstruktion
    this.projektFormNeu.get('konstruktion')?.valueChanges.subscribe((value) => {
      // Updates the sanierungService
      this.formProjektNeuService.setKonstruktion(value);
    });

    // Zertifizierung
    this.projektFormNeu
      .get('zertifizierung')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formProjektNeuService.setZertifizierung(value);
      });

      
    // Susbscribe to form changes
    this.projektFormNeu.get('kellergeschossIn')?.valueChanges.subscribe(value => {
      this.formProjektNeuService.setKellergeschoss(value);
      // If 'Nicht Vorhanden' is selected, then Tiefgarage is unsellected
      const stellplaetzeIn = this.projektFormNeu.get('stellplaetzeIn');
      if (value === "Nicht Vorhanden" && stellplaetzeIn?.value === "Tiefgarage"){
        stellplaetzeIn?.setValue(null);
      }
    });
    this.projektFormNeu.get('stellplaetzeIn')?.valueChanges.subscribe(value => {
      this.formProjektNeuService.setStellplaetzeIn(value);
      // If 'Tiefgarage' is selected, then 'Nicht Vorhanden' is unsellected
      const kellergeschossIn = this.projektFormNeu.get('kellergeschossIn');
      if (value === "Tiefgarage" && kellergeschossIn?.value === "Nicht Vorhanden"){
        kellergeschossIn?.setValue("Vorhanden");
      }
    });
    this.projektFormNeu.get('aufzugsanlageIn')?.valueChanges.subscribe(value => {
      this.formProjektNeuService.setAufzugsanlageIn(value);
    });
    this.projektFormNeu.get('barrierefreiheitIn')?.valueChanges.subscribe(value => {
      this.formProjektNeuService.setBarrierefreiheitIn(value);
    });
    this.projektFormNeu.get('dachbegruenungIn')?.valueChanges.subscribe(value => {
      this.formProjektNeuService.setDachbegruenungIn(value);
    });
    this.projektFormNeu.get('baustellenlogistikIn')?.valueChanges.subscribe(value => {
      this.formProjektNeuService.setBaustellenlogistikIn(value);
    });
    this.projektFormNeu.get('aussenanlagenIn')?.valueChanges.subscribe(value => {
      this.formProjektNeuService.setAussenanlagenIn(value);
    });
    this.projektFormNeu.get('grundstuecksbezogeneKostenRange')?.valueChanges.subscribe(value => {
      this.projektFormNeu.get('grundstuecksbezogeneKosten')?.setValue(value, { emitEvent: false });
      this.formProjektNeuService.setGrundstuecksbezogeneKosten(value);
    });
    this.projektFormNeu.get('grundstuecksbezogeneKosten')?.valueChanges.subscribe(value => {
      this.projektFormNeu.get('grundstuecksbezogeneKostenRange')?.setValue(value, { emitEvent: false });
      this.formProjektNeuService.setGrundstuecksbezogeneKosten(value);
    });
    this.projektFormNeu.get('baunebenkostenKeinFinRange')?.valueChanges.subscribe(value => {
      this.projektFormNeu.get('baunebenkostenKeinFin')?.setValue(value, { emitEvent: false });
      this.formProjektNeuService.setBaunebenkostenKeinFin(value);
    });
    this.projektFormNeu.get('baunebenkostenKeinFin')?.valueChanges.subscribe(value => {
      this.projektFormNeu.get('baunebenkostenKeinFinRange')?.setValue(value, { emitEvent: false });
      this.formProjektNeuService.setBaunebenkostenKeinFin(value);
    });
  }

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
