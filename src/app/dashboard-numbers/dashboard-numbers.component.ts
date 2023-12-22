import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanierungService } from '../pages/sanierung/sanierung.service';
import { ShortNumberPipe } from '../pipes/short-number.pipe';


@Component({
  selector: 'app-dashboard-numbers',
  standalone: true,
  imports: [CommonModule, ShortNumberPipe],
  templateUrl: './dashboard-numbers.component.html',
  styleUrl: './dashboard-numbers.component.css',
  host: {
    class: 'values-container'
  }
})
export class DashboardNumbersComponent implements OnInit {

  kfwZuschuss: number = 0;
  investitionskosten: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;

  constructor(private sanierungService: SanierungService) { }

  ngOnInit(): void {
    this.sanierungService.currentOutputSanierung$.subscribe((value) => {
    this.kfwZuschuss = value['kfwZuschuss'];
    this.investitionskosten = value['investitionskosten'];
    this.finanzierungskostenFinanzmarkt = value['finanzierungskostenFinanzmarkt'];
    this.finanzierungskostenKfw = value['finanzierungskostenKfw'];
    this.bankKredit = value['bankKredit'];
    this.kfwKredit = value['kfwKredit'];
    });
  }

}
