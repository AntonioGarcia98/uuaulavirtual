import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { decode } from 'punycode';
import { LoginRequest } from '../models/login-request.model';

@Injectable()
export class SessionService {
    
    private session: BehaviorSubject<any> = new BehaviorSubject(null);
    _session: Observable<any> = this.session.asObservable().pipe(delay(0));

    private navbarState: BehaviorSubject<number> = new BehaviorSubject(0);
    _navbarState: Observable<number> = this.navbarState.asObservable().pipe(delay(0));

    private topNavbarState: BehaviorSubject<number> = new BehaviorSubject(0);
    _topNavbarState: Observable<number> = this.topNavbarState.asObservable().pipe(delay(0));

    static readonly SESSION_TAG: string = "session";

    url = environment.server; //-> localhost:3000

    constructor(
        private http: HttpClient,
    ) {
        this.loadSession()
    }

    logout() {
        this.session.next(null);
        localStorage.removeItem(SessionService.SESSION_TAG);
    }

    login(loginRequest: LoginRequest) {
        return this.http.post(this.url + 'login', loginRequest)
            .toPromise()
            .then((res: any) => {
                console.log(res)
                
                var session = this.tokenToSession(res.item.token);
                this.session.next(session);
                localStorage.setItem(SessionService.SESSION_TAG, session.token);
            })
            .catch(err => {
                return err;
            });

    }

    register(registerRequest: any) {
        return this.http.post(this.url + 'register', registerRequest)
            .toPromise()
            .then((res: any) => {
                console.log(res)
            })
            .catch(err => {
                return err
            });

    }

    loadSession() {
        var sessionString = localStorage.getItem(SessionService.SESSION_TAG);

        if (!sessionString)
            return;
        var session = this.tokenToSession(sessionString);
        this.session.next(session);

    }

    getSession(): any {
        return this.session.getValue();
    }

    setNavState(state) {
        this.navbarState.next(state);
    }

    setTopNavState(state) {
        this.topNavbarState.next(state);
    }

    tokenToSession(token: string) {
        var decoded: any = this.decodeToken(token);
        if (!decoded)
            return null;
        var session : any = {}

        session.token = token
        session.user = JSON.parse(JSON.stringify(decoded.user));

        return session;
    }

    decodeToken(token: string) {
        var decoded: any = jwt_decode(token);
        if (!decoded)
            return null;
        return decoded
    }


    
}