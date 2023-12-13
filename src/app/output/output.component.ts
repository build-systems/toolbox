import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [CommonModule],
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
