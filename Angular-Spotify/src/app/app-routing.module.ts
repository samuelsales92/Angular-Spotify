import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatchGuard } from './guards/guards/autenticador.guard'; // Importa o guard
import { SpinnerComponentComponent } from './pages/spinner-component/spinner-component.component';






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
    path: 'pay',
    loadChildren: () => import('./pages/pagamento/pagamento.module').then(x => x.PagamentoModule),
    canMatch: [canMatchGuard]
  },

  {
    path: 'spotify',
    loadChildren: () => import('./pages/spinner-component/spinner.module').then(x => x.SpinnerModule),
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
  }, 

  {
     path: 'not-found',
     component: SpinnerComponentComponent,
  },
   { path: '**', redirectTo: '/not-found' },

   
   
];

// ERROR RuntimeError: NG04002: Cannot match any routes. URL Segment: 'player' so foi possivel criando uma rota coringa "erro" mas redirecionando para LoginComponent.

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })], // Configura o roteamento na aplicação
  exports: [RouterModule] // Exporta o RouterModule para ser usado em outros módulos
})
export class AppRoutingModule { }
