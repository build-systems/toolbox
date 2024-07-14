import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { SupabaseService } from '../../auth/supabase.service';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from '../../auth/auth.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../title/title.component';
import { fadeInAnimation } from '../../shared/animations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AuthComponent, AccountComponent, TitleComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  animations: [fadeInAnimation],
  host: {
    class: 'host-profile',
  },
})
export class ProfileComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
  protected readonly supabaseService = inject(SupabaseService);

  description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga doloremque cumque, nemo, non aliquid ipsum omnis atque assumenda cupiditate earum, modi nam deleniti laudantium. Possimus aperiam voluptas esse. Error, beatae eos! Pariatur atque consequatur doloremque iure eligendi vel molestiae quasi ipsa veritatis iste aliquam, obcaecati aspernatur! Accusantium distinctio suscipit voluptatibus.';
}
