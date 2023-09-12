import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/pages/Interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {

  sairIcon = faSignOutAlt;
  usuario: IUsuario = null;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      // Aguarde a inicialização do usuário
      await this.spotifyService.inicializarUsuario();

      // Após a inicialização, atribua o usuário retornado pelo serviço à propriedade usuario
      this.usuario = this.spotifyService.usuario;
    } catch (error) {
      console.error('Erro ao inicializar o usuário:', error);
    }
  }

  logout() {
    this.spotifyService.logout();
  }
} 
