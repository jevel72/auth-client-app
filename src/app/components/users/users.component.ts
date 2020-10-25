import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { StorageService } from '../../services/storage.service';

import { UserData } from '../../interfaces/user-data.interface';

import { BACKEND_URL } from '../../utils/backend-url.token';
import { BACKEND_USERS_ENDPOINT } from '../../utils/backend-users-endpoint.token';

@Component({
  selector: 'auth-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {

  public sortedUsersByID: UserData[] = [];

  public users: UserData[] = [];

  public filteringControl: FormControl = new FormControl();

  public usernameControl: FormControl = new FormControl();

  public filter: boolean = false;

  public constructor(
    private readonly http: HttpClient,
    private readonly title: Title,
    private readonly storage: StorageService,
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    @Inject(BACKEND_URL) private readonly url: string,
    @Inject(BACKEND_USERS_ENDPOINT) private readonly usersEndpoint: string,
  ) { }

  public ngOnInit(): void {
    this._initializeSubscriptionToResponse();
    this._setTitle();
    this._setUpForms();
  }

  public ngOnDestroy(): void {
    this._usersSubscription.unsubscribe();
    this._filterSubscription.unsubscribe();
    this._usernameSubscription.unsubscribe();
  }

  private _usersSubscription!: Subscription;

  private _filterSubscription!: Subscription;

  private _usernameSubscription!: Subscription;

  private _usersCopy: UserData[] = [];
  
  private _sortedUsersByIDCopy: UserData[] = [];

  private _sortComparer(a: UserData, b: UserData): number {
    return a.id - b.id;
  }

  private _initializeSubscriptionToResponse(): void {
    this._usersSubscription = this.http.get<UserData[]>(
      `${ this.url + this.usersEndpoint }`,
      {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${ this.storage.getItem('token') }`,
          'X-CSRFToken': 'tcTPQJvtb7kAIpqmTZL9hyY22lRkGBU1iysaV3dhi34yidEXmgUujy73NnIlLWJI',
        }),
      }
    ).pipe(
      tap((users: UserData[]): void => {
        this.sortedUsersByID = [
          ...users.concat().sort(this._sortComparer)
        ];
        this._sortedUsersByIDCopy = [...this.sortedUsersByID.concat()];
      }),
      tap((users: UserData[]): void => {
        this.users = [...users.concat()];
        this._usersCopy = [...this.users.concat()];
      }),
    ).subscribe((users: UserData[]): void => {
      this.cdr.detectChanges();
    });
  }

  private _setTitle(): void {
    this.title.setTitle('Список пользователей');
  }

  private _setUpForms(): void {
    this.filteringControl = this.fb.control(false);
    this._filterSubscription = this.filteringControl.valueChanges.subscribe(
      (filter: boolean): void => {
        this.filter = filter;
        this.cdr.detectChanges();
      }
    );
    this.usernameControl = this.fb.control('');
    this._usernameSubscription = this.usernameControl.valueChanges.subscribe(
      (username: string): void => {
        if (username !== '') {
          const users: UserData[] = this._usersCopy.concat().filter(
            (user: UserData): boolean => {
              return user.username.startsWith(username);
            }
          );
          this.users = users;
          this.sortedUsersByID = users.concat().sort(this._sortComparer);
        } else {
          this.users = [...this._usersCopy.concat()];
          this.sortedUsersByID = [...this._sortedUsersByIDCopy.concat()];
        }
      }
    );
  }

}
