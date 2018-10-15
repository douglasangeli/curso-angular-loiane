import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AlunosGuard implements CanActivateChild {

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        console.log('AlunosGuard');        
        //console.log(route);
        //console.log(state);

        if (state.url.includes('editar')) {
            alert('Este usuário não ter permissão para editar!');
            //return false;
        }

        return true;
    }

}
