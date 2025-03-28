import { PesquisaService } from '../../services/Pesquisa.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-painel-pesquisa',
  templateUrl: './painel-pesquisa.component.html',
  styleUrls: ['./painel-pesquisa.component.scss']
})
export class PainelPesquisaComponent implements OnInit {

  results: any[];


  constructor(
    private pesquisaService: PesquisaService

  ) { }

  ngOnInit() {
    
  }
  
}
