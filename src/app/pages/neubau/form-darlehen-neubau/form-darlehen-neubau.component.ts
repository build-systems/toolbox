import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormDarlehenNeubauService } from './form-darlehen-neubau.service';

@Component({
  selector: 'app-form-darlehen-neubau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-darlehen-neubau.component.html',
  styleUrl: './form-darlehen-neubau.component.css',
  host: {
    class: 'host-forms',
  },
})
export class FormDarlehenNeubauComponent {
  // export class FormDarlehenNeubauComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  constructor(public formService: FormDarlehenNeubauService) {}

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
