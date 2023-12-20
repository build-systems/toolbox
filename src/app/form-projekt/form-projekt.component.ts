import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SanierungService } from '../sanierung.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-form-projekt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-projekt.component.html',
  styleUrl: './form-projekt.component.css'
})
export class FormProjektComponent implements OnInit {
  currentRoute!: string;

  // Wohnfläche centralized form values
  wohnflaeche = {
    min: 50,
    init: 5000,
    max: 50_000,
    step: 50
  }
  
  // Anzahl Wohnungen centralized form values
  anzahlWohnungen = {
    min: 1,
    init: 50,
    max: 1000,
    step: 1
  }
  
  // Energiestandard centralized form values
  energiestandard = [
    {id: "enstd1", value: "EH 40"},
    {id: "enstd2", value: "EH 55"},
    {id: "enstd3", value: "EH 70"},
    {id: "enstd4", value: "EH 100"},
    {id: "enstd5", value: "EH 115"},
  ]
  
  // Konstruktion centralized form values
  konstruktion = [
    {id: "konst1", value: "Konventionell"},
    {id: "konst2", value: "Holzbau"}
  ]
  
  // Zertifizierung centralized form values
  zertifizierung = [
    {id: "zert1", value: "Keine Zertifizierung"},
    {id: "zert2", value: "QNG"}
  ]

  // Inititalize projekt form
  projektForm!: FormGroup;

  constructor(private fb: FormBuilder, private sanierungService: SanierungService, private router: Router) {
    // Router observable: used to hide the 'Konstruktion' part of the form for not Neubau
    router.events.subscribe((val) => {
      // Check if val is NavigationEnd (it has many actions until this last one)
      if (val instanceof NavigationEnd)
        // Then assign the url as a string 
        this.currentRoute = this.router.url.toString();
    });
  }

  ngOnInit(): void {
      this.projektForm = this.fb.group({
      wohnflaecheRange: [this.wohnflaeche.init, [Validators.min(this.wohnflaeche.min), Validators.max(this.wohnflaeche.max)]],
      wohnflaeche: [this.wohnflaeche.init, [Validators.min(this.wohnflaeche.min), Validators.max(this.wohnflaeche.max)]],
      anzahlWohnungenRange: [this.anzahlWohnungen.init, [Validators.min(this.anzahlWohnungen.min), Validators.max(this.anzahlWohnungen.max)]],
      anzahlWohnungen: [this.anzahlWohnungen.init, [Validators.min(this.anzahlWohnungen.min), Validators.max(this.anzahlWohnungen.max)]],
      energiestandard: new FormControl(this.energiestandard[0].value),
      konstruktion: new FormControl(this.konstruktion[0].value),
      zertifizierung: new FormControl(this.zertifizierung[0].value),
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

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
