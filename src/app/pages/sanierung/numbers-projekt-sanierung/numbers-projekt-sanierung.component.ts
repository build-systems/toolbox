import { Component, OnInit } from '@angular/core';
import { SanierungService } from '../sanierung.service';
import { SanierungProjekt } from '../../../shared/sanierungprojekt';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de'
registerLocaleData(localeDe, 'de');


@Component({
  selector: 'app-numbers-projekt-sanierung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numbers-projekt-sanierung.component.html',
  styleUrl: './numbers-projekt-sanierung.component.css',
  host: {
    class: 'dashboard-numbers'
  }
})
export class NumbersProjektSanierungComponent implements OnInit {
  output!: SanierungProjekt;
  investitionskosten: number = 0;
  bankKredit: number = 0;
  kfwKredit: number = 0;
  kfwZuschuss: number = 0;
  kfwZuschussPercent: number = 0;
  KfwKreditschwelleProWe: number = 0;

  investitionskostenDescription: string = 'Die Höhe des Kreditbetrags hängt von zwei Faktoren ab: Die Energie­effizienz ihrer sanierten oder neu gebauten Immo­bilie und der Höhe ihrer förderfähigen Kosten. In unserer Kalkulation wurden folgende Kostengruppen nach DIN276 berücksichtigt: KG 300 und 400. "Förder­fähige Kosten" sind jene Kosten, die für Ihre Förderung anrechen­bar sind. Beispiel: Wenn Sie Ihre bestehende Immo­bilie zum Effizienz­haus sanieren, sind die Kosten für den Einbau eines Öl­brenn­wert­kessels nicht förder­fähig. Details finden Sie in der Förderrichtlinie.';
  
  tilgungszuschussDescription: string = 'Die Auszahlungsmodalitäten, sehen vor, dass der Tilgungs­zuschuss nach Gebäudefertigstellung und Dokumentation den zurückzuz­ahlenden Kredit­betrag reduziert und somit die Lauf­zeit Ihres Darlehens verkürzt. Der Zuschuss wird entsprechend nicht als Einmalzahlung ausgezahlt, sondern gegen Ihre Kreditsumme gegengerechnet.';
  
  constructor(private sanierungService: SanierungService) {}

  ngOnInit(): void {
    this.sanierungService.currentOutputSanierung$.subscribe((value) => {
      this.output = value;
      this.investitionskosten = this.output.baukosten;
      this.bankKredit = this.output.bankKredit;
      this.kfwKredit = this.output.kfwKredit;
      this.kfwZuschuss = this.output.kfwZuschuss;
      this.kfwZuschussPercent = this.output.kfwZuschussPercentage;
      this.KfwKreditschwelleProWe = this.output.kfwKreditschwelleProWe;
    });
  }

}
