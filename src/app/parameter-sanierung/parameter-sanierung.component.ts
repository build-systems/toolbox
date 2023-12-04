import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parameter-sanierung',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parameter-sanierung.component.html',
  styleUrl: './parameter-sanierung.component.css'
})
export class ParameterSanierungComponent {
  zustandBestand = [
    {id: "1", value: "Unsaniert"},
    {id: "2", value: "Teilsaniert"},
    {id: "3", value: "Umfassend saniert"}
  ]

  sanierungForm = new FormGroup({
    worstPerformingBuilding: new FormControl(true),
    serielleSanierung: new FormControl(true),
    zustandBestand: new FormControl('Unsaniert'),
    eeKlasse: new FormControl(true),
  })

  @Output() formSanierungChanged = new EventEmitter<any>();

  constructor() {
    this.sanierungForm.valueChanges.subscribe((values) => {
      this.formSanierungChanged.emit(values);
    });
  }
}
