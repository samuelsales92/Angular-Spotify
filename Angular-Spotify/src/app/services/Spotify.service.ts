import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment.development';
import SpotifyWebApi from 'spotify-web-api-js';
// import { IUsuario } from '../Interfaces/IUsuario';


@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
 // usuario: IUsuario;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
  }

  // async inicializarUsuario() {
  //   if(!!this.usuario)
  //     return true;

  //   const token = localStorage.getItem('token');

  //   if(!!token)
  //     return false; 

  //   try {

  //     await this.definirAccessToken(token);
      

  //   }catch(ex){}
  // }

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
    this.spotifyApi.skipToNext();
  }

}

