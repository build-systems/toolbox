import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSanierungService } from './form-sanierung.service';

@Component({
  selector: 'app-form-sanierung',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-sanierung.component.html',
  styleUrl: './form-sanierung.component.css',
  host: {
    class: 'container-forms',
  },
})
export class FormSanierungComponent implements OnInit {
    
  sanierungForm!: FormGroup;

  constructor(private fb: FormBuilder, public formService: FormSanierungService) {  }

  ngOnInit(): void {
    this.sanierungForm = this.fb.group({
        worstPerformingBuilding: new FormControl(this.formService.worstPerformingBuilding),
        serielleSanierung: new FormControl(this.formService.serielleSanierung),
        zustandBestand: new FormControl(this.formService.zustandBestandOptions[0].value),
        eeKlasse: new FormControl(this.formService.eeKlasse),
      });

      // Worst Performing Building
      this.sanierungForm.get("worstPerformingBuilding")?.valueChanges.subscribe(value => {
        // Updates the sanierungService
        this.formService.setWpc(value);
      });

      // Serielle Sanierung
      this.sanierungForm.get("serielleSanierung")?.valueChanges.subscribe(value => {
        // Updates the sanierungService
        this.formService.setSerielleSanierung(value);
      });

      // Zustand Bestand
      this.sanierungForm.get("zustandBestand")?.valueChanges.subscribe(value => {
        // Updates the sanierungService
        this.formService.setZustandBestand(value);
      });

      // EE Klasse
      this.sanierungForm.get("eeKlasse")?.valueChanges.subscribe(value => {
        // Updates the sanierungService
        this.formService.setEeKlasse(value);
      });
  }
}
