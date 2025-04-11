
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PlayerComponent } from './player.component';
import { RouterModule} from '@angular/router';
import { PlayerRotas } from './player.routes';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';


import { PainelDireitoComponent } from '../../components/painel-direito/painel-direito.component';
import { TopoPesquisarComponent } from '../../components/topo-pesquisar/topo-pesquisar.component';
import { LadoEsquerdoComponent } from '../../components/lado-esquerdo/lado-esquerdo.component';
import { MenuBotaoComponent } from '../../components/menu-botao/menu-botao.component';
import {RodapeUsuarioComponent} from '../../components/rodape-usuario/rodape-usuario.component';
import { HomeComponent } from '../home/home.component';
import { PainelCentralComponent } from '../../components/painel-central/painel-central.component';
import { PainelPesquisaComponent } from '../painel-pesquisa/painel-pesquisa.component';
import { PlayComponent } from '../../components/play/play.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { ListaMusicaComponent } from '../lista-musica/lista-musica.component';
import { MusicaPesquisadaComponent } from '../musica-pesquisada/musica-pesquisada.component';
import { BotaoPlayComponent } from '../../components/botao-play/botao-play.component';










@NgModule({
  declarations: [PlayerComponent,
    LadoEsquerdoComponent,
    MenuBotaoComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    PainelCentralComponent,
    PainelDireitoComponent,
    TopoPesquisarComponent,
    PainelPesquisaComponent,
    PlayComponent,
    ListaMusicaComponent,
    BannerComponent,
    MusicaPesquisadaComponent,
    BotaoPlayComponent
    
    
    ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatSidenavModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas),
  ]
})

export class PlayerModule { 
  
}