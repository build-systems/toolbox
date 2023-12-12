import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-parameter-projekt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parameter-projekt.component.html',
  styleUrl: './parameter-projekt.component.css'
})
export class ParameterProjektComponent implements OnInit {
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

  // Creates an output to send the values to parent component
  @Output() formProjektChanged = new EventEmitter<any>();
  // Inititalize projekt form
  projektForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  // constructor(private fb: FormBuilder) {}

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

    // Sync the wohnflaeche
    this.projektForm.get("wohnflaecheRange")?.valueChanges.subscribe(value => {
      this.projektForm.get("wohnflaeche")?.setValue(value, {emitEvent: false});
    });
    this.projektForm.get("wohnflaeche")?.valueChanges.subscribe(value => {
      this.projektForm.get("wohnflaecheRange")?.setValue(value, {emitEvent: false});
    });

    // Sync the anzahlWohnungen
    this.projektForm.get("anzahlWohnungenRange")?.valueChanges.subscribe(value => {
      this.projektForm.get("anzahlWohnungen")?.setValue(value, {emitEvent: false});
    });
    this.projektForm.get("anzahlWohnungen")?.valueChanges.subscribe(value => {
      this.projektForm.get("anzahlWohnungenRange")?.setValue(value, {emitEvent: false});
    });

    this.projektForm.valueChanges.subscribe((values) => {
      this.formProjektChanged.emit(values);
    });
  }
}
