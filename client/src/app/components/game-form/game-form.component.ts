import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { GamesService } from "../../services/games.service";
import { createNgModule } from '@angular/compiler/src/core';

import { Game } from "../../models/Game";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  game: Game = {
    id_game: 0,
    title: "",
    description: "",
    image: "",
    created_at: new Date()
  };

  edit: boolean = false;

  constructor(private gamesService: GamesService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.gamesService.getGame(params.id).subscribe(
        res => {
          this.game = res;
          this.edit = true;
        },
        err => console.log(err)
      );
    }
  }

  saveNewGame() {
    delete this.game.id_game;
    delete this.game.created_at;
    
    this.gamesService.saveGame(this.game).subscribe(
      res => {
        this.router.navigate(["/games"]);
      },
      err => console.log(err)
    );
  }

  updateGame() {
    delete this.game.created_at;

    this.gamesService.updateGame(this.game.id_game || "", this.game).subscribe(
      res => {
        this.router.navigate(["/games"]);
      },
      err => console.log(err)
    );
  }

}
