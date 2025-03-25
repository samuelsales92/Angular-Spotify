import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponentComponent } from './spinner-component.component';
import { SpinnerRotas } from './spinner.routes';





@NgModule({
  declarations: [
    SpinnerComponentComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SpinnerRotas),
    NgxSpinnerModule
    
  ]
})
export class SpinnerModule { }
