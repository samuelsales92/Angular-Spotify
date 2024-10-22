import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule} from '@angular/router';
import { PlayerRotas } from './player.routes';
import { LadoEsquerdoComponent } from '../../components/lado-esquerdo/lado-esquerdo.component';


@NgModule({
  declarations: [PlayerComponent, LadoEsquerdoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas)
  ]
})

export class PlayerModule { 
  
}