import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Game } from "../models/Game";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get(environment.API_URL + "/games");
  }

  getGame(id: string) {
    return this.http.get(environment.API_URL + "/games/" + id);
  }

  saveGame(game: Game) {
    return this.http.post(environment.API_URL + "/games/", game);
  }

  updateGame(id: string|number, game: Game): Observable<Game> {
    return this.http.put(environment.API_URL + "/games/" + id, game);
  }

  deleteGame(id: string) {
    return this.http.delete(environment.API_URL + "/games/" + id);
  }

}