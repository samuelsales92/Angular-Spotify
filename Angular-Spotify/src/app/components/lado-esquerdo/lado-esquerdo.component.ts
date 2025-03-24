import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from '../../Interfaces/IPlaylist';
import { SpotifyService } from '../../services/Spotify.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-lado-esquerdo',
  templateUrl: './lado-esquerdo.component.html',
  styleUrl: './lado-esquerdo.component.scss'
})
export class LadoEsquerdoComponent implements OnInit {

  menuSelecionado = 'Home';

  playlists: IPlaylist[] = [];
  imagem: string[] = []

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
    
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/home');
  }

  async buscarPlaylist(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
  }
  
}
