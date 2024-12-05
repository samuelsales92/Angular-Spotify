import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment.development';
import SpotifyWebApi from 'spotify-web-api-js';
import { IUsuario } from '../Interfaces/IUsuario';
import { SpotifyPlaylistParaPlaylist, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';



@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
  usuario: IUsuario | null = null;  // Inicializa como null

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
    
  }

   async inicializarUsuario() {
     if(!!this.usuario)
       return true;

     const token = localStorage.getItem('token');

     if(!token)
       return false; 

     try {

       this.definirAccessToken(token);
       await this.obterSpotifyUsuario();
       return !!this.usuario;
      

     }catch(ex){
      return false
     }
   }

   async obterSpotifyUsuario() {
    // try {
      const userInfo = await this.spotifyApi.getMe();
      this.usuario = SpotifyUserParaUsuario(userInfo);
    
    }
      
      
      
      // Obtém o perfil do usuário do Spotify
  
      // Mapeia os dados recebidos para o formato esperado por IUsuario
     
  
  
  

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


  
  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit});
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

}



