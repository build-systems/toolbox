import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../shared/supabase.service';
import { AccountComponent } from '../../account/account.component';
import { AuthComponent } from '../../auth/auth.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AuthComponent, AccountComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  host: {
    class: 'host-profile',
  },
})
export class ProfileComponent implements OnInit {
  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService) {
  }

  ngOnInit() {
    console.log(this.session);
  }
}
