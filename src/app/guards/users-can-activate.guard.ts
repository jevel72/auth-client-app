import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';

import { StorageService } from '../services/storage.service';

@Injectable()
export class UsersCanActivateGuard implements CanActivate {
    public constructor(
        private readonly storage: StorageService,
        private readonly router: Router,
    ) {}
    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean {
        if (typeof this.storage.getItem('token') === 'string') {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
