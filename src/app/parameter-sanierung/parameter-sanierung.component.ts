import { Component } from '@angular/core';
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
}
