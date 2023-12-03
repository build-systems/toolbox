import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputComponent } from '../output/output.component';
import { ParameterProjektComponent } from '../parameter-projekt/parameter-projekt.component';
import { ParameterNeubauComponent } from '../parameter-neubau/parameter-neubau.component';
import { ParameterDarlehenComponent } from '../parameter-darlehen/parameter-darlehen.component';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [CommonModule, OutputComponent, ParameterProjektComponent, ParameterNeubauComponent, ParameterDarlehenComponent],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class NeubauComponent {
  title = "Neubau";
}
