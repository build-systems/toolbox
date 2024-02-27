import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDarlehenNeubauService } from './form-darlehen-neubau.service';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { allgemein } from '../../../shared/tooltips';

@Component({
  selector: 'app-form-darlehen-neubau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TooltipDirective],
  templateUrl: './form-darlehen-neubau.component.html',
  styleUrl: './form-darlehen-neubau.component.css',
  host: {
    class: 'host-forms',
  },
})
export class FormDarlehenNeubauComponent {
  // export class FormDarlehenNeubauComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  constructor(
    public formService: FormDarlehenNeubauService,
    public allgemeinTooltips: allgemein
  ) {}

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
