
import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../../services/Spotify.service';
import { PlayerService } from '../../services/Player.service';
import { promises } from 'dns';
import { set } from 'date-fns';

@Component({
  selector: 'topo-pesquisar',
  templateUrl: './topo-pesquisar.component.html',
  styleUrls: ['./topo-pesquisar.component.scss']
})
export class TopoPesquisarComponent implements OnInit {


  query: string = '';
  results: any[] = [];
  timeout: any;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,

  ) {  

  }

  ngOnInit() {
  }

  buscarPesquisa(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim()

    if (value.length < 4 ) return; // Evita buscas desnecessárias

    clearTimeout(this.timeout);

    // Define um novo timeout para aguardar 500ms antes de buscar
    this.timeout = setTimeout(() => {
      this.spotifyService.search(value, ['artist', 'track']).then(
        (data) => {
          console.log('Resultados:', data);
          this.results = [...(data.tracks?.items || []), ...(data.artists?.items || [])];
        },
        (error) => {
          console.error('Erro ao buscar no Spotify', error);
        }
      );
    }, 500); // Aguarda 500ms antes de executar a busca
  }
  
}
