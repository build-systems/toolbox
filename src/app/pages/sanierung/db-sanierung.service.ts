import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../auth/supabase.service';
import { SanierungProjekt } from './sanierungprojekt';

export const PROJECTS_TABLE = 'public.sanierung_projects';
export const USER_PROJECTS_TABLE = 'public.user_sanierung_projects';
export const CREATE_PROJECT_FUNCTION = 'public.insert_sanierung_project';
export const UPDATE_PROJECT_FUNCTION = 'public.update_sanierung_project';

@Injectable({
  providedIn: 'root',
})
export class DbSanierungService {
  private supabaseService = inject(SupabaseService);

  async getSanierungProjects() {
    const projects = await this.supabaseService.supabase
      .from(USER_PROJECTS_TABLE)
      .select('projects:project_id(*)');
    return projects.data || [];
  }

  async getSanierungProjectByProjectId(projectId: number) {
    const { data, error } = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('id', projectId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getSanierungProjectByProjectTitle(projectName: string) {
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

  async createSanierungProject(projectData: SanierungProjekt) {
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

  async deleteSanierungProjectByProjectId(projectId: number) {
    const response = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .delete()
      .eq('id', projectId);

    return response;
  }

  async updateSanierungProject(projectData: SanierungProjekt) {
    try {
      const { data, error } = await this.supabaseService.supabase.rpc(
        UPDATE_PROJECT_FUNCTION,
        {
          project_data: projectData,
        }
      );

      if (error) throw error;
      console.log(data);

      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async updateSanierungTitle(projectTitle: string, projectId: number) {
    const { error } = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .update({ title: projectTitle })
      .eq('id', projectId);
  }
}
