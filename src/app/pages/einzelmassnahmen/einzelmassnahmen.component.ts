import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations';
import { EinzelmassnahmenService } from './einzelmassnahmen.service';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../title/title.component';
import { NumbersEinzelmassnahmenComponent } from './numbers-einzelmassnahmen/numbers-einzelmassnahmen.component';
import { HelpComponent } from '../../help/help.component';
import { FormEinzelmassnahmenComponent } from './form-einzelmassnahmen/form-einzelmassnahmen.component';
import { ListEinzelmassnahmenComponent } from './list-einzelmassnahmen/list-einzelmassnahmen.component';
import { ChartGkostenEinzelmassnahmenComponent } from './chart-gkosten-einzelmassnahmen/chart-gkosten-einzelmassnahmen.component';

@Component({
  selector: 'app-einzelmassnahmen',
  standalone: true,
  templateUrl: './einzelmassnahmen.component.html',
  styleUrl: './einzelmassnahmen.component.css',
  host: {
    class: 'host-tool',
  },
  animations: [fadeInAnimation],
  imports: [
    CommonModule,
    TitleComponent,
    NumbersEinzelmassnahmenComponent,
    HelpComponent,
    FormEinzelmassnahmenComponent,
    ListEinzelmassnahmenComponent,
    ChartGkostenEinzelmassnahmenComponent,
  ],
})
export class EinzelmassnahmenComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;

  // Information for the title
  title = 'Fördermittel Einzelmaßnahmen';
  kfwId = '000';
  kfwH2 = 'Placeholder heading2';
  kfwH3 = 'Placeholder heading3';
  kfwDescription =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, doloremque, error quod molestias nobis magni ipsam vero dolorum rerum doloribus assumenda voluptates. Accusantium doloribus quae officia? Accusamus provident praesentium iure deleniti vel, architecto asperiores dolores voluptatem quo doloremque similique temporibus repellat cumque, possimus quam soluta alias nesciunt tempore ducimus fugit. Expedita natus nulla at harum porro odio commodi iure corporis explicabo animi alias voluptas est ducimus aspernatur ut doloremque necessitatibus, facilis ullam tenetur! Repudiandae vitae, nam veritatis enim maxime exercitationem molestias ipsam? Laborum veniam consequuntur illum quia ratione corporis, ex iure ea officia rerum, cum nulla quasi, incidunt quibusdam voluptatibus.';

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  constructor(public einzelmassnahmenService: EinzelmassnahmenService) {
    // Service is used to check the current tab (Projekt or Darlehen).
  }
}
