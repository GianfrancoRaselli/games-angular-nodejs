import { Component, OnInit } from '@angular/core';

import { GamesService } from "../../services/games.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games: any = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.log(err)
    )
  }

  deleteGame(id: string) {    
    this.gamesService.deleteGame(id).subscribe(
      res => {
        console.log(res);
        this.getGames();
      },
      err => console.log(err)
    );
  }

}
