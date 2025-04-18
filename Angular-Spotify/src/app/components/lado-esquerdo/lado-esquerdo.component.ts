import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { SpotifyService } from '../../services/Spotify.service';

import { IPlaylist } from '../../Interfaces/IPlaylist';

import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-lado-esquerdo',
  templateUrl: './lado-esquerdo.component.html',
  styleUrl: './lado-esquerdo.component.scss'
})
export class LadoEsquerdoComponent implements OnInit {

  menuSelecionado = 'Home';
  expandirMenu = false; 

  playlists: IPlaylist[] = [];
  imagem: string[] = []
  playlistsOriginais: IPlaylist[] = [];

  playlista = [
    { id: 'Home', nome: 'Músicas Curtidas', imagemUrl: 'https://misc.scdn.co/liked-songs/liked-songs-300.jpg' },
  ];

// Icones
  homeIcone = faHome
  pesquisarIcone = faSearch
  artistaIcone = faGuitar;
  playList = faMusic;

  constructor( 
    private router: Router,
    private spotifyService: SpotifyService) {}
  
  ngOnInit(): void {
    
    this.buscarPlaylist();
    this.expandirBiblioteca()
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/home');
  }

  async buscarPlaylist(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
    
  }

  expandirBiblioteca() {
    this.expandirMenu = !this.expandirMenu;

  }

  irParaPlaylist(playlistId: string){
    this.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }
  }
  

