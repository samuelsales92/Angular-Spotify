import { Component,  } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { SpotifyService } from '../../services/Spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  musicas: IMusica[] = []

  playIcone = faPlay;

  

  constructor(
    private spotifyService: SpotifyService
  ){ 

  }

  ngOnInit(): void {
    this.obterMusicas();
  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusicas()
    console.log (this.musicas)
  }

  obterArtistas(musicas: IMusica){
    return musicas.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: string){
    await this.spotifyService.tocarMusica(musica);
  }
}
