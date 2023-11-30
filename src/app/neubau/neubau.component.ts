import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeubauInputComponent } from '../neubau-input/neubau-input.component';
import { OutputComponent } from '../output/output.component';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [CommonModule, NeubauInputComponent, OutputComponent],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class NeubauComponent {

}
