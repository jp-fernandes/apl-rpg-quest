import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StateHomeService } from './state-home.service';
import { InitialHomeRpgState } from './initialStateHome';
import { IHome } from '../interfaces/IHome';

@Injectable({
  providedIn: 'root',
})
export class StoreHomeService implements StateHomeService {
  constructor() {}

  _homeRpgState$: BehaviorSubject<IHome> = new BehaviorSubject(InitialHomeRpgState);

  set setHomeRpgState(val: any) {
    this._homeRpgState$.next(val);
  }

  get getHomeRpgState$(): Observable<IHome> {
    return this._homeRpgState$.asObservable();
  }

  updateHomeRpgState<T>(
    val: Partial<IHome>,
  ): void {
    console.log('Update HomeRpgState RPG:  ', { ...this._homeRpgState$.value, ...val });
    let currentData = this._homeRpgState$?.value;
    let newData = { ...currentData, ...val };
    this._homeRpgState$.next(newData);
  }
}
