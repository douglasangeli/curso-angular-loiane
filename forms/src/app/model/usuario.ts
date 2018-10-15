import { Endereco } from "./endereco";

export class Usuario {
    nome: string;
    email: string;
    private _endereco: Endereco;

    get endereco(): Endereco {
        if (!this._endereco) this._endereco = new Endereco();
        return this._endereco;
    }

    set endereco(endereco: Endereco) {
        this._endereco = endereco;
    }
}