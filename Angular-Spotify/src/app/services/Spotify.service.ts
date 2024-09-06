import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment.development';
import SpotifyWebApi from 'spotify-web-api-js';


@Injectable({
  providedIn: 'root'
})

export class SpotifyService {
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
  }


  obterUrlLogin(){
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

  definirAccessToken(token:string){
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem('token', token);
  }

}

