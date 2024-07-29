import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  effect,
  inject,
} from '@angular/core';
import { FormEinzelmassnahmenService } from '../../form-einzelmassnahmen/form-einzelmassnahmen.service';

@Component({
  selector: 'app-haus-keller-steildach',
  standalone: true,
  imports: [],
  templateUrl: './haus-keller-steildach.component.svg',
  styleUrl: './haus-keller-steildach.component.css',
  host: {
    class: 'host-house',
  },
})

// I know it is super repetitive
// The future of the app is uncertain
// there's not time to waste fixing 'broken windows'
export class HausKellerSteildachComponent implements AfterViewInit {
  protected formService = inject(FormEinzelmassnahmenService);
  protected renderer = inject(Renderer2);
  protected el = inject(ElementRef);

  selectedGroup: SVGElement | null = null;

  matchingIds: string[] = [
    'Bodenplatte',
    'Außenwand',
    'ObersteGeschossdecke',
    'Dach',
    'Steildachgauben',
    'Innenwand',
    'Kellerdecke',
    'Türen',
    'Türen',
    'Fenster',
    'Dachflächenfenster',
    'Rollladen',
    'Wärmedämmverbundsystem',
  ];

  ngAfterViewInit(): void {
    const svg = this.el.nativeElement.querySelector('svg');
    if (svg) {
      this.addClassToMatchingGroups();
      this.renderer.listen(svg, 'click', this.onSvgClick.bind(this));
    } else {
      console.error('SVG element not found');
    }
  }

  onSvgClick(event: MouseEvent): void {
    const target = event.target as SVGElement;
    const group = target.closest('g');
    if (target && group && group.classList.contains('selectable')) {
      if (this.selectedGroup) {
        this.selectedGroup.classList.remove('selected');
      }
      // Add "selected" class to the newly clicked group
      group.classList.add('selected');
      // Update the selected group
      this.selectedGroup = group;

      this.formService.bauteilSelected.set(group.id);

      // Perform further processing with the group id here
    }
  }

  addClassToMatchingGroups(): void {
    const svgGroups = this.el.nativeElement.querySelectorAll('g');
    svgGroups.forEach((group: SVGGElement) => {
      if (this.matchingIds.includes(group.id)) {
        this.renderer.addClass(group, 'selectable');
      }
    });
  }

  constructor() {
    effect(() => {
      const group = document.getElementById(
        this.formService.bauteilSelected()
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
  }
}
