import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDarlehenSanierungService } from './form-darlehen-sanierung.service';

@Component({
  selector: 'app-form-darlehen-sanierung',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-darlehen-sanierung.component.html',
  styleUrl: './form-darlehen-sanierung.component.css',
  host: {
    class: 'host-forms',
  },
})
export class FormDarlehenSanierungComponent {
  // ATTENTION: All form variables are stored at form-projekt.service.ts
  constructor(public formService: FormDarlehenSanierungService) {}
  
  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
