import { IArtista } from "../Interfaces/IArtista";
import { IMusica } from "../Interfaces/IMusica";


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
        album: {
            id: '',
            imageUrl: '',
            nome: ''
        },
        artistas: [],
        tempo: '',
        titulo: '',
    
    }
}

// arquivo responsável para gerar interface vazia (evitar erro)