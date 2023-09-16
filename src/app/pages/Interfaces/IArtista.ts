import { IMusicas } from "./IMusicas";

export interface IArtista {
    id: string,
    nome: string,
    imagemUrl: string,
    musicas?: IMusicas[]
}