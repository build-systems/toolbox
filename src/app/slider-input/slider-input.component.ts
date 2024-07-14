import { Component, ElementRef, ViewChild, input, model } from '@angular/core';
import { TooltipDirective } from '../shared/tooltip.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider-input',
  standalone: true,
  imports: [FormsModule, TooltipDirective],
  templateUrl: './slider-input.component.html',
  styleUrl: './slider-input.component.css',
})
export class SliderInputComponent {
  // This component uses template-drive form and Signals(model and input)
  // The view child is used to update the inputField, because it wasnt being updated using other strategies
  @ViewChild('inputField') inputField: ElementRef<HTMLInputElement> | undefined;

  data = input.required<SliderNumberObj>();
  value = model.required<number>();
  round = input<number>(2);

  constructor() {}

  onValueChange(value: number): void {
    if (value < this.data().min) {
      // Updated model
      this.value.set(this.data().min);
      // Update input field
      this.inputField!.nativeElement.value = this.data().min.toFixed(2);
    } else {
      this.value.set(value);
    }
  }

  onEnterKey(event: any): void {
    event.target.blur();
  }
}
