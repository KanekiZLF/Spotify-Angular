import { IUsuario } from "../pages/Interfaces/IUsuario";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
    try {
        if (user.images && user.images.length > 0) {
            const imagemUrl = user.images.pop().url;
            
            return {
                id: user.id,
                nome: user.display_name,
                imagemUrl: imagemUrl
            };
        } else {
            return {
                id: user.id,
                nome: user.display_name,
                imagemUrl: null
            };
        }
    } catch (error) {
        console.error('Erro ao converter usuário do Spotify para usuário personalizado: ', error);
        return null;
    }
}