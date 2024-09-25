import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment.development';
import SpotifyWebApi from 'spotify-web-api-js';
import { IUsuario } from '../Interfaces/IUsuario';


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
       return true;
      

     }catch(ex){
      return false
     }
   }

   async obterSpotifyUsuario(): Promise<IUsuario | null> {
    try {
      const userInfo = await this.spotifyApi.getMe(); // Obtém o perfil do usuário do Spotify
  
      // Mapeia os dados recebidos para o formato esperado por IUsuario
      const usuario: IUsuario = {
        id: userInfo.id || 'id padrão', // Atribui o id do usuário
        nome: userInfo.display_name || 'Usuário sem nome', // Nome do usuário
        imagemUrl: userInfo.images && userInfo.images.length > 0 ? userInfo.images[0].url : 'URL da imagem padrão', // URL da imagem
      };
  
      console.log('Usuário mapeado:', usuario);
      return usuario; // Retorna o objeto do tipo IUsuario
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
      return null; // Retorna null em caso de erro
    }
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

