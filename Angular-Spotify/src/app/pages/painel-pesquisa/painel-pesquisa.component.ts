import { PesquisaService } from './../../services/Pesquisa.service';
import { IMusica } from './../../Interfaces/IMusica';


import { Component, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-painel-pesquisa',
  templateUrl: './painel-pesquisa.component.html',
  styleUrls: ['./painel-pesquisa.component.scss']
})
export class PainelPesquisaComponent implements OnInit {

  botao = ["artisas", "Playlists", "Músicas", "Álbuns", "Perfis", "Gêneros e momentos", "Podcasts e programas"] 
  

  resultados: IMusica[] = []

  private destroy$ = new Subject<void>();

  constructor(
    private pesquisaService: PesquisaService
  ) { 
 
  }

  ngOnInit() {
    
    this.pesquisaService.result$
    .pipe(takeUntil(this.destroy$))
    .subscribe((dados) => {
      this.resultados = dados;
      console.log(this.resultados)
    });
  }

  ngOnDestroy() {
    this.destroy$.next(); 
    this.destroy$.complete();
  }


  obterArtistas(resultado: IMusica){
    return resultado.artistas.slice(0, 1).map(artista => artista.nome)
  }


 
}
