import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parameter-darlehen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parameter-darlehen.component.html',
  styleUrl: './parameter-darlehen.component.css'
})
export class ParameterDarlehenComponent {
  kfWDarlehen = [
    {id: "1", value: "kein Darlehen"},
    {id: "2", value: "Annuitätendarlehen"},
    {id: "3", value: "Endfälliges Darlehen"}
  ]
  
  bankDarlehen = [
    {id: "1", value: "Annuitätendarlehen"},
    {id: "2", value: "Endfälliges Darlehen"}
  ]
  
  darlehenForm = new FormGroup({
    kalkRealzins: new FormControl('4'),
    kreditlaufzeit: new FormControl('20'),
    kfWDarlehen: new FormControl('Annuitätendarlehen'),
    bankDarlehen: new FormControl('Annuitätendarlehen'),
  })

  @Output() formDarlehenChanged = new EventEmitter<any>();

  constructor() {
    this.darlehenForm.valueChanges.subscribe((values) => {
      this.formDarlehenChanged.emit(values);
    });
  }
}
