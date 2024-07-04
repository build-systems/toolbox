import { Injectable, signal } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

export const PROJECTS_TABLE = 'einzelmassnahmen_projects';
export const ITEMS_TABLE = 'einzelmassnahmen_items';
export const VALUES_TABLE = 'einzelmassnahmen_values';
export const USER_PROJECTS_TABLE = 'user_projects';
export const PROFILE_TABLE = 'profile';
export const CREATE_PROJECT_FUNCTION = 'create_project_with_items_and_values';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  sessionSignal = signal<Session | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  async getProjects() {
    const projects = await this.supabase
      .from(USER_PROJECTS_TABLE)
      .select('projects:project_id(*)');
    return projects.data || [];
  }

  async getProjectByProjectId(projectId: number) {
    const { data, error } = await this.supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('id', projectId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getItemsByProjectId(projectId: number) {
    const { data, error } = await this.supabase
      .from(ITEMS_TABLE)
      .select('*')
      .eq('project_id', projectId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getValuesByItemId(itemId: number) {
    const { data, error } = await this.supabase
      .from(VALUES_TABLE)
      .select('*')
      .eq('item_id', itemId);
    if (error) {
      throw error;
    }
    return data;
  }

  async createProject(projectData: einzelmassnahmenOutputProject) {
    try {
      const { data, error } = await this.supabase.rpc(CREATE_PROJECT_FUNCTION, {
        project_data: { title: projectData.title },
        items_data: projectData.items,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }
}
