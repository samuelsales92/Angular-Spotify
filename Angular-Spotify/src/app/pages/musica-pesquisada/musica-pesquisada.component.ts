import { Component } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';


import { Subject, Subscription, takeUntil } from 'rxjs';

import { PlayerService } from './../../services/Player.service';
import { SpotifyService } from './../../services/Spotify.service';
import { newMusica } from '../../Common/factories';
import { PesquisaService } from '../../services/Pesquisa.service';


@Component({
  selector: 'app-musica-pesquisada',
  standalone: false,
  templateUrl: './musica-pesquisada.component.html',
  styleUrl: './musica-pesquisada.component.scss',
})
export class MusicaPesquisadaComponent {


  bannerImagemUrl = ''
  bannerTexto: string = ''

  musica: IMusica[] = []
  resultados: IMusica[] = []
  musicaAtual: IMusica = newMusica();

  subs: Subscription[] = []

  private destroy$ = new Subject<void>();

  constructor(
    private pesquisaService: PesquisaService,
    private SpotifyService: SpotifyService,
    private PlayerService: PlayerService

  ) {

  }

  ngOnInit() {

    this.obterMusicaAtual();

    this.pesquisaService.result$
      .pipe(takeUntil(this.destroy$))
      .subscribe((dados) => {
        this.resultados = dados.slice(0, 20);
      });

    this.bannerImagemUrl = this.resultados[1].album.imageUrl;
    
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
    this.destroy$.next();
    this.destroy$.complete();
  }

  obterArtistas(resultado: IMusica) {
    return resultado.artistas.slice(0, 1).map(artista => this.bannerTexto = artista.nome) 
  }

  tocarPesquisa(resultado: IMusica) {
    this.SpotifyService.tocarMusica(resultado)
  }

  async executarMusica(musica: IMusica) {
    await this.SpotifyService.tocarMusica(musica);
    this.PlayerService.definirMusicaAtual(musica)
  }


  obterMusicaAtual() {
    const sub = this.PlayerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }


}
