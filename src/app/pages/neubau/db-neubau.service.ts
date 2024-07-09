import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../auth/supabase.service';
import { NeubauProjekt } from './neubauprojekt';

export const PROJECTS_TABLE = 'public.neubau_projects';
export const USER_PROJECTS_TABLE = 'public.user_neubau_projects';
export const CREATE_PROJECT_FUNCTION = 'public.insert_neubau_project';
export const UPDATE_PROJECT_FUNCTION = 'public.update_neubau_project';

@Injectable({
  providedIn: 'root',
})
export class DbNeubauService {
  private supabaseService = inject(SupabaseService);

  async getNeubauProjects() {
    const projects = await this.supabaseService.supabase
      .from(USER_PROJECTS_TABLE)
      .select('projects:project_id(*)');
    return projects.data || [];
  }

  async getNeubauProjectByProjectId(projectId: number) {
    const { data, error } = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('id', projectId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getNeubauProjectByProjectTitle(projectName: string) {
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

  async createNeubauProject(projectData: NeubauProjekt) {
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

  async deleteNeubauProjectByProjectId(projectId: number) {
    const response = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .delete()
      .eq('id', projectId);

    return response;
  }

  async updateNeubauProject(projectData: NeubauProjekt) {
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

  async updateNeubauTitle(projectTitle: string, projectId: number) {
    const { error } = await this.supabaseService.supabase
      .from(PROJECTS_TABLE)
      .update({ title: projectTitle })
      .eq('id', projectId);
  }
}
