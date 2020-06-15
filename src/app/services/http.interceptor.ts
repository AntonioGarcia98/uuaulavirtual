import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(
        private sessionService: SessionService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Authorization headers only for API urls.
    
        if (req.url.includes('/')) {

            // Set JSON headers.
            req = req.clone({
                setHeaders: {
                },
            });

            // Get current sessions.
            let session = this.sessionService.getSession();
            let token: string = null;

            // Primary token.
            if (session && session.token) {
                token = session.token;
            }

            // Set authorization header if exists.
            if (token != null) {
                req = req.clone({
                    setHeaders: {
                        'Authorization': token,
                    },
                });
    
            }
        }

        // Return response.
        return next
            .handle(req)
            .pipe(
                catchError((_error) => {

                    return throwError(_error);
                })
            );
    }
}