import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProjektComponent } from '../../form-projekt/form-projekt.component';
import { FormNeubauComponent } from '../../form-neubau/form-neubau.component';
import { FormDarlehenComponent } from '../../form-darlehen/form-darlehen.component';
import { ChartGkostenComponent } from '../../chart-gkosten/chart-gkosten.component';
import { ChartGkostenM2Component } from '../../chart-gkosten-m2/chart-gkosten-m2.component';
import { ChartAnnuitaetenComponent } from '../../chart-annuitaeten/chart-annuitaeten.component';
import { ChartRepaymentComponent } from '../../chart-repayment/chart-repayment.component';
import { ChartFinanzierungskostenComponent } from '../../chart-finanzierungskosten/chart-finanzierungskosten.component';
import { DashboardNumbersComponent } from '../../dashboard-numbers/dashboard-numbers.component';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [CommonModule, FormProjektComponent, FormNeubauComponent, FormDarlehenComponent, ChartGkostenComponent, ChartGkostenM2Component, ChartAnnuitaetenComponent, ChartRepaymentComponent, ChartFinanzierungskostenComponent, DashboardNumbersComponent],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class NeubauComponent {
  title = "Neubau";

  // Handle form page
  currentForm = 1;
  nForms = 3;
  nextForm() {
    if (this.currentForm + 1 <= this.nForms)
      this.currentForm += 1;
  }
  previousForm() {
    if (this.currentForm - 1 >= 1)
      this.currentForm -= 1;
  }
}
