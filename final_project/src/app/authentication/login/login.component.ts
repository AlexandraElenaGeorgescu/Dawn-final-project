import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const rememberMe = this.loginForm.value.rememberMe;
  
    let user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      lastName: "name",
      firstName: "name"
    };
  
    this.authService.login(user).subscribe(
      x=>{
        console.log(x);
        const token = x.token;
         if (rememberMe) {
          localStorage.setItem('authToken', token);
         } else {
           sessionStorage.setItem('authToken', token);
         }
         this.router.navigate(['/PAGE']);
        },
       error => {
         if (error.status === 401) {
         console.log('Invalid email or password.');
         } else {
         console.log('An error occurred. Please try again later.');
        }
      }
    );
  }
  

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
