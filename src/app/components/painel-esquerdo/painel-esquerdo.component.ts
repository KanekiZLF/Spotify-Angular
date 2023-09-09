import { Component, OnInit } from '@angular/core';
import { faHome, faSearch, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  // Icones
  homeIcon = faHome;
  pesquisarIcon = faSearch;
  artistasIcon = faGuitar;
  playlist = faMusic;

  constructor() { }

  ngOnInit(): void {

  }
}
