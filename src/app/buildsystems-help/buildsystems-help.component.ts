import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-buildsystems-help',
  standalone: true,
  imports: [],
  templateUrl: './buildsystems-help.component.html',
  styleUrl: './buildsystems-help.component.css',
})
export class BuildsystemsHelpComponent {
  isCopied: boolean = false;

  async copyContent() {
    try {
      await navigator.clipboard.writeText('mail@buildsystems.de');
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 1500);
    } catch (e) {
      console.error('e', e);
    }
  }
}
