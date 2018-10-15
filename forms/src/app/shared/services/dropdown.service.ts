import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EstadoBr } from '../models/estado-br';
import { CidadeBr } from '../models/cidade-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private _http: HttpClient
  ) { }

  getEstadosBr(): Observable<EstadoBr[]> {
    return this._http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCidadesBr(idEstado: string): Observable<CidadeBr[]> {
    return this._http.get<CidadeBr[]>('assets/dados/cidadesbr.json')
      .pipe(map((cidades: CidadeBr[]) => cidades.filter(c => c.estado === idEstado)));
  }

  getCargos() {
    return [
      { cargo: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { cargo: 'Dev', nivel: 'Pleno ', desc: 'Dev Pl' },
      { cargo: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'python', desc: 'Python' },
    ];
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' }
    ];
  }
}
