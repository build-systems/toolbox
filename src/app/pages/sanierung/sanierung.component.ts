import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProjektSanierungComponent } from './form-projekt-sanierung/form-projekt-sanierung.component';
import { SanierungService } from './sanierung.service';
import { FormDarlehenSanierungComponent } from './form-darlehen-sanierung/form-darlehen-sanierung.component';
import { ChartsProjektSanierungComponent } from './charts-projekt-sanierung/charts-projekt-sanierung.component';
import { ChartsDarlehenSanierungComponent } from './charts-darlehen-sanierung/charts-darlehen-sanierung.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NumbersProjektSanierungComponent } from './numbers-projekt-sanierung/numbers-projekt-sanierung.component';
import { NumbersDarlehenSanierungComponent } from './numbers-darlehen-sanierung/numbers-darlehen-sanierung.component';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    FormProjektSanierungComponent,
    FormDarlehenSanierungComponent,
    ChartsProjektSanierungComponent,
    ChartsDarlehenSanierungComponent,
    NumbersProjektSanierungComponent,
    NumbersDarlehenSanierungComponent
  ],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'host-tool',
  },
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        backgroundColor: "#222",
        padding: '0 1rem',
      })),
      state('expanded', style({
        height: '*',
      })),
      transition('collapsed => expanded', [
        animate('300ms ease-out')
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in')
      ]),
    ]),
    trigger('rotateArrow', [
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      state('expanded', style({
        transform: 'rotate(90deg)'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-out')
      ]),
    ])
  ],
})
export class SanierungComponent {
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at sanierungprojekt.ts

  title = 'Sanierung';

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(public sanierungService: SanierungService) {
    // Reset was created to make sure the outputs match the form values
    // After doing some changes, going to another route and then coming back, the outputs were the same
    // while the form had reset to default values
    // Another solution would be to restore the previous values. But that would require more work.
    // The main problem is that the forms are being reused across different projects/routes
    // So it would require separating the forms.
    // I think it could easily be done using signals
    // sanierungService.reset();
  }
}
