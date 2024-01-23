import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProjektSanierungComponent } from '../../form-projekt-sanierung/form-projekt-sanierung.component';
import { FormDarlehenComponent } from '../../form-darlehen/form-darlehen.component';
import { ChartGkostenSanierungComponent } from '../../chart-gkosten-sanierung/chart-gkosten-sanierung.component';
import { ChartGkostenM2SanierungComponent } from '../../chart-gkosten-m2-sanierung/chart-gkosten-m2-sanierung.component';
import { ChartAnnuitaetenComponent } from '../../chart-annuitaeten/chart-annuitaeten.component';
import { ChartTilgungComponent } from '../../chart-tilgung/chart-tilgung.component';
import { ChartFinanzierungskostenComponent } from '../../chart-finanzierungskosten/chart-finanzierungskosten.component';
import { DashboardNumbersComponent } from '../../dashboard-numbers/dashboard-numbers.component';
import { SanierungService } from './sanierung.service';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    FormProjektSanierungComponent,
    FormDarlehenComponent,
    ChartGkostenSanierungComponent,
    ChartGkostenM2SanierungComponent,
    ChartAnnuitaetenComponent,
    ChartTilgungComponent,
    ChartFinanzierungskostenComponent,
    DashboardNumbersComponent,
  ],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'host-tool',
  },
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

  constructor(public sanierungService: SanierungService) {
    // Reset was created to make sure the outputs match the form values
    // After doing some changes, going to another route and then coming back the outputs were the same
    // while the form had reset to default values
    // Another solution would be to restore the previous values. But that would require more work.
    // The main problem is that the forms are being reused across different projects/routes
    // So it would require separating the forms.
    // I think it could easily be done using signals
    sanierungService.reset();
  }
}
