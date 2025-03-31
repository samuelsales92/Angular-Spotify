import { IMusica } from './../Interfaces/IMusica';
import { IArtista } from "../Interfaces/IArtista";



export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: ''
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

// arquivo responsável para gerar interface vazia (evitar erro)