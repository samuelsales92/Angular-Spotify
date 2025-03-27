import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../../services/Spotify.service';
import { PlayerService } from '../../services/Player.service';
import { Router } from '@angular/router';

import { IMusica } from '../../Interfaces/IMusica';

import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'topo-pesquisar',
  templateUrl: './topo-pesquisar.component.html',
  styleUrls: ['./topo-pesquisar.component.scss']
})
export class TopoPesquisarComponent implements OnInit {


  query: string = '';
  results: IMusica[] = [];
  
  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
    private router: Router,
  ) {  

  }

  ngOnInit() {
    const searchInput = document.getElementById('search') as HTMLInputElement;

  fromEvent(searchInput, 'input')
    .pipe(debounceTime(500)) // Espera 500ms após a última tecla pressionada
    .subscribe((event: Event) => this.buscarPesquisa(event));
  }

  buscarPesquisa(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();
  
    if (value.length < 3) return;
  
      this.spotifyService.obterPesquisaMusica(value, ['artist']).then((resultados: IMusica[]) => {
      this.spotifyService.updateResults(resultados);
      this.router.navigate(['/player/search'])
      
    }).catch(error => {
      console.error('Erro ao buscar no Spotify:', error);
    });
  }
  

  irParaHome() {
    this.router.navigate(['/player/home']);
  }
  
}
