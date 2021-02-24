import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap, map } from 'rxjs/operators';

// array in local storage for users 
// const usersKey = 'users';  
const usersKey = 'user-refreshTokens'; 
const users = JSON.parse(localStorage.getItem(usersKey)) || [];
// let user = JSON.parse(localStorage.getItem(usersKey)) || {};    //    =>    show user logged    

// add test user and save if users array is empty
if (!users.length) {
    users.push({ id: 1, username: 'test', password: 'test', email: 'test@test.com', refreshTokens: [] });
    // localStorage.setItem(usersKey, JSON.stringify(users));   =>    show users
    localStorage.setItem(usersKey, JSON.stringify(users[0].refreshTokens.map((res: string) => res)));
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(delay(500))
        .pipe(dematerialize());

    function handleRoute() {
        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/users/refresh-token') && method === 'POST':
                return refreshToken();
            case url.endsWith('/users/revoke-token') && method === 'POST':
                return revokeToken();
            case url.endsWith('/users/register') && method === 'POST':
                return register();
            case url.endsWith('/users') && method === 'GET':
                return getUsers();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }    
    }

    // route functions

    function authenticate() {
        const { username, password } = body;
        const user = users.find(x => x.username === username && x.password === password);
        
        if (!user) return error('Username or password is incorrect');

        // add refresh token to user
        user.refreshTokens.push(generateRefreshToken());
        // localStorage.setItem(usersKey, JSON.stringify(users));   =>    show users
        localStorage.setItem(usersKey, JSON.stringify(user.refreshTokens.map((res: string) => res)));

        return ok({
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email, 
            jwtToken: generateJwtToken(),
            refreshTokens: user.refreshTokens
        })
    }

    function refreshToken() {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) return unauthorized();

        const user = users.find(x => x.refreshTokens.includes(refreshToken));
        
        if (!user) return unauthorized();

        // replace old refresh token with a new one and save
        user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
        user.refreshTokens.push(generateRefreshToken());
        // localStorage.setItem(usersKey, JSON.stringify(users));   =>    show users
        localStorage.setItem(usersKey, JSON.stringify(user.refreshTokens.map((res: string) => res)));

        return ok({
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            jwtToken: generateJwtToken(),
            refreshTokens: user.refreshTokens
        })
    }

    function revokeToken() {
        if (!isLoggedIn()) return unauthorized();
        
        const refreshToken = getRefreshToken(); 
        const user = users.find(x => x.refreshTokens.includes(refreshToken));
        
        // revoke token and save
        user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
        // localStorage.setItem(usersKey, JSON.stringify(users));   =>    show users
        localStorage.setItem(usersKey, JSON.stringify(user.refreshTokens.map((res: string) => res)));
 
        return ok();
    }

    function getUsers() {
        if (!isLoggedIn()) return unauthorized();
        return ok(users);
    }

    function register() {
      const user = JSON.parse(body);
      user.refreshTokens = [];

      if (users.find(x => x.email === user.email)) {
          return error('Email "' + user.email + '" is already taken')
      }

      delete user.repeatPassword;
      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1; 
      users.push(user);
      user.refreshTokens.push(generateRefreshToken());
      // localStorage.setItem(usersKey, JSON.stringify(users));   =>    show users
      localStorage.setItem(usersKey, JSON.stringify(user.refreshTokens.map((res: string) => res)));

      // return ok();
      return ok({
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        jwtToken: generateJwtToken(),
        refreshTokens: user.refreshTokens
    });
  }

    // helper functions

    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
        return throwError({ error: { message } });
    }

    function unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorized' } });
    }

    function isLoggedIn() {
        // check if jwt token is in auth header
        const authHeader = headers.get('Authorization');
        if (!authHeader.startsWith('Bearer fake-jwt-token')) return false;

        // check if token is expired
        const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
        const tokenExpired = Date.now() > (jwtToken.exp * 1000);
        if (tokenExpired) return false;

        return true;
    }

    function generateJwtToken() {
        // create token that expires in 15 minutes
        const tokenPayload = { exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000) }
        return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
    }

    function generateRefreshToken() {
        const token = new Date().getTime().toString();

        // add token cookie that expires in 7 days
        const expires = new Date(Date.now() + 7*24*60*60*1000).toUTCString();
        document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

        return token;
    }

    function getRefreshToken() {
        // get refresh token from cookie
        return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
