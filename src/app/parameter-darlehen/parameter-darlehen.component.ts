import { Component } from '@angular/core';
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
