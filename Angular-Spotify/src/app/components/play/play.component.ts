import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(
  ) { 
   
  }

  ngOnInit() {
  }







  musicaAtual = {
    titulo: 'Nome da Música',
    artista: 'Nome do Artista',
    album: { imageUrl: 'https://via.placeholder.com/50' }
  };

  tocando: boolean = false;
  progresso: number = 0;

  togglePlayPause() {
    this.tocando = !this.tocando;
  }

  avancarMusica() {
    console.log('Próxima música');
  }

  voltarMusica() {
    console.log('Música anterior');
  }
}


