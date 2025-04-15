import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlayerService } from './../../services/Player.service';
import { SpotifyService } from './../../services/Spotify.service';

import { IMusica } from '../../Interfaces/IMusica';
import { newMusica } from '../../Common/factories';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica.component.scss']
})
export class ListaMusicaComponent implements OnInit, OnDestroy {


  bannerImagemUrl = ''
  bannerTexto = ''


  musicas: IMusica [] = []
  musicaAtual: IMusica = newMusica();

  subs: Subscription[] = []

  constructor( 
    private activedRoute: ActivatedRoute,
    private SpotifyService: SpotifyService,
    private PlayerService: PlayerService
  ) { }

  ngOnInit() {
    this.obterMusicas()
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  obterMusicas(){
   const sub =  this.activedRoute.paramMap
      .subscribe(async params => {
        const tipo  = params.get('tipo');
        const id  = params.get('id');
        await this.obterDadosPagina(tipo, id)
      });

      this.subs.push(sub);
  }

  obterMusicaAtual(){
    const sub = this.PlayerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string) {
    if(tipo === 'playlist')
      await this.obterDadosPlaylist(id);
  }


  async obterDadosPlaylist(playlistId: string){
      const playlisMusicas = await this.SpotifyService.buscasMusicaPlaylist(playlistId);
      this.definirDadosPagina(playlisMusicas.nome, playlisMusicas.imagemUrl, playlisMusicas.musicas)
    }



  definirDadosPagina(bannerTexto: string, bannerImage: string, musicas: IMusica[]){
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  async playMusica(){
    this.SpotifyService.tocarMusica(this.musicas[0]);
   
  }

  
  async executarMusica(musica: IMusica){
    await this.SpotifyService.tocarMusica(musica);
    this.PlayerService.definirMusicaAtual(musica)
  };

  
  obterArtistas(musicas: IMusica){
    return musicas.artistas.map(artista => artista.nome).join(', ');
  }
  
}
