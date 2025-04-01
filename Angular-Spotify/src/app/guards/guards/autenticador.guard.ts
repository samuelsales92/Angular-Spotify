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
  
  

  
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') { 
    
    const token = localStorage.getItem('token');  
   
    if (token) {
      return new Promise<boolean>(async (resolve) => {
        try {
          const usuarioCriado = await spotifyservice.inicializarUsuario();
          
          if (usuarioCriado) {
            resolve(true);  
          } else {
            resolve(naoAutenticado(router));  
          }
        } catch (error) {
          console.error('Erro ao inicializar o usuário:', error);
          resolve(naoAutenticado(router));  
        }
      });
    }
    
   
    console.log('Nenhum token encontrado. Redirecionando para login.');
    return naoAutenticado(router);  
  };
 
  return false; 
};


function naoAutenticado(router: Router): boolean {
  localStorage.clear();  
  router.navigate(['/login']); 
  return false; 
}


