import { InjectionToken } from '@angular/core';

export const BACKEND_URL: InjectionToken<string> = new InjectionToken('Backend URL', {
    factory: () => 'https://emphasoft-test-assignment.herokuapp.com/',
    providedIn: 'root',
});
