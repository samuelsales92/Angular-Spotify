
import { Component, OnInit } from '@angular/core';

import { PesquisaService } from './../../services/Pesquisa.service';
import { Router } from '@angular/router';

import { IMusica } from '../../Interfaces/IMusica';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'topo-pesquisar',
  templateUrl: './topo-pesquisar.component.html',
  styleUrls: ['./topo-pesquisar.component.scss']
})
export class TopoPesquisarComponent implements OnInit {


  query: string = '';
  results: IMusica[] = [];
  pesquisaControl = new FormControl('');


  constructor(
    private pesquisaService: PesquisaService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    let searchInput = document.getElementById('search') as HTMLInputElement;
  }

  buscarPesquisa(event: Event) {
    let target = event.target as HTMLInputElement;
    let value = target.value.trim();

    if (value.length < 3) return;

    this.pesquisaService.obterPesquisaMusica(value, ['artist']).then((resultados: IMusica[]) => {
      this.pesquisaService.updateResults(resultados);
     // console.log(resultados)
      this.router.navigate(['/player/search'])

    }).catch(error => {
      console.error('Erro ao buscar no Spotify:', error);
    });


  }


  irParaHome() {
    this.router.navigate(['/player/home']);
  }

}
