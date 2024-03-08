import { Component } from '@angular/core';
import { DatengrundlageComponent } from './datengrundlage/datengrundlage.component';
import { DatengrundlageService } from './datengrundlage.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DatengrundlageComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  host: { class: 'footer' },
})
export class FooterComponent {

  constructor(public datengrundlageService: DatengrundlageService){}
  
}
