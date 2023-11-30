import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanierungInputComponent } from '../sanierung-input/sanierung-input.component';
import { OutputComponent } from '../output/output.component';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [CommonModule, SanierungInputComponent, OutputComponent],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class SanierungComponent {

}
