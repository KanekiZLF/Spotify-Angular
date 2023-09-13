import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../pages/Interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTrackParaMusicas, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { IPlaylist } from '../pages/Interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../pages/Interfaces/IArtista';
import { IMusicas } from '../pages/Interfaces/IMusicas';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
    this.usuario = null; // Inicialize this.usuario com null ou outro valor padrão, se necessário
  }

  async inicializarUsuario() {
    if (!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if (!token)
      return false;

    try {
      this.definirAcessoToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;
    }
    catch (ex) {
      console.error('Não foi possível definir o Token de acesso !');
      return false;
    }
  }


  async obterSpotifyUsuario() {
    try {
      const userInfo = await this.spotifyApi.getMe();
      if (userInfo && userInfo.id) {
        this.usuario = SpotifyUserParaUsuario(userInfo);
      } else {
        console.error('Não foi possível obter informações do usuário do Spotify.');
        this.usuario = null; // Defina this.usuario como nulo ou outra ação apropriada.
      }
    } catch (error) {
      console.error('Erro ao obter informações do usuário do Spotify:', error);
      this.usuario = null; // Defina this.usuario como nulo ou outra ação apropriada em caso de erro.
    }
  }


  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAcessoToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const userInfo = await this.spotifyApi.getMe();
    const playlist = await this.spotifyApi.getUserPlaylists(userInfo.id, { offset, limit });
    return playlist.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit })
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusicas[]> {
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map(x => SpotifyTrackParaMusicas(x.track));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
