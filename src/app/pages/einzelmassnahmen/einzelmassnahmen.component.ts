import { Component, HostBinding, effect, inject } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations';
import { EinzelmassnahmenService } from './einzelmassnahmen.service';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../title/title.component';
import { NumbersEinzelmassnahmenComponent } from './numbers-einzelmassnahmen/numbers-einzelmassnahmen.component';
import { HelpComponent } from '../../help/help.component';
import { FormEinzelmassnahmenComponent } from './form-einzelmassnahmen/form-einzelmassnahmen.component';
import { ListEinzelmassnahmenComponent } from './list-einzelmassnahmen/list-einzelmassnahmen.component';
import { ChartGkostenEinzelmassnahmenComponent } from './chart-gkosten-einzelmassnahmen/chart-gkosten-einzelmassnahmen.component';
import { HausSectionComponent } from './haus-section/haus-section.component';
import { FormsModule } from '@angular/forms';
import { FormEinzelmassnahmenService } from './form-einzelmassnahmen/form-einzelmassnahmen.service';
import { SupabaseService } from '../../auth/supabase.service';
import { DbEinzelmassnahmenService } from './db-einzelmassnahmen.service';
import { SharedService } from '../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from '../../shared/app-settings';
import { RadioComponent } from '../../radio/radio.component';
import { SliderInputComponent } from '../../slider-input/slider-input.component';

@Component({
  selector: 'app-einzelmassnahmen',
  standalone: true,
  templateUrl: './einzelmassnahmen.component.html',
  styleUrl: './einzelmassnahmen.component.css',
  imports: [
    CommonModule,
    FormsModule,
    TitleComponent,
    NumbersEinzelmassnahmenComponent,
    HelpComponent,
    FormEinzelmassnahmenComponent,
    ListEinzelmassnahmenComponent,
    ChartGkostenEinzelmassnahmenComponent,
    HausSectionComponent,
    RadioComponent,
    SliderInputComponent,
  ],
  animations: [fadeInAnimation],
  host: {
    class: 'host-tool',
  },
})

// I know it is a mess, sorry
export class EinzelmassnahmenComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
  protected einzelmassnahmenService = inject(EinzelmassnahmenService);
  protected dbEinzelmassnahmenService = inject(DbEinzelmassnahmenService);
  protected formService = inject(FormEinzelmassnahmenService);
  protected supabaseService = inject(SupabaseService);
  protected sharedService = inject(SharedService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private appDelay = inject(delay);

  protected projectExists = false;

  async saveProject() {
    if (!this.supabaseService.sessionSignal()) {
      // Redirect if not logged
      this.router.navigateByUrl('/profile');
    } else {
      try {
        const projectTitle =
          this.einzelmassnahmenService.einzelmassnahmenOutputProject().title;
        const projectId =
          this.einzelmassnahmenService.einzelmassnahmenOutputProject().id;
        // Check if project exists
        const projectDb =
          await this.dbEinzelmassnahmenService.getEinzelmassnahmenProjectByProjectTitle(
            projectTitle
          );
        this.projectExists = projectDb.length > 0;
        // If project exists
        if (this.projectExists && projectId) {
          try {
            const result =
              await this.dbEinzelmassnahmenService.updateEinzelmassnahmenProject(
                this.einzelmassnahmenService.einzelmassnahmenOutputProject()
              );
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
          // Project do not exist, then just create a new own
        } else if (this.projectExists && !projectId) {
          try {
            // Prompt user if we should overwrite
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Overwrite existing project?',
                message: `You already have a project with title ${projectTitle}.`,
              },
            });
            const result = await firstValueFrom(dialogRef.afterClosed());
            if (result) {
              const deleted =
                await this.dbEinzelmassnahmenService.deleteEinzelmassnahmenProjectByProjectId(
                  projectDb[0].id
                );
              if (deleted.status === 204) {
                const result =
                  await this.dbEinzelmassnahmenService.createEinzelmassnahmenProject(
                    this.einzelmassnahmenService.einzelmassnahmenOutputProject()
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
              await this.dbEinzelmassnahmenService.createEinzelmassnahmenProject(
                this.einzelmassnahmenService.einzelmassnahmenOutputProject()
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
          } catch (error) {
            console.error('Error creating project:', error);
          }
        }
      } catch (error) {
        console.error('Error saving project:', error);
      }
    }
  }

  // Information for the title
  title = 'Fördermittel Einzelmaßnahmen';
  titleId = 'BEGEM';
  titleIdTitle = 'BAFA ID';
  titleH2 = 'Bundesförderung für Effiziente Gebäude';
  titleH3 = 'Einzelmaßnahmen an der Gebäudehülle';
  titleDescription =
    'Gefördert werden Einzelmaßnahmen an Bestandsgebäuden, deren Bauantrag beziehungsweise Bauanzeige zum Zeitpunkt der Antragstellung mindestens fünf Jahre zurückliegt. Zu den Wohngebäuden gehören auch Wohn-, Alten- und Pflegeheime und ähnliche Einrichtungen.  <a target="_blank" rel="noopener noreferrer" href="https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/Sanierung_Wohngebaeude/Gebaeudehuelle/gebaeudehuelle_node.html">bafa.de ↗</a>';

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  oldTitle = 'Untitled';
  projectId: number | undefined;

  constructor() {
    // Debounce is a custom function to delay the signal delivery, see more here:
    // https://stackoverflow.com/questions/76597307/angular-signals-debounce-in-effect
    effect(
      () => {
        if (
          this.einzelmassnahmenService.debouncedProjectTitle() !=
            this.oldTitle &&
          this.projectId
        ) {
          this.dbEinzelmassnahmenService.updateEinzelmassnahmenTitle(
            this.einzelmassnahmenService.debouncedProjectTitle(),
            this.projectId!
          );

          this.einzelmassnahmenService.einzelmassnahmenOutputProject.update(
            (old) => ({
              ...old,
              title: this.einzelmassnahmenService.debouncedProjectTitle(),
            })
          );
        } else if (
          this.einzelmassnahmenService.debouncedProjectTitle() !=
            this.oldTitle &&
          !this.projectId
        ) {
          this.einzelmassnahmenService.einzelmassnahmenOutputProject.update(
            (old) => ({
              ...old,
              title: this.einzelmassnahmenService.debouncedProjectTitle(),
            })
          );
        }
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      this.oldTitle =
        this.einzelmassnahmenService.einzelmassnahmenOutputProject().title;
      this.projectId =
        this.einzelmassnahmenService.einzelmassnahmenOutputProject().id;
    });
  }
}
