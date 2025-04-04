import { IMusica } from './../Interfaces/IMusica';
import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment.development';
import { IUsuario } from '../Interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../Interfaces/IArtista';

import SpotifyWebApi from 'spotify-web-api-js';

import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  private resultadosPesquisa = new BehaviorSubject<IMusica[]>([]); 
  resultados$ = this.resultadosPesquisa.asObservable();


  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
  usuario: IUsuario | null = null;  

  constructor(
    private router: Router,
  ) {
    this.spotifyApi = new SpotifyWebApi();
}

  async inicializarUsuario() {
    if (!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if (!token)
      return false;

    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;


    } catch (ex) {
      return false

    }
  }

  async obterSpotifyUsuario() {

    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);

  }

  obterUrlLogin() {
    const authEndipoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndipoint + clientId + redirectUrl + scopes + responseType;
  };

  obterTokenUrlCallback(): string {
    // Verifica se o código está sendo executado no lado do cliente
    if (typeof window === 'undefined' || !window.location.hash) {
      return '';
    }

    // Divide o hash por '&' para obter os parâmetros
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];

  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem('token', token);

  }



  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset , limit });
    return playlists.items.map(SpotifyPlaylistParaPlaylist);

  }

  async buscasMusicaPlaylist(playlistId: string, offset = 0, limit = 50){
    const playListSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playListSpotify)
      return null;

    const playlis = SpotifySinglePlaylistParaPlaylist(playListSpotify)

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit })

    playlis.musicas = musicasSpotify.items.map( musica => SpotifyTrackParaMusica(musica.track as SpotifyApi.TrackObjectFull))

    return playlis;
  }


  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
    const musica = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musica.items.map(x => SpotifyTrackParaMusica(x.track));
  }


  async tocarMusica(musica: IMusica){
    try {
      const dispositivos = await this.spotifyApi.getMyDevices();
      if (!dispositivos.devices.length) {
        console.warn(' Nenhum dispositivo ativo encontrado!');
        return;
      }

      const deviceId = dispositivos.devices[0].id;

      await this.spotifyApi.play({
        uris: [musica.uri],
        device_id: deviceId
      });

    } catch (error) {
      console.error(' Erro ao tentar tocar a música:', error);
    }
  }


  pararMusica(musica: IMusica){
    this.spotifyApi.pause({
      uris: [musica.uri]
    });
  }

  avancarMusica(){
    this.spotifyApi.skipToNext();
  }

  voltarMusica() {
    this.spotifyApi.skipToPrevious();
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackParaMusica(musicaSpotify.item);
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}







