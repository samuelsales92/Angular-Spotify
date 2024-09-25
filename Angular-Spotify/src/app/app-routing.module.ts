import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatchGuard } from './guards/guards/autenticador.guard';



export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
    canMatch: [canMatchGuard]
  },
  {
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

