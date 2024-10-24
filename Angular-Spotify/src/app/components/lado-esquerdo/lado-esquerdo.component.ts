import { Component } from '@angular/core';
import { faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lado-esquerdo',
  templateUrl: './lado-esquerdo.component.html',
  styleUrl: './lado-esquerdo.component.scss'
})
export class LadoEsquerdoComponent {

  homeIcone = faHome
  pesquisarIcone = faSearch
  playList = faMusic
}
