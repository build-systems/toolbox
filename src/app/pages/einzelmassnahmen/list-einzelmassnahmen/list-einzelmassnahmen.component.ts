import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { EinzelmassnahmenService } from '../einzelmassnahmen.service';

@Component({
  selector: 'app-list-einzelmassnahmen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-einzelmassnahmen.component.html',
  styleUrl: './list-einzelmassnahmen.component.css',
  host: {
    class: 'host-list',
  },
})
export class ListEinzelmassnahmenComponent {
  constructor(public einzelmassnahmenService: EinzelmassnahmenService) {}
}
