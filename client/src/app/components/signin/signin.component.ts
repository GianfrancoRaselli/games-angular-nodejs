import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "../../services/auth.service";

import { User } from "../../models/User";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: User = {
    id_user: 0,
    username: "",
    password: ""
  };

  error: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.user).subscribe(
      res => {
        this.error = false;
        this.errorMessage = "";
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", this.user.username || "");
        this.router.navigate(["/games"]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.error = true;
            this.errorMessage = "Username or password is wrong";
          }
        }
      }
    );
  }

}
