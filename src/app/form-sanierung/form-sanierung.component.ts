import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SanierungService } from '../sanierung.service';

@Component({
  selector: 'app-form-sanierung',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-sanierung.component.html',
  styleUrl: './form-sanierung.component.css'
})
export class FormSanierungComponent implements OnInit {
    // Zustand Bestand centralized form control
  zustandBestand = [
    {id: "zusbest1", value: "Unsaniert"},
    {id: "zusbest2", value: "Teilsaniert"},
    {id: "zusbest3", value: "Umfassend saniert"}
  ]

  sanierungForm!: FormGroup;

  constructor(private fb: FormBuilder, private sanierungService: SanierungService) {  }

  ngOnInit(): void {
    this.sanierungForm = this.fb.group({
        worstPerformingBuilding: new FormControl(true),
        serielleSanierung: new FormControl(true),
        zustandBestand: new FormControl(this.zustandBestand[0]['value']),
        eeKlasse: new FormControl(true),
      });

      // Worst Performing Building
      this.sanierungForm.get("worstPerformingBuilding")?.valueChanges.subscribe(value => {
        // Updates the sanierungService
        this.sanierungService.setWpc(value);
      });

      // Serielle Sanierung
      this.sanierungForm.get("serielleSanierung")?.valueChanges.subscribe(value => {
        // Updates the sanierungService
        this.sanierungService.setSerielleSanierung(value);
      });

      // Zustand Bestand
      this.sanierungForm.get("zustandBestand")?.valueChanges.subscribe(value => {
        // Updates the sanierungService
        this.sanierungService.setZustandBestand(value);
      });

      // EE Klasse
      this.sanierungForm.get("eeKlasse")?.valueChanges.subscribe(value => {
        // Updates the sanierungService
        this.sanierungService.setEeKlasse(value);
      });
  }
}
