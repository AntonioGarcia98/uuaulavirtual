import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(
        private sessionService: SessionService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        var session = this.sessionService.getSession();

        if (route.data.sessionRequired) {
            if (session) {
                
                if(route.data.adminUser) 
                {
                    /* if(this.sessionService.decodeToken(session.token).type == 'S')
                    {    
                        return true;
                    }
                    else{
                        this.router.navigate(['/guides']);
                        return false
                    } */
                }
                return true;
            }
            this.router.navigate(['/home']);
            return false;
        } else {
            if (!session) {
                return true;
            }
            //Condiciones cuando es super usuario y tiene sesion iniciada
            return false;
        }

        

    }
}
