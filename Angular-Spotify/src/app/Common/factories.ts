import { IArtista } from "../Interfaces/IArtista";


export function newArtista(): IArtista{
    return {
        id: '',
        imagemUrl: '',
        nome:''
    }
}

// arquivo responsável para gerar interface vazia (evitar erro)