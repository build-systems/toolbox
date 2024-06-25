import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../shared/supabase.service';
import { AuthComponent } from '../../auth/auth.component';

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
  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    console.log(this.session);
  }
}
