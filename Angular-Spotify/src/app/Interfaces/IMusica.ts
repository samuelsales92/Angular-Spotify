export interface IMusica  {
    id: string,
    uri: string,
    titulo: string,
    artistas: {
        id: string,
        nome: string,
        
    }[],
    album: {
        id: string,
        nome: string,
        imageUrl: string
    },
    tempo: string,
}


