import { Injectable } from '@angular/core';
import { IMusica } from '../Interfaces/IMusica';
import { newMusica } from '../Common/factories';
import { BehaviorSubject} from 'rxjs';
import { SpotifyService } from './Spotify.service';
import {  SpotifyTrackParaMusica } from '../Common/spotifyHelper';
import SpotifyWebApi from 'spotify-web-api-js';


@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

spotifyApi: SpotifyWebApi.SpotifyWebApiJs;

private resultadosPesquisa = new BehaviorSubject<IMusica[]>([]); // Armazena os resultados
resultados$ = this.resultadosPesquisa.asObservable();

constructor( ) {
    this.spotifyApi = new SpotifyWebApi();
 }


  async obterPesquisaMusica(query: string, types: string[]): Promise<IMusica[]> {
    try {
      const resposta = await this.spotifyApi.search(query, ["track"]);// Busca no Spotify API

      if (!resposta.tracks || !resposta.tracks.items) return [];
      return resposta.tracks.items.map(track => SpotifyTrackParaMusica(track));
      // Verifica se há resultados
    } catch (error) {
      console.error('Erro ao buscar músicas no Spotify:', error);
      return [];
    }
  }


updateResults(novosResultados: IMusica[]) {
    this.resultadosPesquisa.next(novosResultados);
  }
}



