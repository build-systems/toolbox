import { CommonModule } from '@angular/common';
import { Component, inject, WritableSignal } from '@angular/core';
import { EinzelmassnahmenService } from '../einzelmassnahmen.service';
import { ReversePipe } from '../../../pipes/reverse.pipe';
import { einzelmassnahmen } from '../../../shared/constants';

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
  protected einzelmassnahmenService = inject(EinzelmassnahmenService);
  protected constants = inject(einzelmassnahmen);

  delOutputItemFromList(
    index: number,
    projectSignal: WritableSignal<einzelmassnahmenOutputProject>
  ) {
    const project = projectSignal();
    if (index < 0 || index >= project.items.length) {
      throw new Error('Index out of bounds');
    }
    const projectItems = project.items
      .slice(0, index)
      .concat(project.items.slice(index + 1));
    projectSignal.update((old) => ({ ...old, items: projectItems }));
  }
}
