import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../auth/supabase.service';
import { AuthComponent } from '../../auth/auth.component';
import { Session } from '@supabase/supabase-js';
import { EinzelmassnahmenService } from '../einzelmassnahmen/einzelmassnahmen.service';
import { TitleComponent } from '../../title/title.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, AuthComponent, TitleComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  host: {
    class: 'host-portfolio',
  },
})
export class PortfolioComponent {
  protected readonly supabaseService = inject(SupabaseService);
  protected readonly einzelmassnahmenService = inject(EinzelmassnahmenService);
  // session = this.supabase.session;

  projects: any[] = [];
  user = this.supabaseService.sessionSignal();

  description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga doloremque cumque, nemo, non aliquid ipsum omnis atque assumenda cupiditate earum, modi nam deleniti laudantium. Possimus aperiam voluptas esse. Error, beatae eos! Pariatur atque consequatur doloremque iure eligendi vel molestiae quasi ipsa veritatis iste aliquam, obcaecati aspernatur! Accusantium distinctio suscipit voluptatibus.';

  async ngOnInit() {
    this.projects = await this.supabaseService.getProjects();
  }

  async loadEinzelmassnahmenProject(
    projectId: number,
    einzelmassnahmenProject: WritableSignal<einzelmassnahmenOutputProject>
  ) {
    let outputItems: einzelmassnahmenOutputItem[] = [];
    const projectDb = await this.supabaseService.getProjectByProjectId(
      projectId
    );
    const itemsDb = await this.supabaseService.getItemsByProjectId(projectId);

    for (const itemDb of itemsDb) {
      let newItem: einzelmassnahmenOutputItem = {
        title: itemDb.title,
        values: [],
      };

      let valuesDb = await this.supabaseService.getValuesByItemId(itemDb.id);

      valuesDb.sort((a, b) => a.position - b.position);

      for (const valueDb of valuesDb) {
        let newValue: einzelmassnahmenOutputValue = {
          title: valueDb.title,
          unit: valueDb.unit,
          value: valueDb.value,
        };
        newItem.values = [...newItem.values, newValue];
      }
      outputItems = [...outputItems, newItem];
    }

    einzelmassnahmenProject.update(() => ({
      title: projectDb[0].title,
      items: outputItems,
    }));
    console.log('outputItems: ', outputItems);
    console.log('projectId: ', projectId);
    console.log('items: ', itemsDb);
  }
}
