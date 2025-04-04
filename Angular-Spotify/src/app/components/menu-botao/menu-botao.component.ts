import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-botao',
  templateUrl: './menu-botao.component.html',
  styleUrl: './menu-botao.component.scss'
})
export class MenuBotaoComponent {


  @Input()
  descricao = '';

  @Input()
  imagens = '';
  
  @Input()
  selecionado = false;

  @Output()
  click = new EventEmitter<void>();
  

  onClick(){
    this.click.emit();
  }


}


