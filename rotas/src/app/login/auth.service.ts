import { Injectable, EventEmitter } from '@angular/core';

import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private _router: Router) { }

  fazerLogin(usuario: Usuario) {
    if (usuario.email === 'douglas@email.com' &&
      usuario.senha === '123') {

      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this._router.navigate(['/']);

    } else {

      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
  }

  isUsuarioAutenticado() {
    return this.usuarioAutenticado;
  }
}
