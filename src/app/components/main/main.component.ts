import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'auth-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  public loggedIn: boolean = false;

  public constructor(
    private readonly title: Title,
    private readonly storage: StorageService,
  ) { }

  public ngOnInit(): void {
    this._setTitle();
    this._isUserLogged();
  }

  private _setTitle(): void {
    this.title.setTitle('Главная страница');
  }

  private _isUserLogged(): void {
    this.loggedIn = !!(this.storage.getItem('token'));
  }

}
