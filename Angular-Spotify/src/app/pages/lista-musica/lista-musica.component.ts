import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { newMusica } from '../../Common/factories';
import { ActivatedRoute } from '@angular/router';
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

  sub: Subscription[] = []

  constructor( 
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.obterMusicas()
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe())
  }


  obterMusicas(){
    this.activedRoute.paramMap
      .subscribe(async params => {

      })
  }
}
