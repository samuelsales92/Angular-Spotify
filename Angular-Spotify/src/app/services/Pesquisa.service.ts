import { LoginComponent } from './../pages/login/login.component';
import { Injectable } from '@angular/core';
import { IMusica } from '../Interfaces/IMusica';
import { newMusica } from '../Common/factories';
import { BehaviorSubject, Observable} from 'rxjs';
import { SpotifyService } from './Spotify.service';
import {  SpotifyTrackParaMusica } from '../Common/spotifyHelper';
import SpotifyWebApi from 'spotify-web-api-js';


@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

result: IMusica[] = []

spotifyApi: SpotifyWebApi.SpotifyWebApiJs;

private resultadosPesquisa = new BehaviorSubject<IMusica[]>([]); 
public result$: Observable<IMusica[]> = this.resultadosPesquisa.asObservable();

constructor( ) {
    this.spotifyApi = new SpotifyWebApi();
 }


  async obterPesquisaMusica(query: string, types: string[]): Promise<IMusica[]> {
    try {
      const resposta = await this.spotifyApi.search(query, ["track"]);

      if (!resposta.tracks || !resposta.tracks.items) return [];
      return resposta.tracks.items.map(track => SpotifyTrackParaMusica(track));
    } catch (error) {
      console.error('Erro ao buscar músicas no Spotify:', error);
      return [];
    }
  }


updateResults(novosResultados: IMusica[]) {
   this.resultadosPesquisa.next(novosResultados)
   this.result = novosResultados;
  }


  async buscaMusicasDoArtista(artistaId: string, pais: string = 'BR') {
    const topTracks = await this.spotifyApi.getArtistTopTracks(artistaId, pais);
    return topTracks.tracks.map(track => SpotifyTrackParaMusica(track));
  }
  
}



