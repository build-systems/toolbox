import { Component } from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.css',
})
export class DisclaimerComponent {
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

  userAgreed: boolean = false;
  userAgree() {
    this.userAgreed = true;
  }
}
