import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  get supabaseUrl(): string {
    return (window as any).SUPABASE_URL || '';
  }

  get supabaseKey(): string {
    return (window as any).SUPABASE_KEY || '';
  }
}