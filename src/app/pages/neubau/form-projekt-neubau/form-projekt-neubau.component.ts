import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProjektNeubauService } from './form-projekt-neubau.service';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { allgemein, neubau } from '../../../shared/tooltips';

@Component({
  selector: 'app-form-projekt-neubau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TooltipDirective],
  templateUrl: './form-projekt-neubau.component.html',
  styleUrl: './form-projekt-neubau.component.css',
  host: {
    class: 'host-forms',
  },
})
export class FormProjektNeubauComponent {
  // ATTENTION: All form variables are stored at form-projekt-neubau.service.ts

  constructor(
    public formService: FormProjektNeubauService,
    public allgemeinTooltips: allgemein,
    public neubauTooltips: neubau
  ) {}

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
