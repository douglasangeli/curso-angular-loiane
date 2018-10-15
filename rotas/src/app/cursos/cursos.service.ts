import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  getCursos() {
    return [
      { id: '1', descricao: 'Angular 2' },
      { id: '2', descricao: 'Java' },
      { id: '3', descricao: '.NET Core' },
    ];
  }

  getCurso(id: string) {
    for (let curso of this.getCursos()) {
      
      if (curso.id == id) return curso;
    }
    return null;
  }

  constructor() { }

}
