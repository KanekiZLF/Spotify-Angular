import { IArtista } from "../pages/Interfaces/IArtista";
import { IMusicas } from "../pages/Interfaces/IMusicas";

export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: ''
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