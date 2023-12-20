import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SanierungService } from '../sanierung.service';

@Component({
  selector: 'app-form-darlehen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-darlehen.component.html',
  styleUrl: './form-darlehen.component.css'
})
export class FormDarlehenComponent implements OnInit {
  // Kalkulationszinssatz (Realzins) centralized form values
  kalkRealzins = {
    min: 0,
    init: 4,
    max: 100,
    step: 1
  }

  // Kreditlaufzeit centralized form values
  kreditlaufzeit = {
    min: 0,
    init: 20,
    max: 50,
    step: 1
  }

  // KfW-Darlehen centralized form values
  kfWDarlehen = [
    {id: "kfwd1", value: "kein"},
    {id: "kfwd2", value: "Annuitäten"},
    {id: "kfwd3", value: "Endfälliges"}
  ]
  
  // Bank-Darlehen centralized form values
  bankDarlehen = [
    {id: "bankd1", value: "Annuitäten"},
    {id: "bankd2", value: "Endfälliges"}
  ]
  
  darlehenForm!: FormGroup;

  constructor(private fb: FormBuilder, private sanierungService: SanierungService) {}

  ngOnInit(): void {
    this.darlehenForm = this.fb.group({
      kalkRealzinsRange: [this.kalkRealzins.init, [Validators.min(this.kalkRealzins.min), Validators.max(this.kalkRealzins.max)]],
      kalkRealzins: [this.kalkRealzins.init, [Validators.min(this.kalkRealzins.min), Validators.max(this.kalkRealzins.max)]],
      kreditlaufzeitRange: [this.kreditlaufzeit.init, [Validators.min(this.kreditlaufzeit.min), Validators.max(this.kreditlaufzeit.max)]],
      kreditlaufzeit: [this.kreditlaufzeit.init, [Validators.min(this.kreditlaufzeit.min), Validators.max(this.kreditlaufzeit.max)]],
      kfWDarlehen: new FormControl(this.kfWDarlehen[0]['value']),
      bankDarlehen: new FormControl(this.bankDarlehen[0]['value']),
    });


    // Kalkulationszinssatz (Realzins)    
    this.darlehenForm.get("kalkRealzinsRange")?.valueChanges.subscribe(value => {
      // Update number input when range input changes
      this.darlehenForm.get("kalkRealzins")?.setValue(value, {emitEvent: false});
      // Also updates the sanierungService
      this.sanierungService.setKalkRealzins(value);
    });
    
    this.darlehenForm.get("kalkRealzins")?.valueChanges.subscribe(value => {
      // Update range input when number input changes
      this.darlehenForm.get("kalkRealzinsRange")?.setValue(value, {emitEvent: false});
      // Also updates the sanierungService\
      this.sanierungService.setKalkRealzins(value);
    });
    
    // Kreditlaufzeit
    this.darlehenForm.get("kreditlaufzeitRange")?.valueChanges.subscribe(value => {
      // Update number input when range input changes
      this.darlehenForm.get("kreditlaufzeit")?.setValue(value, {emitEvent: false});
      // Also updates the sanierungService
      this.sanierungService.setKreditlaufzeit(value);
    });

    this.darlehenForm.get("kreditlaufzeit")?.valueChanges.subscribe(value => {
      // Update range input when number input changes
      this.darlehenForm.get("kreditlaufzeitRange")?.setValue(value, {emitEvent: false});
      // Also updates the sanierungService
      this.sanierungService.setKreditlaufzeit(value);
    });

    // KfW Darlehen
    this.darlehenForm.get("kfWDarlehen")?.valueChanges.subscribe(value => {
      // Update the sanierungService
      this.sanierungService.setKfWDarlehen(value);
    })

    // Bank Darlehen
    this.darlehenForm.get("bankDarlehen")?.valueChanges.subscribe(value => {
      // Update the sanierungService
      this.sanierungService.setBankDarlehen(value);
    })
  }
}
