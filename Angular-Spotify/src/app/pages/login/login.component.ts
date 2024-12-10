import { Router } from '@angular/router';
import { SpotifyService } from './../../services/Spotify.service';
import { Component} from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private spotifyservice: SpotifyService,
    private router: Router,) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback(){
    const token = this.spotifyservice.obterTokenUrlCallback();
    if (!!token){
      this.spotifyservice.definirAccessToken(token);
      this.router.navigate(['/player/home'])

    }
  }
  
abrirPaginaLogin() {
  window.location.href = this.spotifyservice.obterUrlLogin();
  }
}