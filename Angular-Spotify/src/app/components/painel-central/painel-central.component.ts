import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/Spotify.service';
import { IArtista } from '../../Interfaces/IArtista';
import { newArtista } from '../../Common/factories';


@Component({
  selector: 'app-painel-central',
  templateUrl: './painel-central.component.html',
  styleUrl: './painel-central.component.scss',
  
})
export class PainelCentralComponent implements OnInit {

  topArtista: IArtista = newArtista();

  constructor(private spotifyService: SpotifyService){}
  
  ngOnInit(): void{
    this.buscarArtista();
  }

  async buscarArtista(){
   const artista = await this.spotifyService.buscarTopArtistas(1);

   if (!!artista)
    this.topArtista = artista.pop();

   console.log(this.topArtista)
  }
}
