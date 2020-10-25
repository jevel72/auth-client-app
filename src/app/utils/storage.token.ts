import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE_TOKEN: InjectionToken<Storage> = new InjectionToken(
    'LocalStorage Token',
    {
        providedIn: 'root',
        factory: () => (window.localStorage) as Storage,
    },
);
