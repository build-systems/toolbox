import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  effect,
} from '@angular/core';
import { FormEinzelmassnahmenService } from '../form-einzelmassnahmen/form-einzelmassnahmen.service';

@Component({
  selector: 'app-haus-section',
  standalone: true,
  imports: [],
  templateUrl: './haus-section.component.svg',
  styleUrl: './haus-section.component.css',
})
export class HausSectionComponent implements AfterViewInit {
  selectedGroup: SVGElement | null = null;

  matchingIds: string[] = [
    'Bodenplatte',
    'Außenwand',
    'ObersteGeschossdecke',
    'Dach',
    'Steildachgauben',
    'Innenwand',
    'Keller',
    'Türen',
    'Türen',
    'Fenster',
    'Dachflächenfenster',
    'Vorbaurollladen',
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

      // console.log('Clicked group id:', group.id);
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

  constructor(
    protected formService: FormEinzelmassnahmenService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
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

    // console.log('Selected group id:', group.id);
  }
}
