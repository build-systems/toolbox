import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputComponent } from '../output/output.component';
import { ParameterProjektComponent } from '../parameter-projekt/parameter-projekt.component';
import { ParameterSanierungComponent } from '../parameter-sanierung/parameter-sanierung.component';
import { ParameterDarlehenComponent } from '../parameter-darlehen/parameter-darlehen.component';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [CommonModule, OutputComponent, ParameterProjektComponent, ParameterSanierungComponent, ParameterDarlehenComponent],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'ng-tool'
  }
})
export class SanierungComponent {
  title = "Sanierung";

  wohnflaeche = '';
  sendWohnflaeche(wohnflaeche: any) {
    this.wohnflaeche = wohnflaeche;
  }
}
