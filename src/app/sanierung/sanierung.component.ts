import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputComponent } from '../output/output.component';
import { FormProjektComponent } from '../form-projekt/form-projekt.component';
import { FormSanierungComponent } from '../form-sanierung/form-sanierung.component';
import { FormDarlehenComponent } from '../form-darlehen/form-darlehen.component';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [CommonModule, OutputComponent, FormProjektComponent, FormSanierungComponent, FormDarlehenComponent],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class SanierungComponent {
  title = "Sanierung";

  // Handle form page
  currentForm = 1;
  nForms = 3;
  nextForm() {
    if (this.currentForm + 1 <= this.nForms)
      this.currentForm += 1;
  }
  previousForm() {
    if (this.currentForm - 1 >= 1)
      this.currentForm -= 1;
  }

  constructor() {  }

}
