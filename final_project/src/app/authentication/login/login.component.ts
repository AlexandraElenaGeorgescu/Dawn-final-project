import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
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

    const { email, password, rememberMe } = this.loginForm.value;
    // Apelăm serviciul de autentificare
    this.authService.login(email, password).subscribe(
      response => {
        // Procesăm răspunsul API-ului
        const token = response.token; // Presupunem că API-ul returnează un token în răspuns
        if (rememberMe) {
          localStorage.setItem('authToken', token); // Salvăm token-ul în localStorage
        } else {
          sessionStorage.setItem('authToken', token); // Salvăm token-ul în sessionStorage
        }
        // Redirecționează utilizatorul către pagina principală sau o altă pagină relevantă
      },
      error => {
        // Procesăm erorile
        if (error.status === 401) {
          // Autentificare eșuată, afișăm un mesaj de eroare către utilizator
          console.log('Invalid email or password.');
        } else {
          // Alte erori de rețea sau server
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
}
