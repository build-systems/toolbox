import { Component, effect, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanierungService } from './sanierung.service';
import { FormProjektSanierungComponent } from './form-projekt-sanierung/form-projekt-sanierung.component';
import { FormDarlehenSanierungComponent } from './form-darlehen-sanierung/form-darlehen-sanierung.component';
import { ChartsProjektSanierungComponent } from './charts-projekt-sanierung/charts-projekt-sanierung.component';
import { ChartsDarlehenSanierungComponent } from './charts-darlehen-sanierung/charts-darlehen-sanierung.component';
import { NumbersProjektSanierungComponent } from './numbers-projekt-sanierung/numbers-projekt-sanierung.component';
import { NumbersDarlehenSanierungComponent } from './numbers-darlehen-sanierung/numbers-darlehen-sanierung.component';
import { TitleComponent } from '../../title/title.component';
import { fadeInAnimation } from '../../shared/animations';
import { HelpComponent } from '../../help/help.component';
import { DbSanierungService } from './db-sanierung.service';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, firstValueFrom, take } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { DbSanierung } from './db-sanierung';
import { Router } from '@angular/router';
import { SupabaseService } from '../../auth/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from '../../shared/app-settings';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FormProjektSanierungComponent,
    FormDarlehenSanierungComponent,
    ChartsProjektSanierungComponent,
    ChartsDarlehenSanierungComponent,
    NumbersProjektSanierungComponent,
    NumbersDarlehenSanierungComponent,
    HelpComponent,
  ],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'host-tool',
  },
  animations: [fadeInAnimation],
})
export class SanierungComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at sanierungprojekt.ts
  protected sanierungService = inject(SanierungService);
  private dbSanierungService = inject(DbSanierungService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private supabaseService = inject(SupabaseService);
  private snackBar = inject(MatSnackBar);
  private appDelay = inject(delay);

  // Information for the title
  title = 'Fördermittel Komplettsanierung';
  titleId = '261';
  titleH2 = 'Bundesförderung für Effiziente Gebäude';
  titleH3 = 'Haus und Wohnung energieeffizient sanieren';
  titleDescription =
    'Gefördert wird die Komplettsanierung zum Effizienzhaus oder die Umwidmung von Nichtwohnfläche in Wohnfläche. Erreichen Sie die Effizienzhaus-Stufe 85 oder besser, wird Ihr Vorhaben mit einem Kreditbetrag von bis zu 120.000 Euro je Wohneinheit gefördert. Der maximale Kredit­betrag steigt auf 150.000 Euro je Wohn­einheit, wenn Ihre Immobilie zusätzlich die Kriterien für eine Erneuerbare-Energien-Klasse oder eine Nachhaltigkeits-Klasse erreicht. In Abhängigkeit zur Effizienzhaus-Stufe erhalten Sie zudem einen Tilgungs­zuschuss von bis zu 45%.  <a target="_blank" rel="noopener noreferrer" href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Bundesf%C3%B6rderung-f%C3%BCr-effiziente-Geb%C3%A4ude-Wohngeb%C3%A4ude-Kredit-(261-262)">kfw.de ↗</a><br /><br /><p><u>Datengrundlage:</u> Die vom Tool generierten Daten und Kosten­kennwerte basieren auf der Forschungs­arbeit der <a target="_blank" rel="noopener noreferrer" href="https://arge-ev.de/arge-ev/publikationen/studien/">Arge e.V. ↗</a> und stammen spezifisch aus den Untersuchungen zu Wohnungs­bau // Die Zukunft des Bestandes, Bauforschungs­bericht Nr. 82 und Status und Prognose: So baut Deutschland – so wohnt Deutschland, Der Chancen-Check für den Wohnungs­bau, Bauforschungs­bericht Nr. 86. Die Kosten von Holz­bauten werden in der Kostens­chätzung gemäß [TAB-Kurzstudie Nr 3 “Urbaner Holzbau”; S. Kind, C. Bogenstahl, T. Jetzke, S. Richter; Juni 2022; Büro für Technikfolgen-Abschätzung beim Deutschen Bundestag] im Vergleich zu Massivbauten ca. 5% höher angesetzt.</p>';

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  async saveProject() {
    if (!this.supabaseService.sessionSignal()) {
      // Redirect
      this.router.navigateByUrl('/profile');
    } else {
      try {
        this.sanierungService.currentOutputSanierung$
          .pipe(take(1))
          .subscribe(async (value) => {
            const projectDb: DbSanierung = (
              await this.dbSanierungService.getSanierungProjectByProjectTitle(
                value.title
              )
            )[0];

            // If observable does have id, it means the project wasnt loaded aka is new
            if (projectDb && this.sanierungService.projectId()) {
              try {
                const result =
                  await this.dbSanierungService.updateSanierungProject(value);
                let message: string;
                if (result) {
                  message = 'Project successfully updated';
                } else {
                  message = 'Error';
                }
                this.snackBar.open(message, 'Ok', {
                  duration: this.appDelay.snackbar,
                });
              } catch (error) {
                console.error('Error updating project:', error);
              }
            } else if (projectDb && !this.sanierungService.projectId()) {
              // Prompt user if we should overwrite
              try {
                const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                  data: {
                    title: 'Overwrite existing project?',
                    message: `You already have a project with title ${value.title}.`,
                  },
                });
                const result = await firstValueFrom(dialogRef.afterClosed());
                if (result) {
                  const deleted =
                    await this.dbSanierungService.deleteSanierungProjectByProjectId(
                      projectDb.id
                    );
                  if (deleted.status === 204) {
                    const result =
                      await this.dbSanierungService.createSanierungProject(
                        value
                      );
                    let message: string;
                    if (result) {
                      message = 'Project successfully overwritten';
                    } else {
                      message = 'Error';
                    }
                    this.snackBar.open(message, 'Ok', {
                      duration: this.appDelay.snackbar,
                    });
                  }
                } else {
                  return;
                }
              } catch (error) {
                console.error('Error overwriting project:', error);
              }
            } else {
              try {
                const result =
                  await this.dbSanierungService.createSanierungProject(value);
                let message: string;
                if (result) {
                  message = 'Project successfully created';
                } else {
                  message = 'Error';
                }
                this.snackBar.open(message, 'Ok', {
                  duration: this.appDelay.snackbar,
                });
              } catch (error) {
                console.error('Error creating project:', error);
              }
            }
          });
      } catch (error) {
        console.error('Error saving project:', error);
      }
    }
  }

  oldTitle = 'Untitled';
  projectId: number | undefined;

  constructor() {
    // Debounce is a custom function to delay the signal delivery, see more here:
    // https://stackoverflow.com/questions/76597307/angular-signals-debounce-in-effect
    effect(
      () => {
        if (
          this.sanierungService.debouncedProjectTitle() != this.oldTitle &&
          this.sanierungService.projectId()
        ) {
          this.dbSanierungService.updateSanierungTitle(
            this.sanierungService.debouncedProjectTitle(),
            this.sanierungService.projectId()!
          );

          const currentData = this.sanierungService.outputSanierung;
          this.sanierungService.outputSanierungSource.next({
            ...currentData,
            title: this.sanierungService.debouncedProjectTitle(),
          });
        }
      },
      { allowSignalWrites: true }
    );

    this.sanierungService.currentOutputSanierung$
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.oldTitle = value.title;
        this.projectId = value.id;
      });
  }
}
