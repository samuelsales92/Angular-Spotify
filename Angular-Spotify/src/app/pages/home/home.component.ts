import { Component,  } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { SpotifyService } from '../../services/Spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  musicas: IMusica[] = []


  constructor(
    private spotifyService: SpotifyService
  ){ }

  ngOnInit(): void {
  }

  async obterMusicas(){
    const musicas = this.spotifyService.buscarMusicas()
  }

}
