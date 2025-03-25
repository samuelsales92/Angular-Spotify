import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginRotas } from './login.routes';
import { NgxSpinnerModule } from "ngx-spinner";





@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRotas),
    NgxSpinnerModule
    
  ]
})
export class LoginModule { }
