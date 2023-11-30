import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-neubau-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './neubau-input.component.html',
  styleUrl: './neubau-input.component.css'
})
export class NeubauInputComponent {
  projektForm = new FormGroup({
    wohnfläche: new FormControl(''),
    anzahlWohnungen: new FormControl(''),
    energiestandard: new FormControl(''),
    konstruktion: new FormControl(''),
    zertifizierung: new FormControl(''),
  });
  neubauForm = new FormGroup({
    keller: new FormControl(''),
    stellplätze: new FormControl(''),
    redGarage: new FormControl(''),
    aufzugsanlage: new FormControl(''),
    barrierefreiheit: new FormControl(''),
    dachbegrünung: new FormControl(''),
    baustellenlogistik: new FormControl(''),
    energetischer: new FormControl(''),
    stanndard: new FormControl(''),
    außenanlagen: new FormControl(''),
    grundstücksbezogeneKosten: new FormControl(''),
    baunebenkostenKeinFin: new FormControl(''),
  });
  darlehen = new FormGroup({
    kalkRealzins: new FormControl(''),
    kreditlaufzeit: new FormControl(''),
    kfWDarlehen: new FormControl(''),
    bankDarlehen: new FormControl(''),
  })
}
