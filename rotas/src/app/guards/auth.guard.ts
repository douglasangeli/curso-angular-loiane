import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';

import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    console.log('CanActivate: verificando se o usuario pode acessar o módulo');

    return this.verificarAcesso();
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {

    console.log('CanLoad: verificando se o usuario pode carregar o módulo');
    
    return this.verificarAcesso();
  }

  verificarAcesso(): boolean {
    if (this._authService.isUsuarioAutenticado()) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }
}
