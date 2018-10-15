import { Injectable } from '@angular/core';

import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private _alunos: Aluno[] = [
    { id: '1', nome: 'Douglas', email: 'douglas@email.com' },
    { id: '2', nome: 'Gabriel', email: 'gabriel@email.com' },
    { id: '3', nome: 'Angeli', email: 'angeli@email.com' },
  ];

  constructor() { }

  getAlunos() {
    return this._alunos;
  }

  getAluno(id: string) {
    for (const aluno of this.getAlunos()) {
      if (aluno.id == id) return aluno;
    }
    return null;
  }
}
