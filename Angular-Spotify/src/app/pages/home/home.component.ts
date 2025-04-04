import { Component, OnDestroy,  } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { SpotifyService } from '../../services/Spotify.service';
import { PlayerService } from '../../services/Player.service';
import { newMusica } from '../../Common/factories';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy{

  musicas: IMusica[] = []
  musicaAtual: IMusica = newMusica();


  subs: Subscription[] = [];

  bannerImagemUrl = 'https://misc.scdn.co/liked-songs/liked-songs-300.jpg'
  bannerTexto = 'Músicas Curtidas'


  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
    
  ){ 
  }
 
  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
    
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  obterMusicaAtual(){
   const sub =  this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusicas()

  }

  obterArtistas(musicas: IMusica){
    return musicas.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: IMusica){
    await this.spotifyService.tocarMusica(musica);
    this.playerService.definirMusicaAtual(musica)
  };


  async playMusica(){
    this.spotifyService.tocarMusica(this.musicas[0]);
   
  }

}
