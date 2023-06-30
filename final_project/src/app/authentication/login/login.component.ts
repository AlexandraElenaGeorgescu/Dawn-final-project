import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
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

  ngOnInit(): void {
    this.checkToken();
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
      x => {
        console.log(x);
        const token = x.token;
        if (rememberMe) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('rememberMe', 'true');
        } else {
          sessionStorage.setItem('authToken', token);
          localStorage.setItem('rememberMe', 'false');
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

  checkToken(): void {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const token = rememberMe ? localStorage.getItem('authToken') : sessionStorage.getItem('authToken');
    if (rememberMe) {
      this.router.navigate(['/PAGE']);
    }
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
