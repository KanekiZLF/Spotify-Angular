import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallBack();
  }

  verificarTokenUrlCallBack() {
    const token = this.spotifyService.obterTokenUrlCallback();
    if (!!token) {

      this.spotifyService.definirAcessoToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  abrirLogin() {
    window.location.href = this.spotifyService.obterUrlLogin();
  }
}
