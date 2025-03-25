import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoRotas } from './pagamento.router';



@NgModule({
  declarations: [
    PagamentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PagamentoRotas)
    
  ]
})
export class PagamentoModule { }
