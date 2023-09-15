import { Component, OnInit } from '@angular/core';
import { IArtista } from 'src/app/pages/Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas-direito',
  templateUrl: './top-artistas-direito.component.html',
  styleUrls: ['./top-artistas-direito.component.scss']
})
export class TopArtistasDireitoComponent implements OnInit {
  artistas: IArtista[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas() {
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
  }
}
