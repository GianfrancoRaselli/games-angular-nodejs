import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: User): Observable<any> {
    return this.http.post(environment.API_URL + "/auth/signup", user);
  }

  signIn(user: User): Observable<any> {
    return this.http.post(environment.API_URL + "/auth/signin", user);
  }

  loggedIn(): boolean {
    if (localStorage.getItem("token") === null || localStorage.getItem("token") === "") {
      return false;
    } else {
      return true;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(["/signin"]);
  }

}