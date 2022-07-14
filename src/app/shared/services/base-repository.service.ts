import { Observable } from 'rxjs';

export abstract class BaseRepositoryService<T> {
  constructor() {}

  abstract get(route: string): Observable<T>;
  abstract getAll(route: string): Observable<T[]>;
  abstract put(route: string, item: T): Observable<T>;
  abstract post(route: string, item: T): Observable<T>;
  abstract delete(route: string): Observable<T>;
}
