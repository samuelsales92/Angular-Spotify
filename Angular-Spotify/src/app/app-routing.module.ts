import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatchGuard } from './guards/guards/autenticador.guard'; // Importa o guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redireciona para login
    pathMatch: 'full' // Garante que o redirecionamento ocorre se a URL for vazia
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
    canMatch: [canMatchGuard] // Aplica o guard canMatch à rota 'player'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura o roteamento na aplicação
  exports: [RouterModule] // Exporta o RouterModule para ser usado em outros módulos
})
export class AppRoutingModule { }
