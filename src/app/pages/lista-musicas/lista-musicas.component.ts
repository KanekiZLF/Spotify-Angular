import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusicas } from '../Interfaces/IMusicas';
import { newMusicas } from 'src/app/Common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {

  bannerImagemUrl = '';
  bannerTexto = '';

  musicas: IMusicas[] = [];
  musicaAtual: IMusicas = newMusicas();
  playIcon = faPlay;
  titulo = '';

  subs: Subscription[] = [];

  constructor(private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    })
    this.subs.push(sub);
  }

  obterMusicas() {
    const sub = this.activedRoute.paramMap.subscribe(async params => {
      const tipo = params.get('tipo');
      const id = params.get('id');
      await this.obterDadosPagina(tipo, id);
    })

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string) {
    if (tipo == 'playlist') {
      await this.obterDadosPlaylist(id);
    } else if (tipo == 'artistas') {
      await this.obterDadosArtistas(id);
    }
  }

  async obterDadosPlaylist(playlistId: string) {
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
    this.titulo = 'Musicas Playlist: ' + playlistMusicas.nome;
  }

  async obterDadosArtistas(artistaId: string) {

  }

  definirDadosPagina(bannerTexto: string, bannerImagem: string, musicas: IMusicas[]) {
    this.bannerImagemUrl = bannerImagem;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  obterArtistas(musicas: IMusicas) {
    return musicas.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musicas: IMusicas) {
    await this.spotifyService.executarMusica(musicas.id);
    this.playerService.definirMusicaAtual(musicas);
  }
}
