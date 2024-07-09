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
  ],
  animations: [fadeInAnimation],
  host: {
    class: 'host-tool',
  },
})
export class EinzelmassnahmenComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
  protected einzelmassnahmenService = inject(EinzelmassnahmenService);
  protected dbEinzelmassnahmenService = inject(DbEinzelmassnahmenService);
  protected formService = inject(FormEinzelmassnahmenService);
  protected supabaseService = inject(SupabaseService);
  protected sharedService = inject(SharedService);
  private dialog = inject(MatDialog);

  protected projectExists = false;

  async saveProject() {
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
          await this.dbEinzelmassnahmenService.updateEinzelmassnahmenProject(
            this.einzelmassnahmenService.einzelmassnahmenOutputProject()
          );
        } catch (error) {
          console.error('Error creating project:', error);
        }
        // Project do not exist, then just create a new own
      } else if (this.projectExists && !projectId) {
        // Prompt user if we should overwrite
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Overwrite existing project?',
            message: `You already have a project with title ${projectTitle}.`,
          },
        });
        const result = await firstValueFrom(dialogRef.afterClosed());
        if (result) {
          await this.dbEinzelmassnahmenService.deleteEinzelmassnahmenProjectByProjectId(
            projectDb[0].id
          );

          const result =
            await this.dbEinzelmassnahmenService.createEinzelmassnahmenProject(
              this.einzelmassnahmenService.einzelmassnahmenOutputProject()
            );
        } else {
          return;
        }
      } else {
        try {
          const result =
            await this.dbEinzelmassnahmenService.createEinzelmassnahmenProject(
              this.einzelmassnahmenService.einzelmassnahmenOutputProject()
            );
        } catch (error) {
          console.error('Error creating project:', error);
        }
      }
    } catch (error) {
      console.error('Error saving project:', error);
      // Handle error (e.g., show an error message)
    }
  }

  // Information for the title
  title = 'Fördermittel Einzelmaßnahmen';
  kfwId = '000';
  kfwH2 = 'Placeholder heading2';
  kfwH3 = 'Placeholder heading3';
  kfwDescription =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, doloremque, error quod molestias nobis magni ipsam vero dolorum rerum doloribus assumenda voluptates. Accusantium doloribus quae officia? Accusamus provident praesentium iure deleniti vel, architecto asperiores dolores voluptatem quo doloremque similique temporibus repellat cumque, possimus quam soluta alias nesciunt tempore ducimus fugit. Expedita natus nulla at harum porro odio commodi iure corporis explicabo animi alias voluptas est ducimus aspernatur ut doloremque necessitatibus, facilis ullam tenetur! Repudiandae vitae, nam veritatis enim maxime exercitationem molestias ipsam? Laborum veniam consequuntur illum quia ratione corporis, ex iure ea officia rerum, cum nulla quasi, incidunt quibusdam voluptatibus.';

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
