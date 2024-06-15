import { Component, effect } from '@angular/core';
import { FormEinzelmassnahmenService } from '../form-einzelmassnahmen/form-einzelmassnahmen.service';

@Component({
  selector: 'app-haus-section',
  standalone: true,
  imports: [],
  templateUrl: './haus-section.component.svg',
  styleUrl: './haus-section.component.css',
})
export class HausSectionComponent {
  selectedGroup: SVGElement | null = null;

  onSvgClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const group = target.closest('g');
    if (group && group.classList.contains('selectable')) {
      if (this.selectedGroup) {
        this.selectedGroup.classList.remove('selected');
      }
      // Add "selected" class to the newly clicked group
      group.classList.add('selected');
      // Update the selected group
      this.selectedGroup = group;

      this.formService.bauteilSelected.set(group.id);

      console.log('Clicked group id:', group.id);
      // Perform further processing with the group id here
    }
  }

  constructor(public formService: FormEinzelmassnahmenService) {
    effect(() => {
      const group = document.getElementById(
        formService.bauteilSelected()
      ) as SVGElement | null;
      if (group && group.classList.contains('selectable')) {
        this.selectGroup(group);
      }
    });
  }

  private selectGroup(group: SVGElement): void {
    // Remove "selected" class from the previously selected group
    if (this.selectedGroup) {
      this.selectedGroup.classList.remove('selected');
    }
    // Add "selected" class to the new group
    group.classList.add('selected');
    // Update the selected group
    this.selectedGroup = group;

    console.log('Selected group id:', group.id);
  }
}
