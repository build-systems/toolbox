import { Component, effect, input, model } from '@angular/core';
import { TooltipDirective } from '../shared/tooltip.directive';

@Component({
  selector: 'app-slider-input',
  standalone: true,
  imports: [TooltipDirective],
  templateUrl: './slider-input.component.html',
  styleUrl: './slider-input.component.css',
})
export class SliderInputComponent {
  value = model.required<number>();
  object = input.required<SliderNumberObj>();

  constructor() {}

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
