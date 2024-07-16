import { Component, HostBinding, inject, WritableSignal } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { SupabaseService } from '../../auth/supabase.service';
import { AuthComponent } from '../../auth/auth.component';
import { EinzelmassnahmenService } from '../einzelmassnahmen/einzelmassnahmen.service';
import { TitleComponent } from '../../title/title.component';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations';
import { DbEinzelmassnahmenService } from '../einzelmassnahmen/db-einzelmassnahmen.service';
import { DbNeubauService } from '../neubau/db-neubau.service';
import { NeubauService } from '../neubau/neubau.service';
import { FormProjektNeubauService } from '../neubau/form-projekt-neubau/form-projekt-neubau.service';
import { DbNeubau } from '../neubau/db-neubau';
import { FormDarlehenNeubauService } from '../neubau/form-darlehen-neubau/form-darlehen-neubau.service';
import { take } from 'rxjs';
import { SanierungService } from '../sanierung/sanierung.service';
import { DbSanierungService } from '../sanierung/db-sanierung.service';
import { FormProjektSanierungService } from '../sanierung/form-projekt-sanierung/form-projekt-sanierung.service';
import { FormDarlehenSanierungService } from '../sanierung/form-darlehen-sanierung/form-darlehen-sanierung.service';
import { DbSanierung } from '../sanierung/db-sanierung';
import localeDe from '@angular/common/locales/de';
import { DbEinzelmassnahmen } from '../einzelmassnahmen/db-einzelmassnahmen';
registerLocaleData(localeDe, 'de');
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from '../../shared/app-settings';

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
  protected neubauDarlehenFormService = inject(FormDarlehenNeubauService);
  protected sanierungService = inject(SanierungService);
  protected readonly dbSanierungService = inject(DbSanierungService);
  protected sanierungProjektFormService = inject(FormProjektSanierungService);
  protected sanierungDarlehenFormService = inject(FormDarlehenSanierungService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private appDelay = inject(delay);

  description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga doloremque cumque, nemo, non aliquid ipsum omnis atque assumenda cupiditate earum, modi nam deleniti laudantium. Possimus aperiam voluptas esse. Error, beatae eos! Pariatur atque consequatur doloremque iure eligendi vel molestiae quasi ipsa veritatis iste aliquam, obcaecati aspernatur! Accusantium distinctio suscipit voluptatibus.';

  async ngOnInit() {
    let einzelmassnahmenProjects: any[] =
      await this.dbEinzelmassnahmenService.getEinzelmassnahmenProjects();
    einzelmassnahmenProjects.sort((a, b) => {
      return (
        new Date(b.projects.created_at).getTime() -
        new Date(a.projects.created_at).getTime()
      );
    });
    this.einzelmassnahmenService.projectsEinzelmassnahmen.update(
      () => einzelmassnahmenProjects
    );

    let neubauProjects: any[] = await this.dbNeubauService.getNeubauProjects();
    neubauProjects.sort((a, b) => {
      return (
        new Date(b.projects.created_at).getTime() -
        new Date(a.projects.created_at).getTime()
      );
    });
    this.neubauService.projectsNeubau.update(() => neubauProjects);

    let sanierungProjects: any[] =
      await this.dbSanierungService.getSanierungProjects();
    sanierungProjects.sort((a, b) => {
      return (
        new Date(b.projects.created_at).getTime() -
        new Date(a.projects.created_at).getTime()
      );
    });
    this.sanierungService.projectsSanierung.update(() => sanierungProjects);
  }

  async loadEinzelmassnahmenProject(
    projectId: number,
    einzelmassnahmenProject: WritableSignal<EinzelmassnahmenProject>
  ) {
    // Clean project signal (to avoid flashing)
    einzelmassnahmenProject.update(() => ({
      title: 'Untitled',
      id: undefined,
      items: [],
      vollkosten: 0,
    }));

    // Redirect
    this.router.navigateByUrl('/einzelmassnahmen');

    const fullProjectDb: DbEinzelmassnahmen =
      await this.dbEinzelmassnahmenService.getFullEinzelmassnahmenProjectByProjectId(
        projectId
      );

    // Re-create the list using interface
    let outputItems: EinzelmassnahmenItem[] = [];

    // Create items list
    for (const itemDb of fullProjectDb.einzelmassnahmen_items) {
      let newItem: EinzelmassnahmenItem = {
        title: itemDb.title,
        id: itemDb.id,
        values: [],
      };

      itemDb.einzelmassnahmen_values.sort((a, b) => a.position - b.position);

      for (const valueDb of itemDb.einzelmassnahmen_values) {
        let newValue: EinzelmassnahmenValue = {
          title: valueDb.title,
          id: valueDb.id,
          unit: valueDb.unit,
          value: valueDb.value,
        };
        newItem.values = [...newItem.values, newValue];
      }
      outputItems = [...outputItems, newItem];
    }

    this.einzelmassnahmenService.projectTitle.set(fullProjectDb.title);
    // Update project signal
    einzelmassnahmenProject.update(() => ({
      title: fullProjectDb.title,
      id: fullProjectDb.id,
      items: outputItems,
      vollkosten: fullProjectDb.vollkosten,
    }));
  }

  async deleteEinzelmassnahmenProjectByProjectId(projectId: number) {
    try {
      const projectCopy: any[] =
        this.einzelmassnahmenService.projectsEinzelmassnahmen();
      const snackbar = this.snackBar.open(
        'Einzelmassnahmen project deleted',
        'Undo',
        {
          duration: this.appDelay.snackbar,
        }
      );
      // Update project list client side
      this.einzelmassnahmenService.projectsEinzelmassnahmen.update(() =>
        projectCopy.filter((item) => item.projects.id !== projectId)
      );
      // If user click 'Undo', load old list again and return.
      snackbar.onAction().subscribe(() => {
        this.einzelmassnahmenService.projectsEinzelmassnahmen.update(
          () => projectCopy
        );
        return;
      });
      // If user did not click 'Undo', then delete from database
      snackbar.afterDismissed().subscribe(async (info) => {
        if (!info.dismissedByAction) {
          const deleted =
            await this.dbEinzelmassnahmenService.deleteEinzelmassnahmenProjectByProjectId(
              projectId
            );
        }
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  async createEinzelmassnahmenProject() {
    const newProjectTitle = this.getNewProjectTitle(
      this.einzelmassnahmenService.projectsEinzelmassnahmen()
    );
    this.einzelmassnahmenService.einzelmassnahmenOutputProject.update(() => ({
      title: newProjectTitle,
      id: undefined,
      items: [],
      vollkosten: 0,
    }));
    const result =
      await this.dbEinzelmassnahmenService.createEinzelmassnahmenProject(
        this.einzelmassnahmenService.einzelmassnahmenOutputProject()
      );
    const oldArray: any[] =
      this.einzelmassnahmenService.projectsEinzelmassnahmen();
    let newArray = [...oldArray, { projects: result }];
    newArray.sort((a, b) => {
      return (
        new Date(b.projects.created_at).getTime() -
        new Date(a.projects.created_at).getTime()
      );
    });
    this.einzelmassnahmenService.projectsEinzelmassnahmen.update(
      () => newArray
    );
    let message: string;
    if (result) {
      message = 'Project successfully created';
    } else {
      message = 'Error';
    }
    this.snackBar.open(message, 'Ok', {
      duration: this.appDelay.snackbar,
    });
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
    this.neubauService.projectId.set(projectDb.id);
    const currentData = this.neubauService.outputNeubau;
    this.neubauService.outputNeubauSource.next({
      ...currentData,
      id: projectDb.id,
      title: projectDb.title,
    });

    // Update the form
    this.neubauProjektFormService.projektFormNeu.patchValue({
      eigeneKostenToggle: !projectDb.eigene_kosten_disabled, // Remove negation as sanierung
      eigeneKostenRange: projectDb.eigene_kosten, // Name should be similar to sanierung
      eigeneKosten: projectDb.eigene_kosten, // Name should be similar to sanierung
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
      baunebenkostenOhneFinRange: projectDb.baunebenkosten_ohne_fin_in * 100, // Come as percentage
      baunebenkostenOhneFin: projectDb.baunebenkosten_ohne_fin_in * 100, // Comes as percentage
    });
    this.neubauDarlehenFormService.darlehenForm.patchValue({
      zinssatzBankRange: projectDb.zinssatz_bank * 100,
      zinssatzBank: (projectDb.zinssatz_bank * 100).toFixed(2),
      kreditlaufzeitRange: projectDb.kreditlaufzeit,
      kreditlaufzeit: projectDb.kreditlaufzeit,
      kfWDarlehen: projectDb.kfw_darlehen,
      bankDarlehen: projectDb.bank_darlehen,
    });
  }

  async deleteNeubauProjectByProjectId(projectId: number) {
    try {
      const projectCopy: any[] = this.neubauService.projectsNeubau();
      const snackbar = this.snackBar.open('Neubau project deleted', 'Undo', {
        duration: this.appDelay.snackbar,
      });
      // Update project list client side
      this.neubauService.projectsNeubau.update(() =>
        projectCopy.filter((item) => item.projects.id !== projectId)
      );
      // If user click 'Undo', load old list again and return.
      snackbar.onAction().subscribe(() => {
        this.neubauService.projectsNeubau.update(() => projectCopy);
        return;
      });
      // If user did not click 'Undo', then delete from database
      snackbar.afterDismissed().subscribe(async (info) => {
        if (!info.dismissedByAction) {
          const deleted =
            await this.dbNeubauService.deleteNeubauProjectByProjectId(
              projectId
            );
        }
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  async createNeubauProject() {
    const newProjectTitle = this.getNewProjectTitle(
      this.neubauService.projectsNeubau()
    );
    this.neubauService.projectTitle.set(newProjectTitle);
    // Update the form with initial values (referencing service for form project and darlehen)
    this.neubauProjektFormService.projektFormNeu.patchValue({
      eigeneKostenToggle: false,
      eigeneKostenRange: this.neubauProjektFormService.eigeneKosten.value,
      eigeneKosten: this.neubauProjektFormService.eigeneKosten.value,
      wohnflaecheRange: this.neubauProjektFormService.wohnflaeche.value,
      wohnflaeche: this.neubauProjektFormService.wohnflaeche.value,
      anzahlWohnungenRange: this.neubauProjektFormService.anzahlWohnungen.value,
      anzahlWohnungen: this.neubauProjektFormService.anzahlWohnungen.value,
      konstruktion: this.neubauProjektFormService.konstruktion.options[0].value,
      energiestandard:
        this.neubauProjektFormService.energiestandard.options[0].value,
      zertifizierung:
        this.neubauProjektFormService.zertifizierung.options[0].value,
      // Details
      kellergeschossIn:
        this.neubauProjektFormService.kellergeschoss.options[0].value,
      stellplaetzeIn:
        this.neubauProjektFormService.stellplaetze.options[0].value,
      aufzugsanlageIn:
        this.neubauProjektFormService.aufzugsanlage.options[0].value,
      barrierefreiheitIn:
        this.neubauProjektFormService.barrierefreiheit.options[0].value,
      dachbegruenungIn:
        this.neubauProjektFormService.dachbegruenung.options[0].value,
      baustellenlogistikIn:
        this.neubauProjektFormService.baustellenlogistik.options[0].value,
      aussenanlagenIn:
        this.neubauProjektFormService.aussenanlagen.options[0].value,
      grundstuecksbezogeneKostenRange:
        this.neubauProjektFormService.grundstKosten.value,
      grundstuecksbezogeneKosten:
        this.neubauProjektFormService.grundstKosten.value,
      baunebenkostenOhneFinRange:
        this.neubauProjektFormService.baunebenkostenOhneFin.value,
      baunebenkostenOhneFin:
        this.neubauProjektFormService.baunebenkostenOhneFin.value,
    });
    this.neubauDarlehenFormService.darlehenForm.patchValue({
      zinssatzBankRange: this.neubauDarlehenFormService.zinssatzBank.value,
      zinssatzBank:
        this.neubauDarlehenFormService.zinssatzBank.value.toFixed(2),
      kreditlaufzeitRange: this.neubauDarlehenFormService.kreditlaufzeit.value,
      kreditlaufzeit: this.neubauDarlehenFormService.kreditlaufzeit.value,
      kfWDarlehen:
        this.neubauDarlehenFormService.kfWDarlehen.options[0]['value'],
      bankDarlehen:
        this.neubauDarlehenFormService.bankDarlehen.options[0]['value'],
    });

    // After updating the form values, insert the project to the database
    this.neubauService.currentOutputNeubau$
      .pipe(take(1))
      .subscribe(async (value) => {
        const result = await this.dbNeubauService.createNeubauProject(value);
        // Update the signal
        let oldArray: any[] = this.neubauService.projectsNeubau();
        let newArray = [...oldArray, { projects: result }];
        newArray.sort((a, b) => {
          return (
            new Date(b.projects.created_at).getTime() -
            new Date(a.projects.created_at).getTime()
          );
        });
        this.neubauService.projectsNeubau.update(() => newArray);
        let message: string;
        if (result) {
          message = 'Project successfully created';
        } else {
          message = 'Error';
        }
        this.snackBar.open(message, 'Ok', {
          duration: this.appDelay.snackbar,
        });
      });
  }

  async loadSanierungProject(projectId: number) {
    // Redirect
    this.router.navigateByUrl('/sanierung');

    // Get project to retrieve name
    const projectDb: DbSanierung = (
      await this.dbSanierungService.getSanierungProjectByProjectId(projectId)
    )[0];

    this.sanierungService.projectTitle.set(projectDb.title);
    this.sanierungService.projectId.set(projectDb.id);
    const currentData = this.sanierungService.outputSanierung;
    this.sanierungService.outputSanierungSource.next({
      ...currentData,
      id: projectDb.id,
      title: projectDb.title,
    });
    // Update the form
    this.sanierungProjektFormService.projektForm.patchValue({
      projektType: projectDb.projekt_type,
      eigeneKostenToggle: !projectDb.user_price_disabled, // this type should match neubau this looks horrible
      eigeneKostenRange: projectDb.user_price, // this type should match neubau
      eigeneKosten: projectDb.user_price,
      wohnflaecheRange: projectDb.wohnflaeche,
      wohnflaeche: projectDb.wohnflaeche,
      anzahlWohnungenRange: projectDb.anzahl_wohnungen,
      anzahlWohnungen: projectDb.anzahl_wohnungen,
      energiestandard: projectDb.energiestandard,
      // Details
      umfangModernisierung: projectDb.umfang_modernisierung!,
      worstPerformingBuilding: projectDb.worst_performing_building,
      foerderbonus: projectDb.foerderbonus,
      serielleSanierung: projectDb.serielle_sanierung,
    });
    this.sanierungDarlehenFormService.darlehenForm.patchValue({
      zinssatzBankRange: projectDb.zinssatz_bank * 100,
      zinssatzBank: (projectDb.zinssatz_bank * 100).toFixed(2),
      kreditlaufzeitRange: projectDb.kreditlaufzeit,
      kreditlaufzeit: projectDb.kreditlaufzeit,
      kfWDarlehen: projectDb.kfw_darlehen,
      bankDarlehen: projectDb.bank_darlehen,
    });
  }

  async deleteSanierungProjectByProjectId(projectId: number) {
    try {
      const projectListCopy: any[] = this.sanierungService.projectsSanierung();
      const projectRemoved = projectListCopy.filter(
        (item) => item.projects.id === projectId
      )[0];
      const snackbar = this.snackBar.open(
        'Komplettsanierung project deleted',
        'Undo',
        {
          duration: this.appDelay.snackbar,
        }
      );
      // Update project list client side
      this.sanierungService.projectsSanierung.update(() =>
        projectListCopy.filter((item) => item.projects.id !== projectId)
      );
      // If user click 'Undo', load old list again and return.
      snackbar.onAction().subscribe(() => {
        let oldArray = this.sanierungService.projectsSanierung();
        let newArray = [...oldArray, projectRemoved];
        newArray.sort((a, b) => {
          return (
            new Date(b.projects.created_at).getTime() -
            new Date(a.projects.created_at).getTime()
          );
        });
        this.sanierungService.projectsSanierung.update(() => newArray);
        return;
      });
      // If user did not click 'Undo', then delete from database
      snackbar.afterDismissed().subscribe(async (info) => {
        if (!info.dismissedByAction) {
          const deleted =
            await this.dbSanierungService.deleteSanierungProjectByProjectId(
              projectId
            );
        }
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  async createSanierungProject() {
    const newProjectTitle = this.getNewProjectTitle(
      this.sanierungService.projectsSanierung()
    );
    this.sanierungService.projectTitle.set(newProjectTitle);
    // Update the form with initial values (referencing service for form project and darlehen)
    this.sanierungProjektFormService.projektForm.patchValue({
      projektType:
        this.sanierungProjektFormService.projektType.options[0].value,
      eigeneKostenToggle: false,
      eigeneKostenRange: this.sanierungProjektFormService.eigeneKosten.value,
      eigeneKosten: this.sanierungProjektFormService.eigeneKosten.value,
      wohnflaecheRange: this.sanierungProjektFormService.wohnflaeche.value,
      wohnflaeche: this.sanierungProjektFormService.wohnflaeche.value,
      anzahlWohnungenRange:
        this.sanierungProjektFormService.anzahlWohnungen.value,
      anzahlWohnungen: this.sanierungProjektFormService.anzahlWohnungen.value,
      umfangModernisierung:
        this.sanierungProjektFormService.umfangModernisierung.options[0].value,
      energiestandard:
        this.sanierungProjektFormService.energiestandard.options[0].value,
      worstPerformingBuilding:
        this.sanierungProjektFormService.worstPerformingBuilding.value,
      foerderbonus:
        this.sanierungProjektFormService.foerderbonus.options[0].value,
      serielleSanierung:
        this.sanierungProjektFormService.serielleSanierung.value,
    });
    this.sanierungDarlehenFormService.darlehenForm.patchValue({
      zinssatzBankRange: this.sanierungDarlehenFormService.zinssatzBank.value,
      zinssatzBank:
        this.sanierungDarlehenFormService.zinssatzBank.value.toFixed(2),
      kreditlaufzeitRange:
        this.sanierungDarlehenFormService.kreditlaufzeit.value,
      kreditlaufzeit: this.sanierungDarlehenFormService.kreditlaufzeit.value,
      kfWDarlehen:
        this.sanierungDarlehenFormService.kfWDarlehen.options[0]['value'],
      bankDarlehen:
        this.sanierungDarlehenFormService.bankDarlehen.options[0]['value'],
    });

    // After updating the form values, insert the project to the database
    this.sanierungService.currentOutputSanierung$
      .pipe(take(1))
      .subscribe(async (value) => {
        const result = await this.dbSanierungService.createSanierungProject(
          value
        );
        // Update the signal
        let oldArray: any[] = this.sanierungService.projectsSanierung();
        let newArray = [...oldArray, { projects: result }];
        newArray.sort((a, b) => {
          return (
            new Date(b.projects.created_at).getTime() -
            new Date(a.projects.created_at).getTime()
          );
        });
        this.sanierungService.projectsSanierung.update(() => newArray);
        let message: string;
        if (result) {
          message = 'Project successfully created';
        } else {
          message = 'Error';
        }
        this.snackBar.open(message, 'Ok', {
          duration: this.appDelay.snackbar,
        });
      });
  }
}
