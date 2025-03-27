import { PainelPesquisaComponent } from './../painel-pesquisa/painel-pesquisa.component';
import { Routes } from '@angular/router'
import { PlayerComponent } from './player.component';
import { HomeComponent } from '../home/home.component';


export const PlayerRotas: Routes = [
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },

            {
                path: 'search',
                component: PainelPesquisaComponent,
            }
        ]
    }
]