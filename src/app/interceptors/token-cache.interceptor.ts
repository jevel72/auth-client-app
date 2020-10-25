import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { SaveTokenService } from '../services/save-token.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenCacheInterceptor implements HttpInterceptor {
    public constructor(
        private readonly saveToken: SaveTokenService,
        private readonly storage: StorageService,
        private readonly router: Router,
    ) {}
    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return this.saveToken.saveStatus$.pipe(switchMap((status: boolean) => {
            return next.handle(req).pipe(
                map((event: HttpEvent<any>): HttpEvent<HttpResponse<any>> => {
                    if (
                        event instanceof HttpResponse &&
                        status === true &&
                        typeof event.body.token === 'string'
                    ) {
                        this.storage.setItem('token', event.body.token);
                        this.router.navigateByUrl('/users');
                    }
                    return event;
                }),
            );
        }));
    }
}
