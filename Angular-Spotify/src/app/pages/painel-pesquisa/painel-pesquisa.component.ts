import { IMusica } from './../../Interfaces/IMusica';
import { PesquisaService } from '../../services/Pesquisa.service';

import { Component, OnInit, NgZone } from '@angular/core';


@Component({
  selector: 'app-painel-pesquisa',
  templateUrl: './painel-pesquisa.component.html',
  styleUrls: ['./painel-pesquisa.component.scss']
})
export class PainelPesquisaComponent implements OnInit {

  resultado: IMusica [] = [];
  query: string;
  types: string[]


  constructor(
    private pesquisaService: PesquisaService
  ) { 
    console.log(this.pesquisaService.result)
  }

  ngOnInit() {
    this.Atualizar();
    
  }

Atualizar(){
  console.log(this.pesquisaService.result)
}
}
