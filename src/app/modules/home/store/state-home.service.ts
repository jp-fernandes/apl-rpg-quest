import { IHome } from '../interfaces/IHome';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

export abstract class StateHomeService {
  abstract _homeRpgState$: BehaviorSubject<IHome>;
  abstract set setHomeRpgState(val:any);

  abstract updateHomeRpgState<T>(val:Partial<IHome>, key?:string, syncGlobal?: boolean,):void;
  abstract get getHomeRpgState$(): Observable<IHome>;
}
