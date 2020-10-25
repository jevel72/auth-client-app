import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { SaveTokenService } from '../../services/save-token.service';

import { BACKEND_URL } from '../../utils/backend-url.token';
import { BACKEND_LOGIN_ENDPOINT } from '../../utils/backend-login-endpoint.token';

import { USERNAME_PATTERN } from '../../patterns/username.pattern';
import { PASSWORD_PATTERN } from '../../patterns/password.pattern';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public save!: boolean;

  public controls!: Record<string, AbstractControl>;

  public constructor(
    private readonly http: HttpClient,
    private readonly fb: FormBuilder,
    private  readonly title: Title,
    private readonly saveToken: SaveTokenService,
    @Inject(BACKEND_URL) private readonly url: string,
    @Inject(BACKEND_LOGIN_ENDPOINT) private readonly loginEndpoint: string,
  ) {}

  public ngOnInit(): void {
    this._setVariables();
    this._initializeForm();
    this._setTitle();
    this._setUpControls();
  }

  public onSubmit(user: FormGroup): void {
    const payload: User = {
      username: user.get('username')?.value,
      password: user.get('password')?.value,
    };
    const save: boolean = user.get('save')?.value;
    this.saveToken.statusChange(save || false);
    this.http.post<User>(
      `${ this.url + this.loginEndpoint }`,
      payload as User,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        ),
        responseType: 'json',
      },
    )
    .subscribe();
  }

  public requiredError(controlName: string): boolean {
    return (
      this.controls[controlName].hasError('required') &&
      this.controls[controlName].touched
    );
  }

  public maxlengthError(controlName: string): boolean {
    return (
      this.controls[controlName].hasError('maxlength') &&
      this.controls[controlName].dirty
    );
  }

  public patternError(controlName: string): boolean {
    return (
      this.controls[controlName].hasError('pattern') &&
      this.controls[controlName].dirty
    );
  }

  private _setVariables(): void {
    this.saveToken.saveStatus$.subscribe(status => this.save = status);
  }

  private _initializeForm(): void {
    this.form = this.fb.group(
      {
        username: [
          '',
          [
            Validators.maxLength(150),
            Validators.pattern(USERNAME_PATTERN),
            Validators.required,
          ],
        ],
        password: [
          '',
          [
            Validators.maxLength(150),
            Validators.pattern(PASSWORD_PATTERN),
            Validators.required,
          ],
        ],
        save: this.save,
      },
    );
  }

  private _setTitle(): void {
    this.title.setTitle('Страница входа');
  }

  private _setUpControls(): void {
    this.controls = this.form.controls;
  }
}
