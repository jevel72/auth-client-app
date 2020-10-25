import { InjectionToken } from '@angular/core';

export const BACKEND_LOGIN_ENDPOINT: InjectionToken<string> = new InjectionToken('Backend Login Endpoint URL', {
    factory: () => 'api-token-auth/',
    providedIn: 'root',
});
