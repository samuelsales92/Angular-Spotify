import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }


  obterUrlLogin(){
    const authEndipoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndipoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback(){
    console.log(window.location.hash)
    if (!window.location.hash)
      return '';

    return '';
  }


}
