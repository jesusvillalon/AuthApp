import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Register, User } from '../../interfaces';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  public myForm: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.pattern]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  register(){

    const user: Register = this.myForm.value;

    this.authService.register(user)
      .subscribe({
        next: () => this.router.navigateByUrl('/auth/login'),
        error: (message) => {
          Swal.fire('Error', message, 'error')
        }
      })

  }

}
