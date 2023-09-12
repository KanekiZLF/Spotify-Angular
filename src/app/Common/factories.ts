import { IArtista } from "../pages/Interfaces/IArtista";

export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: ''
    }
}