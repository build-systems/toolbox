import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProjektComponent } from '../form-projekt/form-projekt.component';
import { FormSanierungComponent } from '../form-sanierung/form-sanierung.component';
import { FormDarlehenComponent } from '../form-darlehen/form-darlehen.component';
import { ChartGkostenComponent } from '../chart-gkosten/chart-gkosten.component';
import { ChartGkostenM2Component } from '../chart-gkosten-m2/chart-gkosten-m2.component';
import { ChartInstallmentComponent } from '../chart-installment/chart-installment.component';
import { ChartRepaymentComponent } from '../chart-repayment/chart-repayment.component';
import { ChartFinanzierungskostenComponent } from '../chart-finanzierungskosten/chart-finanzierungskosten.component';
import { OutputValuesComponent } from '../outputvalues/outputvalues.component';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [CommonModule, FormProjektComponent, FormSanierungComponent, FormDarlehenComponent, ChartGkostenComponent, ChartGkostenM2Component, ChartInstallmentComponent, ChartRepaymentComponent, ChartFinanzierungskostenComponent, OutputValuesComponent],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class SanierungComponent {
  title = "Sanierung";

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

  constructor() {  }

}
