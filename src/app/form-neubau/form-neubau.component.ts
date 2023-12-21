import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NeubauService } from '../neubau.service';

@Component({
  selector: 'app-form-neubau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-neubau.component.html',
  styleUrl: './form-neubau.component.css'
})
export class FormNeubauComponent implements OnInit {

  // Konstruktion
  konstruktion = [
    {id: "konst1", value: "Konventionell"},
    {id: "konst2", value: "Holzbau"}
  ]

  // Kellergeschoss
  kellergeschossIn = [
    {id: "keller1", value: "Vorhanden"},
    {id: "keller2", value: "Nicht Vorhanden"},
  ]
  
  // Stellplätze
  stellplaetzeIn = [
    {id: "stelpla1", value: "Tiefgarage"},
    {id: "stelpla2", value: "Parkpalette"},
    {id: "stelpla3", value: "Garage"},
  ]
  
  // Aufzugsanlage
  aufzugsanlageIn = [
    {id: "aufzugs1", value: "Vorhanden"},
    {id: "aufzugs2", value: "Nicht Vorhanden"},
  ]
  
  // Barrierefreies Bauen
  barrierefreiheitIn = [
    {id: "barfrei1", value: "Reduziert"},
    {id: "barfrei2", value: "Frei"},
    {id: "barfrei3", value: "Frei (R)"},
    {id: "barfrei4", value: "Keine Anforderungen"},
  ]
  // barrierefreiheitIn = [
  //   {id: "barfrei1", value: "Barrierereduziert"},
  //   {id: "barfrei2", value: "Barrierefrei"},
  //   {id: "barfrei3", value: "Barrierefrei (R)"},
  //   {id: "barfrei4", value: "Keine Anforderungen"},
  // ]
  
  // Dachbegrünung
  dachbegruenungIn = [
    {id: "dachbeg1", value: "Vorhanden"},
    {id: "dachbeg2", value: "Nicht Vorhanden"},
  ]
  
  // Anspruchsvolle Baustellenlogistik
  baustellenlogistikIn = [
    {id: "baustlog1", value: "Vorhanden"},
    {id: "baustlog2", value: "Nicht Vorhanden"},
  ]
  
  // Außenanlagen
  aussenanlagenIn = [
    {id: "auslag1", value: "Gering"},
    {id: "auslag2", value: "Mittel"},
    {id: "auslag3", value: "Hoch"},
  ]

  // Grundstücksbezogene Kosten
  grundstKosten = {
    min: 0,
    init: 0,
    max: 200,
    step: 1
  }

  // Baunebenkosten (excl. Finanzierung)
  baunebenkostenKeinFin = {
    min: 0,
    init: 0,
    max: 200,
    step: 1
  }

  neubauForm!: FormGroup;

  constructor(private fb: FormBuilder, private neubauService: NeubauService) { }

  ngOnInit(): void {
    this.neubauForm = this.fb.group({
      konstruktion: new FormControl(this.konstruktion[0].value),
      kellergeschossIn: new FormControl(this.kellergeschossIn[0].value),
      stellplaetzeIn: new FormControl(this.stellplaetzeIn[0].value),
      aufzugsanlageIn: new FormControl(this.aufzugsanlageIn[0].value),
      barrierefreiheitIn: new FormControl(this.barrierefreiheitIn[0].value),
      dachbegruenungIn: new FormControl(this.dachbegruenungIn[0].value),
      baustellenlogistikIn: new FormControl(this.baustellenlogistikIn[0].value),
      aussenanlagenIn: new FormControl(this.aussenanlagenIn[0].value),
      grundstuecksbezogeneKostenRange: [this.grundstKosten.init, [Validators.min(this.grundstKosten.min), Validators.max(this.grundstKosten.max)]],
      grundstuecksbezogeneKosten: [this.grundstKosten.init, [Validators.min(this.grundstKosten.min), Validators.max(this.grundstKosten.max)]],
      baunebenkostenKeinFinRange: [this.baunebenkostenKeinFin.init, [Validators.min(this.baunebenkostenKeinFin.min), Validators.max(this.baunebenkostenKeinFin.max)]],
      baunebenkostenKeinFin: [this.baunebenkostenKeinFin.init, [Validators.min(this.baunebenkostenKeinFin.min), Validators.max(this.baunebenkostenKeinFin.max)]],
    });

    // Konstruktion
    this.neubauForm.get("konstruktion")?.valueChanges.subscribe(value => {
      // Updates the sanierungService
      this.neubauService.setKonstruktion(value);
    });
  }

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
