import { IMusica } from './../../Interfaces/IMusica';
import { SpotifyService } from './../../services/Spotify.service';
import { Subscription } from 'rxjs';
import { newMusica } from '../../Common/factories';
import { PlayerService } from './../../services/Player.service';
import { Component, OnDestroy, OnInit } from '@angular/core';



@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {


  musica: IMusica = newMusica()
  subs: Subscription[] = []

  constructor(
    private PlayerService: PlayerService,
    private SpotifyService: SpotifyService
  ) {

  }

  ngOnInit() {
    this.obterMusicaTocando();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaTocando() {
    const sub = this.PlayerService.musicaAtual.subscribe(musica => {
      if (musica && musica.titulo !== this.musica?.titulo) { 
        this.musica = musica;
        this.tocando = true; 
      }
    });
    this.subs.push(sub);
  }


  obterArtistas(musicas: IMusica){
    return musicas.artistas.map(artista => artista.nome).join(', ');
  }





  tocando: boolean = false;
  progresso: number = 0;

  musicaPlayPause() {

    this.tocando = !this.tocando;

    
    if (this.tocando) {
      this.SpotifyService.tocarMusica(this.musica);
    } 
    else {
      this.SpotifyService.pararMusica(this.musica);
    }
  }

  avancarMusica() {
    console.log('Próxima música');
  }

  voltarMusica() {
    console.log('Música anterior');
  }
}


