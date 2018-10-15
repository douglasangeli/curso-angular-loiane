import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(
    private _http: Http
  ) { }

  consultaCep(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep != '') {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        return this._http.get(`https://viacep.com.br/ws/${cep}/json`)
          .pipe(map(dados => dados.json()));
      }
    }

    return of({});
  }
}
