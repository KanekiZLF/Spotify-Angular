import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faSearch, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/pages/Interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  menuSelecionado = 'Home';

  playlists: IPlaylist[] = [];

  // Icones
  homeIcon = faHome;
  pesquisarIcon = faSearch;
  artistasIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(
    private router: Router,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarPlaylists();
  }

  botaoClick(botao: string) {
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/home');
  }

  irParaPlaylist(playlistId: string) {
    this.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }

  async buscarPlaylists() {
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
  }
}
