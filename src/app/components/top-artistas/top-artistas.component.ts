import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/Common/factories';
import { IArtista } from 'src/app/pages/Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) { }

  topArtista: IArtista = newArtista();

  ngOnInit(): void {
    this.buscarArtista();
  }

  async buscarArtista() {
    const artistas = await this.spotifyService.buscarTopArtistas(1);

    if (!!artistas) {
      this.topArtista = artistas.pop();
    }
  }
}
