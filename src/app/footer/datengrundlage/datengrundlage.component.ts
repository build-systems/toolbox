import { Component } from '@angular/core';
import { DatengrundlageService } from '../datengrundlage.service';

@Component({
  selector: 'app-datengrundlage',
  standalone: true,
  imports: [],
  templateUrl: './datengrundlage.component.html',
  styleUrl: './datengrundlage.component.css',
})
export class DatengrundlageComponent {

  constructor(public datengrundlageService: DatengrundlageService){}
}
