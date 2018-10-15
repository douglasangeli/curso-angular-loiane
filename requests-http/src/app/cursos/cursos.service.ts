import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, delay } from 'rxjs/operators';
import { Curso } from './curso';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(
    private _http: HttpClient
  ) { }

  list() {
    return this._http.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }
}
