import { BehaviorSubject, Observable } from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

export class AuthServiceMock {
  private accessTokenSource: BehaviorSubject<string>;
  token$: Observable<string>;

  constructor() {
    this.accessTokenSource = new BehaviorSubject<string>(null);
    this.token$ = this.accessTokenSource.asObservable().pipe(distinctUntilChanged());
  }
}
