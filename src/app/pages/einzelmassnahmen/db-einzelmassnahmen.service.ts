import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../auth/supabase.service';
import { DbEinzelmassnahmen } from './db-einzelmassnahmen';

export const PROJECTS_TABLE = 'einzelmassnahmen_projects';
export const ITEMS_TABLE = 'einzelmassnahmen_items';
export const VALUES_TABLE = 'einzelmassnahmen_values';
export const USER_PROJECTS_TABLE = 'user_einzelmassnahmen_projects';
export const CREATE_PROJECT_FUNCTION =
  'insert_einzelmassnahmen_project_with_items_and_values';
export const UPDATE_PROJECT_FUNCTION =
  'update_einzelmassnahmen_project_items_and_values';

@Injectable({
  providedIn: 'root',
})
export class DbEinzelmassnahmenService {
  private supabaseService = inject(SupabaseService);

  async getEinzelmassnahmenProjects() {
    const projects = await this.supabaseService.supabase
      .from(USER_PROJECTS_TABLE)
      .select('projects:project_id(*)');
    return projects.data || [];
  }

  async getEinzelmassnahmenProjectByProjectId(projectId: number) {
    const { data, error } = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('id', projectId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getFullEinzelmassnahmenProjectByProjectId(
    projectId: number
  ): Promise<DbEinzelmassnahmen> {
    const { data, error } = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .select(`*, ${ITEMS_TABLE} (*, ${VALUES_TABLE} (*))`)
      .eq('id', projectId);
    if (error) {
      throw error;
    }
    return data[0];
  }

  async getEinzelmassnahmenProjectByProjectTitle(projectName: string) {
    const { data, error } = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('title', projectName);

    if (error) {
      console.error('Error getting project:', error);
      throw error;
    }

    return data;
  }

  async getEinzelmassnahmenItemsByProjectId(projectId: number) {
    const { data, error } = await this.supabaseService.supabase
      .from(ITEMS_TABLE)
      .select('*')
      .eq('project_id', projectId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getEinzelmassnahmenValuesByItemId(itemId: number) {
    const { data, error } = await this.supabaseService.supabase
      .from(VALUES_TABLE)
      .select('*')
      .eq('item_id', itemId);
    if (error) {
      throw error;
    }
    return data;
  }

  async createEinzelmassnahmenProject(projectData: EinzelmassnahmenProject) {
    try {
      const { data, error } = await this.supabaseService.supabase.rpc(
        CREATE_PROJECT_FUNCTION,
        {
          project_data: projectData,
        }
      );

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async deleteEinzelmassnahmenProjectByProjectId(projectId: number) {
    const response = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .delete()
      .eq('id', projectId);

    return response;
  }

  async updateEinzelmassnahmenProject(projectData: EinzelmassnahmenProject) {
    try {
      const { data, error } = await this.supabaseService.supabase.rpc(
        UPDATE_PROJECT_FUNCTION,
        {
          project_data: projectData,
        }
      );

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  async updateEinzelmassnahmenTitle(projectTitle: string, projectId: number) {
    const { error } = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .update({ title: projectTitle })
      .eq('id', projectId);
  }
}
