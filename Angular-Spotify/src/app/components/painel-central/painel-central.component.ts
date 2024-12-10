import { Component } from '@angular/core';
import { SpotifyService } from '../../services/Spotify.service';
import { IArtista } from '../../Interfaces/IArtista';
import { newArtista } from '../../Common/factories';


@Component({
  selector: 'app-painel-central',
  templateUrl: './painel-central.component.html',
  styleUrl: './painel-central.component.scss',
  
})
export class PainelCentralComponent  {

  topArtista: IArtista = newArtista();

  constructor(private spotifyService: SpotifyService){}
  
  ngOnInit(): void{
   
  }

  async buscarArtista(){
   const artistas = await this.spotifyService.buscarTopArtitas(1);

   if (!!artistas)
    this.topArtista = artistas.pop();
  }
}
