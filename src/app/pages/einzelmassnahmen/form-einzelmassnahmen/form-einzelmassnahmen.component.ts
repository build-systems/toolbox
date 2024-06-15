import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { allgemein, einzelmassnahmen } from '../../../shared/tooltips';
import { FormEinzelmassnahmenService } from './form-einzelmassnahmen.service';
import { SliderInputComponent } from '../../../slider-input/slider-input.component';
import { RadioComponent } from '../../../radio/radio.component';
import { HausSectionComponent } from '../haus-section/haus-section.component';

@Component({
  selector: 'app-form-einzelmassnahmen',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipDirective,
    SliderInputComponent,
    RadioComponent,
    HausSectionComponent,
    FormsModule,
  ],
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
