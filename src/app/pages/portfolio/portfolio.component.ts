import { Component, HostBinding, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../auth/supabase.service';
import { AuthComponent } from '../../auth/auth.component';
import { EinzelmassnahmenService } from '../einzelmassnahmen/einzelmassnahmen.service';
import { TitleComponent } from '../../title/title.component';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations';
import { DbEinzelmassnahmenService } from '../einzelmassnahmen/db-einzelmassnahmen.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, AuthComponent, TitleComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  animations: [fadeInAnimation],
  host: {
    class: 'host-portfolio',
  },
})
export class PortfolioComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
  protected readonly supabaseService = inject(SupabaseService);
  protected readonly einzelmassnahmenService = inject(EinzelmassnahmenService);
  protected readonly dbEinzelmassnahmenService = inject(
    DbEinzelmassnahmenService
  );
  private router = inject(Router);

  description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga doloremque cumque, nemo, non aliquid ipsum omnis atque assumenda cupiditate earum, modi nam deleniti laudantium. Possimus aperiam voluptas esse. Error, beatae eos! Pariatur atque consequatur doloremque iure eligendi vel molestiae quasi ipsa veritatis iste aliquam, obcaecati aspernatur! Accusantium distinctio suscipit voluptatibus.';

  async ngOnInit() {
    let einzelmassnahmenProjects =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenProjects();
    this.einzelmassnahmenService.projectsEinzelmassnahmen.update(
      () => einzelmassnahmenProjects
    );
  }

  async loadEinzelmassnahmenProject(
    projectId: number,
    einzelmassnahmenProject: WritableSignal<einzelmassnahmenOutputProject>
  ) {
    // Clean project signal (to avoid flashing)
    einzelmassnahmenProject.update(() => ({
      title: 'Untitled',
      id: undefined,
      items: [],
    }));

    // Redirect
    this.router.navigateByUrl('/einzelmassnahmen');

    // Get project to retrieve name
    const projectDb =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenProjectByProjectId(
        projectId
      );

    // Get Project items
    let outputItems: einzelmassnahmenOutputItem[] = [];
    const itemsDb =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenItemsByProjectId(
        projectId
      );

    // Create items list
    for (const itemDb of itemsDb) {
      let newItem: einzelmassnahmenOutputItem = {
        title: itemDb.title,
        id: itemDb.id,
        values: [],
      };

      let valuesDb =
        await this.dbEinzelmassnahmenService.getEinzelmassnahmenValuesByItemId(
          itemDb.id
        );

      valuesDb.sort((a, b) => a.position - b.position);

      for (const valueDb of valuesDb) {
        let newValue: einzelmassnahmenOutputValue = {
          title: valueDb.title,
          id: valueDb.id,
          unit: valueDb.unit,
          value: valueDb.value,
        };
        newItem.values = [...newItem.values, newValue];
      }
      outputItems = [...outputItems, newItem];
    }

    this.einzelmassnahmenService.projectTitle.set(projectDb[0].title);
    // Update project signal
    einzelmassnahmenProject.update(() => ({
      title: projectDb[0].title,
      id: projectDb[0].id,
      items: outputItems,
    }));
  }

  async deleteEinzelmassnahmenProjectByProjectId(projectId: number) {
    await this.dbEinzelmassnahmenService.deleteEinzelmassnahmenProjectByProjectId(
      projectId
    );
    // Update the signal
    let einzelmassnahmenProjects =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenProjects();
    this.einzelmassnahmenService.projectsEinzelmassnahmen.update(
      () => einzelmassnahmenProjects
    );
  }
}
