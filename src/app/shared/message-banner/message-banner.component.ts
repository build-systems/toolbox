import { Component } from '@angular/core';

@Component({
  selector: 'app-message-banner',
  standalone: true,
  imports: [],
  templateUrl: './message-banner.component.html',
  styleUrl: './message-banner.component.css',
})
export class MessageBannerComponent {
  closed = false;

  closeMessage() {
    this.closed = !closed;
  }
}
