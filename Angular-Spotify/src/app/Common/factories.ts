import { IMusica } from './../Interfaces/IMusica';
import { IArtista } from "../Interfaces/IArtista";
import { IPlaylist } from '../Interfaces/IPlaylist';



export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
    }
}

export function newMusica(): IMusica {
    return {
        id: '',
        uri: '',
        titulo: '',
        artistas:  [],
        album: {
            id: '',
            imageUrl: '',
            nome: ''
        },
        tempo: '',
    
    }
}


export function newPlaylist(): IPlaylist {
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
    }
}


// arquivo responsável para gerar interface vazia (evitar erro)