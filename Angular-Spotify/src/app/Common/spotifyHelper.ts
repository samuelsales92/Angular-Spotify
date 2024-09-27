import { IUsuario } from "../Interfaces/IUsuario";




export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
    return {
        id: user.id || 'id padrão', // Atribui o id do usuário
        nome: user.display_name || 'Usuário sem nome', // Nome do usuário
        imagemUrl: user.images && user.images.length > 0 ? user.images[0].url : 'URL da imagem padrão', // URL da imagem
    }
}