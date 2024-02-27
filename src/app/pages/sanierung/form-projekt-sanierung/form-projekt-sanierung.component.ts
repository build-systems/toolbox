import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProjektSanierungService } from './form-projekt-sanierung.service';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { allgemein, sanierung } from '../../../shared/tooltips';

@Component({
  selector: 'app-form-projekt-sanierung',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TooltipDirective],
  templateUrl: './form-projekt-sanierung.component.html',
  styleUrl: './form-projekt-sanierung.component.css',
  host: {
    class: 'host-forms',
  },
})
export class FormProjektSanierungComponent {
  // ATTENTION: All form variables are stored at form-projekt-sanierung.service.ts

  constructor(
    public formService: FormProjektSanierungService,
    public allgemeinTooltips: allgemein,
    public sanierungTooltips: sanierung
  ) {}

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
