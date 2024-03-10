import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpComponent {
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
