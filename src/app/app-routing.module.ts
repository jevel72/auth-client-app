import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { UsersCanActivateGuard } from './guards/users-can-activate.guard';
import { LoginCanActivateGuard } from './guards/login-can-activate.guard';

const LoginRoute: Route = {
  path: 'login',
  component: LoginComponent,
  canActivate: [LoginCanActivateGuard],
};

const UsersRoute: Route = {
  path: 'users',
  component: UsersComponent,
  canActivate: [UsersCanActivateGuard],
};

const EmptyRoute: Route = {
  path: '',
  pathMatch: 'full',
  component: MainComponent,
};

const WildcardRoute: Route = {
  path: '**',
  component: NotFoundComponent,
};

const routes: Routes = [
  LoginRoute,
  UsersRoute,
  EmptyRoute,
  WildcardRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [UsersCanActivateGuard, LoginCanActivateGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
