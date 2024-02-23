import { Component, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NeubauProjekt } from '../../../shared/neubauprojekt';
import { NeubauService } from '../neubau.service';
import localeDe from '@angular/common/locales/de'
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'app-numbers-projekt-neubau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numbers-projekt-neubau.component.html',
  styleUrl: './numbers-projekt-neubau.component.css'
})
export class NumbersProjektNeubauComponent  implements OnInit {
  investitionskosten: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  output!: NeubauProjekt;

  constructor(private neubauService: NeubauService) {}

  ngOnInit(): void {
    this.neubauService.currentOutputNeubau$
      .subscribe((value) => {
        this.output = value;
        this.investitionskosten = this.output.investitionskosten;
        this.finanzierungskostenFinanzmarkt =
          this.output.finanzierungskostenBank;
        this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
        this.bankKredit = this.output.bankKredit;
        this.kfwKredit = this.output.kfwKredit;
      });
  }
}
