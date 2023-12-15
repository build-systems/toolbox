import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputComponent } from '../output/output.component';
import { FormProjektComponent } from '../form-projekt/form-projekt.component';
import { FormNeubauComponent } from '../form-neubau/form-neubau.component';
import { FormDarlehenComponent } from '../form-darlehen/form-darlehen.component';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [CommonModule, OutputComponent, FormProjektComponent, FormNeubauComponent, FormDarlehenComponent],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class NeubauComponent {
  title = "Neubau";
}
