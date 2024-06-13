import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { allgemein, einzelmassnahmen, neubau } from '../../../shared/tooltips';
import { FormEinzelmassnahmenService } from './form-einzelmassnahmen.service';

@Component({
  selector: 'app-form-einzelmassnahmen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TooltipDirective],
  templateUrl: './form-einzelmassnahmen.component.html',
  styleUrl: './form-einzelmassnahmen.component.css',
  host: {
    class: 'host-forms',
  },
})
export class FormEinzelmassnahmenComponent {
  constructor(
    public formService: FormEinzelmassnahmenService,
    public allgemeinTooltips: allgemein,
    public einzelmassnahmenTooltips: einzelmassnahmen
  ) {}

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
