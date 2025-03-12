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
    this.obterMusicas();
  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusicas()
    console.log (this.musicas)
  }

}
