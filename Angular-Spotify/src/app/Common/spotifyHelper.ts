import { addMilliseconds, format } from "date-fns";
import { IArtista } from "../Interfaces/IArtista";
import { IMusica } from "../Interfaces/IMusica";
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

export function SpotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull) : IMusica {
  
  const msParaMinutos = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }
  
  return { 
    id: spotifyTrack.id,
    uri: spotifyTrack.uri,
    titulo: spotifyTrack.name,
      album: {
        id: spotifyTrack.id,
        imageUrl: spotifyTrack.album.images.shift().url,
        nome: spotifyTrack.album.name
      },
      artistas: spotifyTrack.artists.map(artista => ({
        id: artista.id,
        nome: artista.name
      })),
      tempo: msParaMinutos(spotifyTrack.duration_ms),


  }


}


export function converterParaMusica(artist: any): IMusica {
  return {
    id: artist.id,
    uri: artist.uri,
    titulo: artist.name,
    artistas: [{ id: artist.id, nome: artist.name }],
    album: {
      id: artist.id,
      nome: artist.name,
      imageUrl: artist.images?.[0]?.url || 'assets/default.jpg',
    },
    tempo: '', // Artistas não têm tempo, então deixamos vazio
  };
}



