import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  host: {
    class: 'ng-auth',
  },
})
export class AuthComponent implements OnInit {
  title = 'Login';
  loading = false;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    // private router: Router
  ) {
    // this.supabase.currentUser$.subscribe((user) => {
    //   if (user) {
    //     console.log('USER ON LOGIN PAGE: ', user);
    //     this.router.navigateByUrl('/portfolio', {replaceUrl: true});
    //   }
    // });
  }

  // Inititalize projekt form
  signInForm!: FormGroup;

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ]),
    });
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
}
