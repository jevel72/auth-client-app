import { InjectionToken } from '@angular/core';

export const BACKEND_USERS_ENDPOINT: InjectionToken<string> = new InjectionToken(
    'Backend Users Endpoint',
    {
        providedIn: 'root',
        factory: () => 'api/v1/users/',
    },
);
