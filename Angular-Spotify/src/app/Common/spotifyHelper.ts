import { IArtista } from "../Interfaces/IArtista";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IUsuario } from "../Interfaces/IUsuario";




export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
    return {
        id: user.id || 'id padrão', // Atribui o id do usuário
        nome: user.display_name || 'Usuário sem nome', // Nome do usuário
        imagemUrl: user.images && user.images.length > 0 ? user.images[0].url : 'URL da imagem padrão', // URL da imagem
    }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
    return {
      id: playlist.id,
      nome: playlist.name,
      imagemUrl: playlist.images.pop().url
    };
  }

  export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull): IArtista{
    return {
      id:spotifyArtista.id,
      imagemUrl:spotifyArtista.images.sort((a,b) => a.width - b.width).pop().url,
      nome: spotifyArtista.name
    };

  }