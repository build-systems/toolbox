import { Component, OnInit } from '@angular/core';
import { SanierungService } from '../sanierung.service';
import { SanierungProjekt } from '../../../shared/sanierungprojekt';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de'
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'app-numbers-darlehen-sanierung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numbers-darlehen-sanierung.component.html',
  styleUrl: './numbers-darlehen-sanierung.component.css'
})
export class NumbersDarlehenSanierungComponent implements OnInit {
  kfwZuschuss: number = 0;
  investitionskosten: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  zinssatzKfw: number = 0;
  output!: SanierungProjekt;

  constructor(private sanierungService: SanierungService) {}

  ngOnInit(): void {
    this.sanierungService.currentOutputSanierung$.subscribe((value) => {
      this.output = value;
      this.kfwZuschuss = this.output.kfwZuschuss;
      this.investitionskosten = this.output.baukosten;
      this.finanzierungskostenFinanzmarkt =
        this.output.finanzierungskostenBank;
      this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
      this.bankKredit = this.output.bankKredit;
      this.kfwKredit = this.output.kfwKredit;
      this.zinssatzKfw = this.output.zinssatzKfw;
    });
  }
}
