import { Component, OnInit } from '@angular/core';
import { NeubauProjekt } from '../neubauprojekt';
import { NeubauService } from '../neubau.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TooltipDirective } from '../../../shared/tooltip.directive';
import { allgemein, neubau } from '../../../shared/tooltips';
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'app-numbers-darlehen-neubau',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './numbers-darlehen-neubau.component.html',
  styleUrl: './numbers-darlehen-neubau.component.css',
})
export class NumbersDarlehenNeubauComponent implements OnInit {
  investitionskosten: number = 0;
  zinssatzKfw: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  output!: NeubauProjekt;

  constructor(
    private neubauService: NeubauService,
    public neubauTooltips: neubau,
    public allgemeinTooltips: allgemein
  ) {}

  // Here I made a copy of the subscription to both observables.
  // It is a lot of repetitive code, but I run out of time...
  ngOnInit(): void {
    this.neubauService.currentOutputNeubau$.subscribe((value) => {
      this.output = value;
      this.investitionskosten = this.output.baukosten;
      this.zinssatzKfw = this.output.zinssatzKfw;
      this.finanzierungskostenFinanzmarkt = this.output.finanzierungskostenBank;
      this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
      this.bankKredit = this.output.bankKredit;
      this.kfwKredit = this.output.kfwKredit;
    });
  }
}
