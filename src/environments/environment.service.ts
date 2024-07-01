import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  get supabaseUrl(): string {
    return (window as any).VITE_SUPABASE_URL || '';
  }

  get supabaseKey(): string {
    return (window as any).VITE_SUPABASE_KEY || '';
  }
}
