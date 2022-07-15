import { OwnerForCreation } from './../../_interfaces/owner-for-creation.model';
import { Observable } from 'rxjs';
import { Owner } from '../../_interfaces/owner.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { BaseRepositoryService } from './base-repository.service';

@Injectable({
  providedIn: 'root',
})
export class OwnerRepositoryService extends BaseRepositoryService<Owner> {
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) {
    super();
  }

  public getAll(route: string): Observable<Owner[]> {
    return this.http.get<Owner[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  public get(route: string): Observable<Owner> {
    return this.http.get<Owner>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  public post(route: string, owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      owner,
      this.generateHeaders()
    );
  }

  public put(route: string, owner: Owner): Observable<Owner> {
    return this.http.put<Owner>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      owner,
      this.generateHeaders()
    );
  }

  public delete(route: string): Observable<any> {
    return this.http.delete(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  public createOwner = (route: string, owner: OwnerForCreation) => {
    return this.http.post<Owner>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      owner,
      this.generateHeaders()
    );
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };
}
