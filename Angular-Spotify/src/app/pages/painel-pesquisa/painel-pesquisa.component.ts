import { SpotifyService } from './../../services/Spotify.service';
import { PesquisaService } from './../../services/Pesquisa.service';
import { IMusica } from './../../Interfaces/IMusica';


import { Component, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';




@Component({
  selector: 'app-painel-pesquisa',
  templateUrl: './painel-pesquisa.component.html',
  styleUrls: ['./painel-pesquisa.component.scss']
})
export class PainelPesquisaComponent implements OnInit {

  botao = ["Artistas", "Playlists", "Músicas", "Álbuns", "Perfis", "Gêneros e momentos", "Podcasts e programas"] 
  

  resultados: IMusica[] = []

  artista: string 

  private destroy$ = new Subject<void>();

  constructor(
    private pesquisaService: PesquisaService,
    private SpotifyService:SpotifyService,
    private router: Router,
  ) { 
    console.log (this.artistaSelecionadoId)
  }

  ngOnInit() {
    
    this.pesquisaService.result$
    .pipe(takeUntil(this.destroy$))
    .subscribe((dados) => {
      this.resultados = dados.slice(0, 16);
    });

  }

  ngOnDestroy() {
    this.destroy$.next(); 
    this.destroy$.complete();
  }


  obterArtistas(resultado: IMusica){
    return resultado.artistas.slice(0, 1).map(artista => artista.nome)
    
  }

tocarPesquisa(resultado: IMusica){
  this.SpotifyService.tocarMusica(resultado)
}

/*artistaSelecionado(musica: IMusica){
  this.router.navigate(['/player/musica'])
}*/

async artistaSelecionadoId(playlist: IMusica) {
  try {
    const artistaId = playlist.artistas[0]?.id;

    if (!artistaId) {
      console.error('Nenhum artista encontrado na playlist.');
      return;
    }

    this.artista = artistaId;

    const resultados: IMusica[] = await this.pesquisaService.buscaMusicasDoArtista(artistaId);
    this.pesquisaService.updateResults(resultados);

    console.log(resultados);
    this.router.navigate(['/player/musica']);
  } catch (error) {
    console.error('Erro ao buscar no Spotify:', error);
  }
}

}
