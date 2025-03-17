import { Component, inject, NgZone, OnDestroy,  } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { SpotifyService } from '../../services/Spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
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

  playIcone = faPlay;

  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ){ 
    inject(NgZone).runOutsideAngular(() => {
      setInterval(() => {}, 1000);
    })
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
      console.log('musica atualll ', this.musicaAtual);
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
  }
}
