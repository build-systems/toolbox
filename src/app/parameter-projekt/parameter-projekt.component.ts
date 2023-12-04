import { Component, EventEmitter, Output } from '@angular/core';
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
  // defaultEnergiestandard = "EH 40";
  energiestandard = [
    {id: "1", value: "EH 40"},
    {id: "2", value: "EH 55"},
    {id: "3", value: "EH 70"},
    {id: "4", value: "EH 100"},
    {id: "5", value: "EH 115"},
  ]

  konstruktion = [
    {id: "1", value: "Konventionell"},
    {id: "2", value: "Holzbau"}
  ]

  zertifizierung = [
    {id: "1", value: "Keine Zertifizierung"},
    {id: "2", value: "QNG"}
  ]

  projektForm = new FormGroup({
    wohnflaeche: new FormControl('5000'),
    anzahlWohnungen: new FormControl('50'),
    energiestandard: new FormControl('EH 40'),
    konstruktion: new FormControl('Konventionell'),
    zertifizierung: new FormControl('Keine Zertifizierung'),
  });

  @Output() formProjektChanged = new EventEmitter<any>();

  constructor() {
    this.projektForm.valueChanges.subscribe((values) => {
      this.formProjektChanged.emit(values);
    });
  }
}
