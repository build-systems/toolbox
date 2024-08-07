import { Component, input, model } from '@angular/core';
import { expandCollapseTitle } from '../shared/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  animations: expandCollapseTitle,
  host: { class: 'host-title' },
})
export class TitleComponent {
  title = input.required<string>();
  projectTitle = model.required<string>();
  id = input<string>();
  idTitle = input<string>('KfW id');
  h2 = input<string>();
  h3 = input<string>();
  description = input<string>();

  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onBlurRenameIfEmpty() {
    if (this.projectTitle().length < 1) {
      this.projectTitle.set('Untitled');
    }
  }
}
