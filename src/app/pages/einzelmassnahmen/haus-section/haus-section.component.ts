import { Component, inject } from '@angular/core';
import { FormEinzelmassnahmenService } from '../form-einzelmassnahmen/form-einzelmassnahmen.service';
import { HausKellerSteildachComponent } from './haus-keller-steildach/haus-keller-steildach.component';
import { HausNokellerSteildachComponent } from './haus-nokeller-steildach/haus-nokeller-steildach.component';

@Component({
  selector: 'app-haus-section',
  standalone: true,
  imports: [HausKellerSteildachComponent, HausNokellerSteildachComponent],
  templateUrl: './haus-section.component.html',
  styleUrl: './haus-section.component.css',
  host: {
    class: 'host-house-parent',
  },
})
export class HausSectionComponent {
  protected formService = inject(FormEinzelmassnahmenService);
}
