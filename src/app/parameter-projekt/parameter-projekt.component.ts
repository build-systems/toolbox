import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parameter-projekt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parameter-projekt.component.html',
  styleUrl: './parameter-projekt.component.css'
})
export class ParameterProjektComponent {
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
    wohnflaeche: new FormControl<string | null>(''),
    anzahlWohnungen: new FormControl(''),
    energiestandard: new FormControl(''),
    konstruktion: new FormControl(''),
    zertifizierung: new FormControl(''),
  });

  @Output() sendWohnflaecheEvent = new EventEmitter<any>();
  sendWohnflaeche(value: any) {
    this.sendWohnflaecheEvent.emit(value);
  }
}
