import { Injectable } from '@angular/core';
import { IMusica } from '../Interfaces/IMusica';
import { newMusica } from '../Common/factories';
import { BehaviorSubject} from 'rxjs';
import { SpotifyService } from './Spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

musicaAtual = new BehaviorSubject<IMusica>(newMusica());

constructor(private spotifyService: SpotifyService) {
  this.obterMusicaAtual();
 }



async obterMusicaAtual(){
  const musica = await this.spotifyService.obterMusicaAtual();
  this.musicaAtual.next(musica);
  }

definirMusicaAtual(){
  
}

}
