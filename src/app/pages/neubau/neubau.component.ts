import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeubauService } from './neubau.service';
import { FormProjektNeubauComponent } from './form-projekt-neubau/form-projekt-neubau.component';
import { FormDarlehenNeubauComponent } from './form-darlehen-neubau/form-darlehen-neubau.component';
import { DashboardProjektNeubauComponent } from './dashboard-projekt-neubau/dashboard-projekt-neubau.component';
import { DashboardDarlehenNeubauComponent } from './dashboard-darlehen-neubau/dashboard-darlehen-neubau.component';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [
    CommonModule,
    FormProjektNeubauComponent,
    FormDarlehenNeubauComponent,
    DashboardProjektNeubauComponent,
    DashboardDarlehenNeubauComponent
  ],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'host-tool',
  },
})
export class NeubauComponent {
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at neubauprojekt.ts

  title = 'Neubau';

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  constructor(public neubauService: NeubauService) {
    // Reset was created to make sure the outputs match the form values
    // After doing some changes, going to another route and then coming back the outputs were the same
    // while the form had reset to default values
    // Another solution would be to restore the previous values. But that would require more work.
    // The main problem is that the forms are being reused across different projects/routes
    // So it would require separating the forms.
    // I think it could easily be done using signals
    // neubauService.reset();
  }
}
