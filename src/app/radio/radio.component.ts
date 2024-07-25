import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { TooltipDirective } from '../shared/tooltip.directive';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
  host: {
    class: 'host-radio',
  },
})
export class RadioComponent<T> {
  data = input.required<OptionObj<T>>();
  showLegend = input<boolean>(true);
  selected = model<T>();

  onClick(newSelect: T) {
    this.selected.set(newSelect);
  }
}
