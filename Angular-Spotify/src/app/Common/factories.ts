import { IArtista } from "../Interfaces/IArtista";


export function newArtista(): IArtista{
    return {
        id: '',
        nome:'',
        imagemUrl: ''
    }
}

// arquivo responsável para gerar interface vazia (evitar erro)