import { Component } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from '../../Interfaces/IUsuario';
import { SpotifyService } from '../../services/Spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrl: './rodape-usuario.component.scss'
})
export class RodapeUsuarioComponent {

  sairIcone = faSignOutAlt;
  usuario:IUsuario = null;

  constructor (private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario;
  }

  logout(){
    this.spotifyService.logout();
  }

}
