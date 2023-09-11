import { Component, OnInit } from '@angular/core';
import { faHome, faSearch, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  menuSelecionado = 'Home';

  // Icones
  homeIcon = faHome;
  pesquisarIcon = faSearch;
  artistasIcon = faGuitar;
  playlistIcon = faMusic;

  constructor() { }

  ngOnInit(): void {

  }

  botaoClick(botao: string) {
    this.menuSelecionado = botao;
  }
}
