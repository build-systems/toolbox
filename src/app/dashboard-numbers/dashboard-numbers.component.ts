import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanierungService } from '../pages/sanierung/sanierung.service';
import { ShortNumberPipe } from '../pipes/short-number.pipe';
import { NeubauService } from '../pages/neubau/neubau.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardOutput } from '../dashboard-output';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard-numbers',
  standalone: true,
  imports: [CommonModule, ShortNumberPipe],
  templateUrl: './dashboard-numbers.component.html',
  styleUrl: './dashboard-numbers.component.css',
  host: {
    class: 'host-dashboard-numbers',
  },
})
export class DashboardNumbersComponent implements OnInit {
  typ!: ProjektTyp;
  kfwZuschuss: number = 0;
  investitionskosten: number = 0;
  finanzierungskostenFinanzmarkt: number = 0;
  finanzierungskostenKfw: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  output!: DashboardOutput;

  // Router links. There must be better way to get the strings from app.routes.ts
  currentRoute!: string;
  sanierungRoute = '/sanierung';
  neubauRoute = '/neubau';

  constructor(
    private sanierungService: SanierungService,
    private neubauService: NeubauService,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      // Check for changes on the url
      if (val instanceof NavigationEnd) {
        // Then assign the url as a string
        this.currentRoute = this.router.url.toString();
      }
    });
  }

  // Here I made a copy of the subscription to both observables.
  // It is a lot of repetitive code, but I run out of time...
  ngOnInit(): void {
    this.sanierungService.currentOutputDashboard$
      .pipe(filter(() => this.currentRoute === this.sanierungRoute))
      .subscribe((value) => {
        this.output = value;
        this.typ = this.output.typ;
        this.kfwZuschuss = this.output.kfwZuschuss;
        this.investitionskosten = this.output.investitionskosten;
        this.finanzierungskostenFinanzmarkt =
          this.output.finanzierungskostenFinanzmarkt;
        this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
        this.bankKredit = this.output.bankKredit;
        this.kfwKredit = this.output.kfwKredit;
      });

    this.neubauService.currentOutputDashboard$
      .pipe(filter(() => this.currentRoute === this.neubauRoute))
      .subscribe((value) => {
        this.output = value;
        this.typ = this.output.typ;
        this.kfwZuschuss = this.output.kfwZuschuss;
        this.investitionskosten = this.output.investitionskosten;
        this.finanzierungskostenFinanzmarkt =
          this.output.finanzierungskostenFinanzmarkt;
        this.finanzierungskostenKfw = this.output.finanzierungskostenKfw;
        this.bankKredit = this.output.bankKredit;
        this.kfwKredit = this.output.kfwKredit;
      });
  }
}
