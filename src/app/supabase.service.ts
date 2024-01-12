import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment.development';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  // private currentUser = new BehaviorSubject<User | boolean | null>(
  //   null
  // );
  //   currentUser$ = this.currentUser.asObservable();


  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    // this.supabase.auth.onAuthStateChange((event, session) => {
    //   if (event === "TOKEN_REFRESHED") {
    //     console.log('SET USER: ', session);
    //     this.currentUser.next(session!.user);
    //   } else {
    //     this.currentUser.next(false);
    //   }
    // });

    // this.loadUser();

  }

  // async loadUser() {
  //   if(this.currentUser.value){
  //     return;
  //   }

  //   const user = await this.supabase.auth.getUser();

  //   if (user.data.user) {
  //     this.currentUser.next(user.data.user);
  //   } else {
  //     this.currentUser.next(false);
  //   }
  // }

  // getCurrentUserId(): string | null {
  //   if (this.currentUser.value) {
  //     return (this.currentUser.value as User).id;
  //   } else {
  //     return null;
  //   }
  // }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
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

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
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
}
