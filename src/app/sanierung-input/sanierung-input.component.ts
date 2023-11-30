import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sanierung-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sanierung-input.component.html',
  styleUrl: './sanierung-input.component.css'
})
export class SanierungInputComponent {
  defaultEnergiestandard = "EH 40";
  energiestandard = [
    {id: "1", value: "EH 40"},
    {id: "2", value: "EH 55"},
    {id: "3", value: "EH 70"},
    {id: "4", value: "EH 100"},
    {id: "5", value: "EH 115"},
  ]

  defaultKonstruktion = "Konventionell";
  konstruktion = [
    {id: "1", value: "Konventionell"},
    {id: "2", value: "Holzbau"}
  ]

  defaultZertifizierung = "Keine Zertifizierung";
  zertifizierung = [
    {id: "1", value: "Keine Zertifizierung"},
    {id: "2", value: "QNG"}
  ]

  projektForm = new FormGroup({
    wohnflaeche: new FormControl(''),
    anzahlWohnungen: new FormControl(''),
    energiestandard: new FormControl(''),
    konstruktion: new FormControl(''),
    zertifizierung: new FormControl(''),
  });

  defaultZustandBestand = "Unsaniert";
  zustandBestand = [
    {id: "1", value: "Unsaniert"},
    {id: "2", value: "Teilsaniert"},
    {id: "3", value: "Umfassend saniert"}
  ]

  sanierungForm = new FormGroup({
    worstPerformingBuilding: new FormControl(''),
    serielleSanierung: new FormControl(''),
    zustandBestand: new FormControl(''),
    eeKlasse: new FormControl(''),
  })

  defaultKfWDarlehen = "kein Darlehen";
  kfWDarlehen = [
    {id: "1", value: "kein Darlehen"},
    {id: "2", value: "Annuitätendarlehen"},
    {id: "3", value: "Endfälliges Darlehen"}
  ]
  
  defaultBankDarlehen = "Annuitätendarlehen";
  bankDarlehen = [
    {id: "1", value: "Annuitätendarlehen"},
    {id: "2", value: "Endfälliges Darlehen"}
  ]
  
  darlehen = new FormGroup({
    kalkRealzins: new FormControl(''),
    kreditlaufzeit: new FormControl(''),
    kfWDarlehen: new FormControl(''),
    bankDarlehen: new FormControl(''),
  })
}
