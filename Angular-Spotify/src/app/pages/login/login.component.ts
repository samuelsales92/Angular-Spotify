import { SpotifyService } from './../../services/Spotify.service';
import { Component} from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private spotifyservice: SpotifyService) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback(){
    const token = this.spotifyservice.obterTokenUrlCallback();
    if (!!token){
      this.spotifyservice.definirAccessToken(token);
    }
  }
  
abrirPaginaLogin() {
  window.location.href = (this.spotifyservice.obterUrlLogin());
  }
}