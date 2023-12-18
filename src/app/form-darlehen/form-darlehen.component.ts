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
  defaultkfWDarlehen: KfWDarlehen = "Annuitäten";
  kfWDarlehen = [
    {id: "kfwd1", value: "kein"},
    {id: "kfwd2", value: "Annuitäten"},
    {id: "kfwd3", value: "Endfälliges"}
  ]
  
  defaultbankDarlehen: BankDarlehen = "Annuitäten";
  bankDarlehen = [
    {id: "bankd1", value: "Annuitäten"},
    {id: "bankd2", value: "Endfälliges"}
  ]
  
  darlehenForm!: FormGroup;

  constructor(private fb: FormBuilder, private sanierungService: SanierungService) {}

  ngOnInit(): void {
    this.darlehenForm = this.fb.group({
      kalkRealzinsRange: [4, [Validators.min(0), Validators.max(100)]],
      kalkRealzins: [4, [Validators.min(0), Validators.max(100)]],
      kreditlaufzeitRange: [20, [Validators.min(1), Validators.max(50)]],
      kreditlaufzeit: [20, [Validators.min(1), Validators.max(50)]],
      kfWDarlehen: new FormControl(this.defaultkfWDarlehen),
      bankDarlehen: new FormControl(this.defaultbankDarlehen),
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
