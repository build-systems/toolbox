import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormNeubauService } from './form-neubau.service';

@Component({
  selector: 'app-form-neubau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-neubau.component.html',
  styleUrl: './form-neubau.component.css'
})
export class FormNeubauComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-neubau.service.ts

  neubauForm!: FormGroup;

  constructor(private fb: FormBuilder, public formService: FormNeubauService) { }

  ngOnInit(): void {
    this.neubauForm = this.fb.group({
      konstruktion: new FormControl(this.formService.konstructionOptions[0].value),
      kellergeschossIn: new FormControl(this.formService.kellergeschossOptions[0].value),
      stellplaetzeIn: new FormControl(this.formService.stellplaetzeOptions[0].value),
      aufzugsanlageIn: new FormControl(this.formService.aufzugsanlageOptions[0].value),
      barrierefreiheitIn: new FormControl(this.formService.barrierefreiheitOptions[0].value),
      dachbegruenungIn: new FormControl(this.formService.dachbegruenungOptions[0].value),
      baustellenlogistikIn: new FormControl(this.formService.baustellenlogistikOptions[0].value),
      aussenanlagenIn: new FormControl(this.formService.aussenanlagenOptions[0].value),
      grundstuecksbezogeneKostenRange: [this.formService.grundstKosten.init, [Validators.min(this.formService.grundstKosten.min), Validators.max(this.formService.grundstKosten.max)]],
      grundstuecksbezogeneKosten: [this.formService.grundstKosten.init, [Validators.min(this.formService.grundstKosten.min), Validators.max(this.formService.grundstKosten.max)]],
      baunebenkostenKeinFinRange: [this.formService.baunebenkostenKeinFin.init, [Validators.min(this.formService.baunebenkostenKeinFin.min), Validators.max(this.formService.baunebenkostenKeinFin.max)]],
      baunebenkostenKeinFin: [this.formService.baunebenkostenKeinFin.init, [Validators.min(this.formService.baunebenkostenKeinFin.min), Validators.max(this.formService.baunebenkostenKeinFin.max)]],
    });

    // Konstruktion
    this.neubauForm.get('konstruktion')?.valueChanges.subscribe(value => {
      // Updates the sanierungService
      this.formService.setKonstruktion(value);
    });

    this.neubauForm.get('kellergeschossIn')?.valueChanges.subscribe(value => {
      this.formService.setKellergeschoss(value);
    });
    this.neubauForm.get('stellplaetzeIn')?.valueChanges.subscribe(value => {
      this.formService.setStellplaetzeIn(value);
    });
    this.neubauForm.get('aufzugsanlageIn')?.valueChanges.subscribe(value => {
      this.formService.setAufzugsanlageIn(value);
    });
    this.neubauForm.get('barrierefreiheitIn')?.valueChanges.subscribe(value => {
      this.formService.setBarrierefreiheitIn(value);
    });
    this.neubauForm.get('dachbegruenungIn')?.valueChanges.subscribe(value => {
      this.formService.setDachbegruenungIn(value);
    });
    this.neubauForm.get('baustellenlogistikIn')?.valueChanges.subscribe(value => {
      this.formService.setBaustellenlogistikIn(value);
    });
    this.neubauForm.get('aussenanlagenIn')?.valueChanges.subscribe(value => {
      this.formService.setAussenanlagenIn(value);
    });
    this.neubauForm.get('grundstuecksbezogeneKostenRange')?.valueChanges.subscribe(value => {
      this.neubauForm.get('grundstuecksbezogeneKosten')?.setValue(value, { emitEvent: false });
      this.formService.setGrundstuecksbezogeneKosten(value);
    });
    this.neubauForm.get('grundstuecksbezogeneKosten')?.valueChanges.subscribe(value => {
      this.neubauForm.get('grundstuecksbezogeneKostenRange')?.setValue(value, { emitEvent: false });
      this.formService.setGrundstuecksbezogeneKosten(value);
    });
    this.neubauForm.get('baunebenkostenKeinFinRange')?.valueChanges.subscribe(value => {
      this.neubauForm.get('baunebenkostenKeinFin')?.setValue(value, { emitEvent: false });
      this.formService.setBaunebenkostenKeinFin(value);
    });
    this.neubauForm.get('baunebenkostenKeinFin')?.valueChanges.subscribe(value => {
      this.neubauForm.get('baunebenkostenKeinFinRange')?.setValue(value, { emitEvent: false });
      this.formService.setBaunebenkostenKeinFin(value);
    });
  }

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}