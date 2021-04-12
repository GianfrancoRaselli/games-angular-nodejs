import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

import { User } from "../../models/User";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User = {
    id_user: 0,
    username: "",
    password: "",
    fullname: ""
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authService.signUp(this.user).subscribe(
      res => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", this.user.username || "");
        this.router.navigate(["/games"]);
      },
      err => console.log(err)
    );
  }

}
