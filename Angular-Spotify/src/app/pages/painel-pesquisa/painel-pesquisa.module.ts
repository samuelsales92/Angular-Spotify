import { PainelPesquisaComponent } from './painel-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PainelPesquisadoRotas } from './painel-pesquisa.router';






@NgModule({
  declarations: [
    PainelPesquisaComponent,
    

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PainelPesquisadoRotas),

  ]
})
export class PainelPesquisadoModule { }
