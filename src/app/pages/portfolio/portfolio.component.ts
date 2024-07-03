import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../auth/supabase.service';
import { AuthComponent } from '../../auth/auth.component';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, AuthComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  host: {
    class: 'host-portfolio',
  },
})
export class PortfolioComponent {
  protected readonly supabase = inject(SupabaseService);
  // session = this.supabase.session;

  ngOnInit() {
    console.log(this.supabase.sessionSignal());
  }
}
