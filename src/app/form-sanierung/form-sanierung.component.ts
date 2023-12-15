import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-sanierung',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-sanierung.component.html',
  styleUrl: './form-sanierung.component.css'
})
export class FormSanierungComponent {
  zustandBestand = [
    {id: "zusbest1", value: "Unsaniert"},
    {id: "zusbest2", value: "Teilsaniert"},
    {id: "zusbest3", value: "Umfassend saniert"}
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
