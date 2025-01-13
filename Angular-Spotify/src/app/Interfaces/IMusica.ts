export interface IMusica  {
    id: string,
    titulo: string,
    artitas: {
        id: string,
        string: string
    }[],
    album: {
        id: string,
        nome: string,
        imageUrl: string
    },
    tempo: string
}