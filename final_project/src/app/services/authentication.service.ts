import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7214/Users';
 
  constructor (private http: HttpClient, private router: Router) { }

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  serviceCall() {
    console.log("Service was called");
  }


  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, JSON.stringify(user), this.httpOptions)
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, JSON.stringify(user), this.httpOptions);
  }

  logout(): void {
    // remove user token from storage to log user out
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    localStorage.setItem('rememberMe', 'false');
    this.router.navigateByUrl('/login');
  }

}
