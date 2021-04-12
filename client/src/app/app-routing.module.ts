import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from "./components/index/index.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SigninComponent } from "./components/signin/signin.component";
import { GameListComponent } from "./components/game-list/game-list.component";
import { GameFormComponent } from "./components/game-form/game-form.component";

import { AuthGuard, SignGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [SignGuard]
  },
  {
    path: "signin",
    component: SigninComponent,
    canActivate: [SignGuard]
  },
  {
    path: "games",
    component: GameListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "games/add",
    component: GameFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "games/edit/:id",
    component: GameFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
