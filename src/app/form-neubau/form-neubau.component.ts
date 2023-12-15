import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-neubau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-neubau.component.html',
  styleUrl: './form-neubau.component.css'
})
export class FormNeubauComponent {
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
}
