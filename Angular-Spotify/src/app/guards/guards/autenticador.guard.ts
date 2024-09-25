import { inject } from '@angular/core';
import { Route, UrlSegment } from '@angular/router';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/Spotify.service';

export const canMatchGuard = (
  route: Route,
  segments: UrlSegment[]
): Promise<boolean> | boolean => {
  const router = inject(Router);
  const spotifyservice = inject(SpotifyService);
  const win = typeof window !== 'undefined';

  // Verifica se o código está sendo executado no ambiente do navegador
  if (typeof window !== 'undefined' && window.localStorage ) {
    const token = localStorage.getItem('token');  // Busca o token no localStorage
   
    if (token) {
      // Se o token estiver presente, permite a navegação
      return new Promise<boolean>(async (resolve) => {
        const usuarioCriado = await spotifyservice.inicializarUsuario();
        
        if (usuarioCriado) {
          resolve(true);  // Permite a navegação se o usuário for inicializado com sucesso
        } else {
          resolve(naoAutenticado(router));  // Redireciona para login e bloqueia a rota
        }
      });
    }
    
    // Redireciona para login se não houver token
    console.log('Nenhum token encontrado. Redirecionando para login.');
    return naoAutenticado(router);  // Se não houver token, redireciona para login
  };

  // Retorna true se não estiver no ambiente do navegador (não bloqueia o acesso)
  return true; // Permite o acesso caso não esteja no navegador
};

// Função para redirecionar e bloquear acesso
function naoAutenticado(router: Router): boolean {
  localStorage.clear();  // Limpa o localStorage
  router.navigate(['/login']);  // Redireciona para a página de login
  return false;  // Bloqueia a rota
}


