import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartGkostenComponent } from '../chart-gkosten/chart-gkosten.component';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [CommonModule, ChartGkostenComponent],
  templateUrl: './output.component.html',
  styleUrl: './output.component.css',
  host: {
    class: 'ng-output'
  }
})
export class OutputComponent {
  @Input() kfwKredit = '';
  @Input() bankKredit = '';
  @Input() finanzierungskostenKfw = '';
  @Input() finanzierungskostenMarkt = '';
  @Input() investitionkosten = '';
  @Input() zuschuss = '';
  @Input() gInvestition = '';
  @Input() gFinanzierung = '';
}
