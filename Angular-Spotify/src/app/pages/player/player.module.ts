import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule} from '@angular/router';
import { PlayerRotas } from './player.routes';
import { LadoEsquerdoComponent } from '../../components/lado-esquerdo/lado-esquerdo.component';
import { MenuBotaoComponent } from '../../components/menu-botao/menu-botao.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [PlayerComponent, LadoEsquerdoComponent, MenuBotaoComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRotas)
  ]
})

export class PlayerModule { 
  
}