import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { map } from 'rxjs/operators';

import { StorageService } from './services/storage.service';

@Component({
  selector: 'auth-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  public loggedIn!: boolean;

  public constructor(
    private readonly router: Router,
    private readonly storage: StorageService,
  ) { }

  public ngOnInit(): void {
    this._setVariables();
    this._subscribeToRouterUpdates();
  }

  public logOut(): void {
    this.storage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  public ngOnDestroy(): void {
    this._routerEventSubscription.unsubscribe();
  }

  private _routerEventSubscription!: Subscription;

  private _setVariables(): void {
    this.loggedIn = !!(this.storage.getItem('token'));
  }

  private _subscribeToRouterUpdates(): void {
    this._routerEventSubscription = this.router.events.pipe(map((event: Event) => {
      if (event instanceof NavigationEnd) {
        this._setVariables();
      }
      return Event;
    })).subscribe();
  }

}
