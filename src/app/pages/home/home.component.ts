import { Component, OnInit } from '@angular/core';
import { IMusicas } from '../Interfaces/IMusicas';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  musicas: IMusicas[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.obterMusicas();

  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();
    console.log(this.musicas);
  }

}
