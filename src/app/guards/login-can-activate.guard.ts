import { Injectable } from '@angular/core';
import {
    CanActivate,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    Router,
} from '@angular/router';

import { StorageService } from '../services/storage.service';

@Injectable()
export class LoginCanActivateGuard implements CanActivate {
    public constructor(
        private readonly storage: StorageService,
        private readonly router: Router,
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean {
        if (typeof this.storage.getItem('token') === 'string') {
            this.router.navigateByUrl('/');
            return false;
        } else {
            return true;
        }
    }
}
