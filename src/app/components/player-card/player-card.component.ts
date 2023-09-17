import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusicas } from 'src/app/Common/factories';
import { IMusicas } from 'src/app/pages/Interfaces/IMusicas';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusicas = newMusicas();
  subs: Subscription[] = []

  //Icones
  playIcon = faPlay;
  anteriorIcon = faStepBackward;
  proximoIcon = faStepForward;


  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica;
    })
    this.subs.push(sub)
  }

  voltarMusica() {
    this.playerService.voltarMusica();
  }

  proximaMusica() {
    this.playerService.proximaMusica();
  }

  obterEstadoMusica() {
    this.playerService.obterEstadoMusica();
  }
}
