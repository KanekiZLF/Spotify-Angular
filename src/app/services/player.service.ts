import { Injectable } from "@angular/core";
import { IMusicas } from "../pages/Interfaces/IMusicas";
import { newMusicas } from "../Common/factories";
import { BehaviorSubject } from "rxjs";
import { SpotifyService } from "./spotify.service";

@Injectable({
    providedIn: 'root'
})

export class PlayerService {

    musicaAtual = new BehaviorSubject<IMusicas>(newMusicas());
    timerId: any = null;

    constructor(private spotifyService: SpotifyService) {
        this.obterMusicaAtual();
    }

    async obterMusicaAtual() {
        clearTimeout(this.timerId);

        //Obtenho a musica
        const musica = await this.spotifyService.obterMusicaAtual();
        this.definirMusicaAtual(musica);

        // Faz o Loop
        this.timerId = setInterval(async () => {
            await this.obterMusicaAtual();
        }, 3000)
    }

    definirMusicaAtual(musicas: IMusicas) {
        this.musicaAtual.next(musicas);
    }
}