import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile, SupabaseService } from '../../../auth/supabase.service';
import { AuthSession } from '@supabase/supabase-js';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AvatarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  host: {
    class: 'host-account',
  },
})
export class AccountComponent implements OnInit {
  protected readonly supabaseService = inject(SupabaseService);
  private formBuilder = inject(FormBuilder);
  loading = false;
  profile!: Profile;

  // @Input()
  // session!: AuthSession;

  updateProfileForm = this.formBuilder.group({
    username: '',
    website: '',
    avatar_url: '',
  });

  async ngOnInit(): Promise<void> {
    await this.getProfile();

    const { username, website, avatar_url } = this.profile;
    this.updateProfileForm.patchValue({
      username,
      website,
      avatar_url,
    });

    // console.log(this.session);
  }

  async getProfile() {
    try {
      this.loading = true;
      const { user } = this.supabaseService.sessionSignal()!;
      const {
        data: profile,
        error,
        status,
      } = await this.supabaseService.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      const { user } = this.supabaseService.sessionSignal()!;

      const username = this.updateProfileForm.value.username as string;
      const website = this.updateProfileForm.value.website as string;
      const avatar_url = this.updateProfileForm.value.avatar_url as string;

      const { error } = await this.supabaseService.updateProfile({
        id: user.id,
        username,
        website,
        avatar_url,
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    await this.supabaseService.signOut();
  }

  // Avatar function and getter
  get avatarUrl() {
    return this.updateProfileForm.value.avatar_url as string;
  }

  async updateAvatar(event: string): Promise<void> {
    this.updateProfileForm.patchValue({
      avatar_url: event,
    });
    await this.updateProfile();
  }
}
