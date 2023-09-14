import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMusicas } from '../Interfaces/IMusicas';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';
import { newMusicas } from 'src/app/Common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musicas: IMusicas[] = [];
  musicaAtual: IMusicas = newMusicas();

  subs: Subscription[] = [];

  //Icones Player

  playIcon = faPlay;

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  obterArtistas(musicas: IMusicas) {
    return musicas.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musicas: IMusicas) {
    await this.spotifyService.executarMusica(musicas.id);
    this.playerService.definirMusicaAtual(musicas);
  }

}
