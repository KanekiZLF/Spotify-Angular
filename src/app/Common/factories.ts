import { IArtista } from "../pages/Interfaces/IArtista";
import { IMusicas } from "../pages/Interfaces/IMusicas";
import { IPlaylist } from "../pages/Interfaces/IPlaylist";

export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
    }
}

export function newMusicas(): IMusicas {
    return {
        id: '',
        album: {
            id: '',
            imagemUrl: '',
            nome: ''
        },
        artistas: [],
        tempo: '',
        titulo: ''
    }
}

export function newPlaylist(): IPlaylist {
    return {
        id: '',
        imagemUrl: '',
        nome: '',
        musicas: []
    }
}