import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EinzelmassnahmenService } from '../einzelmassnahmen.service';
import { ReversePipe } from '../../../pipes/reverse.pipe';

@Component({
  selector: 'app-list-einzelmassnahmen',
  standalone: true,
  templateUrl: './list-einzelmassnahmen.component.html',
  styleUrl: './list-einzelmassnahmen.component.css',
  host: {
    class: 'host-list',
  },
  imports: [CommonModule, ReversePipe],
})
export class ListEinzelmassnahmenComponent {
  constructor(public einzelmassnahmenService: EinzelmassnahmenService) {}
}
