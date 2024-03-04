import { Component, input } from '@angular/core';
import { expandCollapseTitle } from '../shared/animations';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  animations: expandCollapseTitle
})
export class TitleComponent {
  title = input.required<string>();
  kfwId = input.required<string>();
  kfwH2 = input.required<string>();
  kfwH3 = input.required<string>();
  kfwDescription = input.required<string>();
  
  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

}
