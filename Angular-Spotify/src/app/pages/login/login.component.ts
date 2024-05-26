import { SpotifyService } from './../../services/Spotify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private spotifyservice: SpotifyService) { }

  ngOInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback(){
    const token =  this.spotifyservice.obterTokenUrlCallback();
  }
  
abrirPaginaLogin() {
  window.location.href = (this.spotifyservice.obterUrlLogin());
}
}
