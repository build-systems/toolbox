import { Component, HostBinding, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../auth/supabase.service';
import { AuthComponent } from '../../auth/auth.component';
import { EinzelmassnahmenService } from '../einzelmassnahmen/einzelmassnahmen.service';
import { TitleComponent } from '../../title/title.component';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations';
import { DbEinzelmassnahmenService } from '../einzelmassnahmen/db-einzelmassnahmen.service';
import { DbNeubauService } from '../neubau/db-neubau.service';
import { NeubauService } from '../neubau/neubau.service';
import { NeubauProjekt } from '../../shared/neubauprojekt';
import { FormProjektNeubauService } from '../neubau/form-projekt-neubau/form-projekt-neubau.service';
import { DbNeubau } from '../neubau/db-neubau';

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
  protected einzelmassnahmenService = inject(EinzelmassnahmenService);
  protected readonly dbEinzelmassnahmenService = inject(
    DbEinzelmassnahmenService
  );
  protected neubauService = inject(NeubauService);
  protected readonly dbNeubauService = inject(DbNeubauService);
  protected neubauProjektFormService = inject(FormProjektNeubauService);
  private router = inject(Router);

  description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga doloremque cumque, nemo, non aliquid ipsum omnis atque assumenda cupiditate earum, modi nam deleniti laudantium. Possimus aperiam voluptas esse. Error, beatae eos! Pariatur atque consequatur doloremque iure eligendi vel molestiae quasi ipsa veritatis iste aliquam, obcaecati aspernatur! Accusantium distinctio suscipit voluptatibus.';

  async ngOnInit() {
    let einzelmassnahmenProjects =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenProjects();
    this.einzelmassnahmenService.projectsEinzelmassnahmen.update(
      () => einzelmassnahmenProjects
    );

    let neubauProjects = await this.dbNeubauService.getNeubauProjects();
    // console.dir(neubauProjects);
    this.neubauService.projectsNeubau.update(() => neubauProjects);
  }

  async loadEinzelmassnahmenProject(
    projectId: number,
    einzelmassnahmenProject: WritableSignal<EinzelmassnahmenOutputProject>
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
    let outputItems: EinzelmassnahmenOutputItem[] = [];
    const itemsDb =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenItemsByProjectId(
        projectId
      );

    // Create items list
    for (const itemDb of itemsDb) {
      let newItem: EinzelmassnahmenOutputItem = {
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
        let newValue: EinzelmassnahmenOutputValue = {
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

  async createNewEinzelmassnahmen() {
    const newProjectTitle = this.getNewProjectTitle(
      this.einzelmassnahmenService.projectsEinzelmassnahmen()
    );
    this.einzelmassnahmenService.einzelmassnahmenOutputProject.update(() => ({
      title: newProjectTitle,
      id: undefined,
      items: [],
    }));
    const result =
      await this.dbEinzelmassnahmenService.createEinzelmassnahmenProject(
        this.einzelmassnahmenService.einzelmassnahmenOutputProject()
      );
    // Update the signal
    let einzelmassnahmenProjects =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenProjects();
    this.einzelmassnahmenService.projectsEinzelmassnahmen.update(
      () => einzelmassnahmenProjects
    );
  }

  getNewProjectTitle(projects: any[]): string {
    // Regex to match titles like "Untitled", "Untitled (2)", "Untitled (3)", etc.
    const untitledRegex = /^Untitled(?: \((\d+)\))?$/;

    let maxNumber = 0;

    for (const project of projects) {
      const match = project.projects.title.match(untitledRegex);
      if (match) {
        // If match[1] exists, it means it matched "Untitled (x)" where x is a number
        // If match[1] does not exist, it matched "Untitled"
        const number = match[1] ? parseInt(match[1], 10) : 1;
        if (number > maxNumber) {
          maxNumber = number;
        }
      }
    }

    // Increment maxNumber to get the next project title
    const newNumber = maxNumber + 1;
    return newNumber === 1 ? 'Untitled' : `Untitled (${newNumber})`;
  }

  async loadNeubauProject(projectId: number) {
    // Redirect
    this.router.navigateByUrl('/neubau');

    // Get project to retrieve name
    const projectDb: DbNeubau = (
      await this.dbNeubauService.getNeubauProjectByProjectId(projectId)
    )[0];

    this.neubauService.projectTitle.set(projectDb.title);
    // Update the form
    this.neubauProjektFormService.projektFormNeu.patchValue({
      eigeneKostenToggle: projectDb.eigene_kosten_disabled,
      eigeneKostenRange: projectDb.eigene_kosten,
      eigeneKosten: projectDb.eigene_kosten,
      wohnflaecheRange: projectDb.wohnflaeche,
      wohnflaeche: projectDb.wohnflaeche,
      anzahlWohnungenRange: projectDb.anzahl_wohnungen,
      anzahlWohnungen: projectDb.anzahl_wohnungen,
      konstruktion: projectDb.konstruktion,
      energiestandard: projectDb.energiestandard,
      zertifizierung: projectDb.zertifizierung,
      // Details
      kellergeschossIn: projectDb.kellergeschoss_in,
      stellplaetzeIn: projectDb.stellplaetze_in,
      aufzugsanlageIn: projectDb.aufzugsanlage_in,
      barrierefreiheitIn: projectDb.barrierefreiheit_in,
      dachbegruenungIn: projectDb.dachbegruenung_in,
      baustellenlogistikIn: projectDb.baustellenlogistik_in,
      aussenanlagenIn: projectDb.aussenanlagen_in,
      grundstuecksbezogeneKostenRange: projectDb.grundstuecksbezogene_kosten,
      grundstuecksbezogeneKosten: projectDb.grundstuecksbezogene_kosten,
      baunebenkostenOhneFinRange: projectDb.baunebenkosten_ohne_fin_in,
      baunebenkostenOhneFin: projectDb.baunebenkosten_ohne_fin_in,
    });
  }
}
