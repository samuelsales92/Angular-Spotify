import { Component } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lado-esquerdo',
  templateUrl: './lado-esquerdo.component.html',
  styleUrl: './lado-esquerdo.component.scss'
})
export class LadoEsquerdoComponent {

  menuSelecionado = 'Home';


// Icones
  homeIcone = faHome
  pesquisarIcone = faSearch
  artistaIcone = faGuitar;
  playList = faMusic;

  botaoClick(botao: string){
    this.menuSelecionado = botao;
  }
}
