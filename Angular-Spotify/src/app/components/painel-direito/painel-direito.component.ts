import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { newMusica } from '../../Common/factories';
import { PlayerService } from '../../services/Player.service';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/Spotify.service';

@Component({
  selector: 'app-painel-direito',
  templateUrl: './painel-direito.component.html',
  styleUrls: ['./painel-direito.component.scss']
})
export class PainelDireitoComponent implements OnInit, AfterViewInit, OnDestroy {

  musicaAtual: IMusica = newMusica();
  tocando: boolean = false;
  subs: Subscription[] = [];

  videoSelecionado: string = '';

  listaVideos: string[] = [
    'assets/videos/music-homem.mp4',
    'assets/videos/music-mulher.mp4',
    'assets/videos/music-mulher2.mp4'
  ];

  constructor(
    private playerService: PlayerService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.obterMusicaAtual();
    this.sortearVideoAleatorio()
  }

  @ViewChild('videoPlayer', { static: false }) videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.videoRef.nativeElement.play();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe()); 
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });
    this.subs.push(sub);
  }
  

  obterArtistas(musica: IMusica) {
    return musica.artistas.map(artista => artista.nome).join(', ');
  }


  sortearVideoAleatorio() {
    const index = Math.floor(Math.random() * this.listaVideos.length);
    this.videoSelecionado = this.listaVideos[index];

    const subTrocaVideo = this.spotifyService.trocarVideo.subscribe(() => {
      this.sortearVideoAleatorio();
    });
  
    this.subs.push(subTrocaVideo);
  }
  
}
