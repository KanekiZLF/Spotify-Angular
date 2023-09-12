import { IUsuario } from "../pages/Interfaces/IUsuario";
import { IPlaylist } from "../pages/Interfaces/IPlaylist";
import { IArtista } from "../pages/Interfaces/IArtista";


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

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    try {
        if (playlist.images && playlist.images.length > 0) {
            const imagemUrl = playlist.images.pop().url;

            return {
                id: playlist.id,
                nome: playlist.name,
                imagemUrl: imagemUrl
            };
        } else {
            return {
                id: playlist.id,
                nome: playlist.name,
                imagemUrl: null
            };
        }
    } catch (error) {
        console.error('Erro ao executar a função: ', error);
        return null;
    };

}

export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull): IArtista {
    return {
        id: spotifyArtista.id,
        nome: spotifyArtista.name,
        imagemUrl: spotifyArtista.images.sort((a, b) => a.width - b.width).pop().url
    };
}