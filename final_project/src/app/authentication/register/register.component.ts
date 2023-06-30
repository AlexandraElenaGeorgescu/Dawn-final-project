import { Component} from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { capitalLetterValidator } from 'src/app/validators/validator';
import { User } from 'src/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required, capitalLetterValidator()],
      lastName: ['', Validators.required, capitalLetterValidator()]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    let user:User={
      email:this.registerForm.value.email,
      password:this.registerForm.value.password,
      lastName:this.registerForm.value.lastName,
      firstName:this.registerForm.value.firstName
      }
      console.log(user)
      this.authService.register(user).subscribe(
        () => {
          console.log('Registration successful');
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.log('Registration failed:', error);
          // Handle registration failure, such as displaying an error message
        }
      );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }
}
