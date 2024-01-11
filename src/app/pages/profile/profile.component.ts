import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { AccountComponent } from '../../account/account.component';
import { AuthComponent } from '../../auth/auth.component';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AuthComponent, AccountComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  host: {
    class: 'ng-profile',
  },
})
export class ProfileComponent implements OnInit {
  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }
}
