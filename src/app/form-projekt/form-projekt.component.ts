import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SanierungService } from '../sanierung.service';

@Component({
  selector: 'app-form-projekt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-projekt.component.html',
  styleUrl: './form-projekt.component.css'
})
export class FormProjektComponent implements OnInit {
  defaultEnStd = "EH 40";
  energiestandard = [
    {id: "enstd1", value: "EH 40"},
    {id: "enstd2", value: "EH 55"},
    {id: "enstd3", value: "EH 70"},
    {id: "enstd4", value: "EH 100"},
    {id: "enstd5", value: "EH 115"},
  ]

  konstruktion = [
    {id: "konst1", value: "Konventionell"},
    {id: "konst2", value: "Holzbau"}
  ]

  zertifizierung = [
    {id: "zert1", value: "Keine Zertifizierung"},
    {id: "zert2", value: "QNG"}
  ]

  // Inititalize projekt form
  projektForm!: FormGroup;

  constructor(private fb: FormBuilder, private sanierungService: SanierungService) {}

  ngOnInit(): void {
      this.projektForm = this.fb.group({
      wohnflaecheRange: [5000, [Validators.min(100), Validators.max(50_000)]],
      wohnflaeche: [5000, [Validators.min(100), Validators.max(50_000)]],
      anzahlWohnungenRange: [50, [Validators.min(0), Validators.max(1000)]],
      anzahlWohnungen: [50, [Validators.min(0), Validators.max(1000)]],
      energiestandard: new FormControl('EH 40'),
      konstruktion: new FormControl('Konventionell'),
      zertifizierung: new FormControl('Keine Zertifizierung'),
    });

    // Wohnflaeche
    this.projektForm.get("wohnflaecheRange")?.valueChanges.subscribe(value => {
      // Update number input when range input changes
      this.projektForm.get("wohnflaeche")?.setValue(value, {emitEvent: false});
      // Also updates the sanierungService
      this.sanierungService.setWohnflaeche(value);
    });

    this.projektForm.get("wohnflaeche")?.valueChanges.subscribe(value => {
      // Update range input when number input changes
      this.projektForm.get("wohnflaecheRange")?.setValue(value, {emitEvent: false});
      // Also updates the sanierungService
      this.sanierungService.setWohnflaeche(value);
    });
    
    // Anzahl WohnungenRange
    this.projektForm.get("anzahlWohnungenRange")?.valueChanges.subscribe(value => {
      // Update number input when range input changes
      this.projektForm.get("anzahlWohnungen")?.setValue(value, {emitEvent: false});
      // Also updates the sanierungService
      this.sanierungService.setAnzahlWohnungen(value);
    });
    
    this.projektForm.get("anzahlWohnungen")?.valueChanges.subscribe(value => {
      // Update range input when number input changes
      this.projektForm.get("anzahlWohnungenRange")?.setValue(value, {emitEvent: false});
      // Also updates the sanierungService
      this.sanierungService.setAnzahlWohnungen(value);
    });
    
    // Energiestandard
    this.projektForm.get("energiestandard")?.valueChanges.subscribe(value => {
      // Updates the sanierungService
      this.sanierungService.setEnergiestandard(value);
    });
    
    // Konstruktion
    this.projektForm.get("konstruktion")?.valueChanges.subscribe(value => {
      // Updates the sanierungService
      this.sanierungService.setKonstruktion(value);
    });

    // Zertifizierung
    this.projektForm.get("zertifizierung")?.valueChanges.subscribe(value => {
      // Updates the sanierungService
      this.sanierungService.setZertifizierung(value);
    });
  }

  // Subscribe to form changes and update the service


  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
