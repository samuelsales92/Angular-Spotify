import { SpotifyService } from './../../services/Spotify.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-painel-pesquisa',
  templateUrl: './painel-pesquisa.component.html',
  styleUrls: ['./painel-pesquisa.component.scss']
})
export class PainelPesquisaComponent implements OnInit {
  results: any[];
  

  constructor( 
    private SpotifyService: SpotifyService
    
  ) { }

  ngOnInit() {
    this.SpotifyService.resultados$.subscribe(musicas => {
      this.results = musicas; // Atualiza a lista de músicas/artistas
    });

    console.log(this.results)
  }
  
}
