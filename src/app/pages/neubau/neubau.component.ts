import { Component, effect, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeubauService } from './neubau.service';
import { FormProjektNeubauComponent } from './form-projekt-neubau/form-projekt-neubau.component';
import { FormDarlehenNeubauComponent } from './form-darlehen-neubau/form-darlehen-neubau.component';
import { ChartsProjektNeubauComponent } from './charts-projekt-neubau/charts-projekt-neubau.component';
import { ChartsDarlehenNeubauComponent } from './charts-darlehen-neubau/charts-darlehen-neubau.component';
import { NumbersProjektNeubauComponent } from './numbers-projekt-neubau/numbers-projekt-neubau.component';
import { NumbersDarlehenNeubauComponent } from './numbers-darlehen-neubau/numbers-darlehen-neubau.component';
import { TitleComponent } from '../../title/title.component';
import { fadeInAnimation } from '../../shared/animations';
import { HelpComponent } from '../../help/help.component';
import { DbNeubauService } from './db-neubau.service';
import { debounceTime, firstValueFrom, take } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DbNeubau } from './db-neubau';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FormProjektNeubauComponent,
    FormDarlehenNeubauComponent,
    ChartsProjektNeubauComponent,
    ChartsDarlehenNeubauComponent,
    NumbersProjektNeubauComponent,
    NumbersDarlehenNeubauComponent,
    HelpComponent,
  ],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'host-tool',
  },
  animations: [fadeInAnimation],
})
export class NeubauComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at neubauprojekt.ts
  protected neubauService = inject(NeubauService);
  private dbNeubauService = inject(DbNeubauService);
  private dialog = inject(MatDialog);

  // Information for the title section
  title = 'Fördermittel Neubau';
  kfwId = '297/298';
  kfwH2 = 'Bundesförderung für Effiziente Gebäude';
  kfwH3 = 'Haus und Wohnung energieeffizient und nachhaltig bauen';
  kfwDescription =
    'Gefördert wird der Neubau von energieeffizienten und nachhaltigen Wohngebäuden. Erreichen Sie die Effizienz­haus-Stufe 40 mit der Zertifizierung klimafreundlicher Neubau, wird Ihr Vorhaben mit einem Kreditbetrag von bis zu 100.000 Euro je Wohneinheit gefördert. Der maximale Kredit­betrag steigt auf 150.000 Euro je Wohn­einheit, wenn Ihre Immobilie zusätzlich ein Qualitätssiegel Nachhaltiges Gebäude vorweisen kann. <a target="_blank" rel="noopener noreferrer" href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/F%C3%B6rderprodukte/Klimafreundlicher-Neubau-Wohngeb%C3%A4ude-(297-298)">kfw.de ↗</a> <br /><br /><p><u>Datengrundlage:</u> Die vom Tool generierten Daten und Kosten­kennwerte basieren auf der Forschungs­arbeit der <a target="_blank" rel="noopener noreferrer" href="https://arge-ev.de/arge-ev/publikationen/studien/">Arge e.V. ↗</a> und stammen spezifisch aus den Untersuchungen zu Wohnungsbau // Die Zukunft des Bestandes, Bauforschungs­bericht Nr. 82 und Status und Prognose: So baut Deutschland – so wohnt Deutschland, Der Chancen-Check für den Wohnungsbau, Bauforschungs­bericht Nr. 86. Die Kosten von Holz­bauten werden in der Kostens­chätzung gemäß [TAB-Kurzstudie Nr 3 “Urbaner Holzbau”; S. Kind, C. Bogenstahl, T. Jetzke, S. Richter; Juni 2022; Büro für Technikfolgen-Abschätzung beim Deutschen Bundestag] im Vergleich zu Massivbauten ca. 5% höher angesetzt.</p>';

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  async saveProject() {
    try {
      this.neubauService.currentOutputNeubau$
        .pipe(take(1))
        .subscribe(async (value) => {
          console.dir(value);
          const projectDb: DbNeubau = (
            await this.dbNeubauService.getNeubauProjectByProjectTitle(
              value.title
            )
          )[0];
          // If observable does have id, it means the project wasnt loaded aka is new
          if (projectDb && value.id) {
            try {
              await this.dbNeubauService.updateNeubauProject(value);
            } catch (error) {
              console.error('Error updating project:', error);
            }
          } else if (projectDb && !value.id) {
            try {
              // Prompt user if we should overwrite
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                  title: 'Overwrite existing project?',
                  message: `You already have a project with title ${value.title}.`,
                },
              });
              const result = await firstValueFrom(dialogRef.afterClosed());
              if (result) {
                await this.dbNeubauService.deleteNeubauProjectByProjectId(
                  projectDb.id
                );
                this.dbNeubauService.createNeubauProject(value);
              } else {
                return;
              }
            } catch (error) {
              console.error('Error overwriting project:', error);
            }
          } else {
            try {
              await this.dbNeubauService.createNeubauProject(value);
            } catch (error) {
              console.error('Error creating project:', error);
            }
          }
        });
    } catch (error) {
      console.error('Error on saveProject() function:', error);
    }
  }

  oldTitle = 'Untitled';
  projectId: number | undefined;

  constructor() {
    // Debounce is a custom function to delay the signal delivery, see more here:
    // https://stackoverflow.com/questions/76597307/angular-signals-debounce-in-effect
    effect(
      () => {
        console.log(
          'this.neubauService.debouncedProjectTitle() ',
          this.neubauService.debouncedProjectTitle()
        );
        console.log('this.oldTitle: ', this.oldTitle);

        if (
          this.neubauService.debouncedProjectTitle() != this.oldTitle &&
          this.neubauService.projectId()
        ) {
          this.dbNeubauService.updateNeubauTitle(
            this.neubauService.debouncedProjectTitle(),
            this.neubauService.projectId()!
          );

          const currentData = this.neubauService.outputNeubau;
          this.neubauService.outputNeubauSource.next({
            ...currentData,
            title: this.neubauService.debouncedProjectTitle(),
          });
        }
      },
      { allowSignalWrites: true }
    );

    this.neubauService.currentOutputNeubau$
      .pipe(
        debounceTime(600) // Wait for 1000ms pause in events
      )
      .subscribe((value) => {
        this.oldTitle = value.title;
        this.projectId = value.id;
      });
  }
}
