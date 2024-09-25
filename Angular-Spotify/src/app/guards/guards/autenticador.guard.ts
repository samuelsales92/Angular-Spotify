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

  // Verifica se o código está sendo executado no ambiente do navegador
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');  // Busca o token no localStorage

    if (!token) {
      console.log('Nenhum token encontrado. Redirecionando para login.');
      return naoAutenticado(router);  // Se não houver token, redireciona para login
    }

    // Retorna uma Promise que resolve quando o usuário é inicializado
    return new Promise<boolean>(async (resolve) => {
      const usuarioCriado = await spotifyservice.inicializarUsuario();
      
      if (usuarioCriado) {
        resolve(true);  // Permite a navegação
      } else {
        resolve(naoAutenticado(router));  // Redireciona para login e bloqueia a rota
      }
    });
  }

  // Caso não esteja no ambiente do navegador, retorne `false`
  return false;
};

// Função para redirecionar e bloquear acesso
function naoAutenticado(router: Router): boolean {
  localStorage.clear();  // Limpa o localStorage
  router.navigate(['/login']);  // Redireciona para a página de login
  return false;  // Bloqueia a rota
}
