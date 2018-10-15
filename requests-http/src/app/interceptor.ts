import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { TokenStorage } from './token.storage';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private token: TokenStorage) {
        this.token.saveToken('meuTokenMaroto');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)
            });
        }
        return next.handle(authReq)
            .pipe(tap((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    console.log(err);
                    console.log('req url :: ' + req.url);
                } else if (err instanceof HttpResponse) {
                    console.log(err);
                    console.log('req url :: ' + req.url);
                }
            }));
    }
}