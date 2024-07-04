import { Component, OnInit, inject } from '@angular/core';
import { SupabaseService } from '../../auth/supabase.service';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from '../../auth/auth.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../title/title.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AuthComponent, AccountComponent, TitleComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  host: {
    class: 'host-profile',
  },
})
export class ProfileComponent implements OnInit {
  protected readonly supabase = inject(SupabaseService);
  // session = this.supabase.session;

  description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga doloremque cumque, nemo, non aliquid ipsum omnis atque assumenda cupiditate earum, modi nam deleniti laudantium. Possimus aperiam voluptas esse. Error, beatae eos! Pariatur atque consequatur doloremque iure eligendi vel molestiae quasi ipsa veritatis iste aliquam, obcaecati aspernatur! Accusantium distinctio suscipit voluptatibus.';

  ngOnInit() {
    // console.log(this.session);
  }
}
