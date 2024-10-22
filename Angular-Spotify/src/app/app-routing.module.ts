import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatchGuard } from './guards/guards/autenticador.guard'; // Importa o guard
import { LoginComponent } from './pages/login/login.component';
import { PlayerComponent } from './pages/player/player.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'player', // Redireciona para player
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
  }, 
  {
     path: 'not-found',
     component: LoginComponent, // Página de erro personalizada
  },
   { path: '**', redirectTo: '/not-found' }
];

// ERROR RuntimeError: NG04002: Cannot match any routes. URL Segment: 'player' so foi possivel criando uma rota coringa "erro" mas redirecionando para LoginComponent.

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })], // Configura o roteamento na aplicação
  exports: [RouterModule] // Exporta o RouterModule para ser usado em outros módulos
})
export class AppRoutingModule { }
