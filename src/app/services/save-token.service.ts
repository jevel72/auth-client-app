import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SaveTokenService {
    private readonly saveStatus: BehaviorSubject<boolean> = new BehaviorSubject(true as boolean);
    public readonly saveStatus$: Observable<boolean> = this.saveStatus.asObservable();
    public statusChange(status: boolean): void {
        this.saveStatus.next(status);
    }
}
