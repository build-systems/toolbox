import { Component, input, model } from '@angular/core';
import { expandCollapseTitle } from '../shared/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  animations: expandCollapseTitle,
  host: { class: 'host-title' },
})
export class TitleComponent {
  title = input.required<string>();
  projectTitle = model<string>();
  kfwId = input<string>();
  h2 = input<string>();
  h3 = input<string>();
  description = input<string>();

  isExpanded: boolean = false;
  editingTitle: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
