import { Component, OnInit } from '@angular/core';
import { SpotifyService} from '../../services/Spotify.service';
import { PlayerService } from '../../services/Player.service';

@Component({
  selector: 'app-pesquisar-painel-topo',
  templateUrl: './pesquisar-painel-topo.component.html',
  styleUrls: ['./pesquisar-painel-topo.component.scss'],
  standalone: false
})
export class PesquisarPainelTopoComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,

  ) { }

  ngOnInit() {
  }

}
