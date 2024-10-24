import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-botao',
  templateUrl: './menu-botao.component.html',
  styleUrl: './menu-botao.component.scss'
})
export class MenuBotaoComponent {

  @Input()
  descricao = '';
  
}
