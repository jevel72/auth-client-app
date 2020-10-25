import { Injectable, Inject } from '@angular/core';

import { LOCAL_STORAGE_TOKEN } from '../utils/storage.token';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    public constructor(
        @Inject(LOCAL_STORAGE_TOKEN) private readonly storage: Storage,
    ) { }

    public getItem(key: string): string | null {
        return this.storage.getItem(key);
    }

    public setItem(key: string, value: string): void {
        return this.storage.setItem(key, value);
    }

    public removeItem(key: string): void {
        return this.storage.removeItem(key);
    }

    public clear(): void {
        return this.storage.clear();
    }
}
