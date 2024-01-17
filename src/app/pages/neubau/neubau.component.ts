import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDarlehenComponent } from '../../form-darlehen/form-darlehen.component';
import { ChartGkostenNeubauComponent } from '../../chart-gkosten-neubau/chart-gkosten-neubau.component';
import { ChartAnnuitaetenComponent } from '../../chart-annuitaeten/chart-annuitaeten.component';
import { ChartTilgungComponent } from '../../chart-tilgung/chart-tilgung.component';
import { ChartFinanzierungskostenComponent } from '../../chart-finanzierungskosten/chart-finanzierungskosten.component';
import { DashboardNumbersComponent } from '../../dashboard-numbers/dashboard-numbers.component';
import { NeubauService } from './neubau.service';
import { ChartGkostenM2NeubauComponent } from '../../chart-gkosten-m2-neubau/chart-gkosten-m2-neubau.component';
import { FormProjektNeubauComponent } from '../../form-projekt-neubau/form-projekt-neubau.component';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [
    CommonModule,
    FormProjektNeubauComponent,
    FormDarlehenComponent,
    ChartGkostenNeubauComponent,
    ChartGkostenM2NeubauComponent,
    ChartAnnuitaetenComponent,
    ChartTilgungComponent,
    ChartFinanzierungskostenComponent,
    DashboardNumbersComponent,
  ],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'ng-tool',
  },
})
export class NeubauComponent {
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at neubauprojekt.ts

  title = 'Neubau';

  // Handle form page
  currentForm = 1;
  nForms = 3;
  nextForm() {
    if (this.currentForm + 1 <= this.nForms) this.currentForm += 1;
  }
  previousForm() {
    if (this.currentForm - 1 >= 1) this.currentForm -= 1;
  }

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  // Reset was created to make sure the outputs match the form values
  // After doing some changes, going to another route and then coming back the outputs were the same
  // while the form had reset to default values
  // Another solution would be to restore the previous values. But that would require more work.
  // The main problem is that the forms are being reused across different projects/routes
  // So it would require either separating the forms, or identifying the current route in each form
  // to then assign the form values from the service(neubau / sanierung).
  constructor(private neubauService: NeubauService) {
    neubauService.reset();
  }
}
