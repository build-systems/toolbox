import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-parameter-darlehen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parameter-darlehen.component.html',
  styleUrl: './parameter-darlehen.component.css'
})
export class ParameterDarlehenComponent implements OnInit {
  defaultkfWDarlehen = "Annuitäten";
  kfWDarlehen = [
    {id: "kfwd1", value: "kein"},
    // {id: "kfwd1", value: "kein Darlehen"},
    {id: "kfwd2", value: "Annuitäten"},
    // {id: "kfwd2", value: "Annuitätendarlehen"},
    {id: "kfwd3", value: "Endfälliges"}
    // {id: "kfwd3", value: "Endfälliges Darlehen"}
  ]
  
  defaultbankDarlehen = "Annuitäten";
  bankDarlehen = [
    {id: "bankd1", value: "Annuitäten"},
    // {id: "bankd1", value: "Annuitätendarlehen"},
    {id: "bankd2", value: "Endfälliges"}
    // {id: "bankd2", value: "Endfälliges Darlehen"}
  ]
  
  @Output() formDarlehenChanged = new EventEmitter<any>();
  darlehenForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.darlehenForm = this.fb.group({
      kalkRealzinsRange: [4, [Validators.min(0), Validators.max(100)]],
      kalkRealzins: [4, [Validators.min(0), Validators.max(100)]],
      kreditlaufzeitRange: [20, [Validators.min(1), Validators.max(50)]],
      kreditlaufzeit: [20, [Validators.min(1), Validators.max(50)]],
      kfWDarlehen: new FormControl(this.defaultkfWDarlehen),
      bankDarlehen: new FormControl(this.defaultbankDarlehen),
    });

    this.darlehenForm.get("kalkRealzinsRange")?.valueChanges.subscribe(value => {
        this.darlehenForm.get("kalkRealzins")?.setValue(value, {emitEvent: false});
    });
    this.darlehenForm.get("kalkRealzins")?.valueChanges.subscribe(value => {
      this.darlehenForm.get("kalkRealzinsRange")?.setValue(value, {emitEvent: false});
    });

    this.darlehenForm.get("kreditlaufzeitRange")?.valueChanges.subscribe(value => {
      this.darlehenForm.get("kreditlaufzeit")?.setValue(value, {emitEvent: false});
    });
    this.darlehenForm.get("kreditlaufzeit")?.valueChanges.subscribe(value => {
      this.darlehenForm.get("kreditlaufzeitRange")?.setValue(value, {emitEvent: false});
    })

    this.darlehenForm.valueChanges.subscribe((values) => {
      this.formDarlehenChanged.emit(values);
    });
  }
}
