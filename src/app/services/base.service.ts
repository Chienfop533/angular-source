import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import DataSource from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { environment } from '../../environments/environment';
import { IBaseService } from '../models/interface';

export class BaseService<T> implements IBaseService<T> {
  public baseUrl: string = '';
  public _path: string;

  public http = inject(HttpClient);
  constructor(path: string) {
    this.baseUrl = environment.apiConfig.baseUrl;
    this._path = path;
    this.configHeaderDevextreme = this.configHeaderDevextreme.bind(this);
  }
  add(resource: T): Observable<T> {
    const url = `${this.baseUrl}/${this._path}`;
    return this.http.post<T>(url, resource).pipe(
      map((x: any) => x.data as T),
      catchError((err) => {
        throw err;
      })
    );
  }
  addFromFormData(formData: FormData) {
    return this.http.post(`${this.baseUrl}/${this._path}`, formData).pipe(
      map((x: any) => x.data as T),
      catchError((err) => {
        throw err;
      })
    );
  }

  getAll(): Observable<T[]> {
    const url = `${this.baseUrl}/${this._path}`;
    return this.http.get<any>(url).pipe(
      map((x) => x.data as T[]),
      catchError((err) => {
        throw err;
      })
    );
  }

  getById(id: string): Observable<T> {
    const url = `${this.baseUrl}/${this._path}/${id}`;
    return this.http.get<any>(url).pipe(
      map((x) => x.data as T),
      catchError((err) => {
        throw err;
      })
    );
  }

  update(id: string, changes: Partial<T>): Observable<T> {
    const url = `${this.baseUrl}/${this._path}/${id}`;
    return this.http.put<T>(url, changes).pipe(
      map((x: any) => x.data as T),
      catchError((err) => {
        throw err;
      })
    );
  }
  updateFromFormData(id: string, formData: FormData) {
    return this.http.put(`${this.baseUrl}/${this._path}/${id}`, formData).pipe(
      map((x: any) => x.data as T),
      catchError((err) => {
        throw err;
      })
    );
  }

  delete(id: string): Observable<any> {
    const url = `${this.baseUrl}/${this._path}/${id}`;
    return this.http.delete(url).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  loadGrid(filter?: any) {
    let self = this;
    return new DataSource({
      store: createStore({
        key: `id`,
        loadUrl: `${this.baseUrl}/${this._path}/grid`,
        onBeforeSend: self.configHeaderDevextreme,
      }),
      paginate: true,
      filter: filter,
    });
  }

  loadLookup(filter?: any, sort?: any, keyExpr: any = 'id') {
    let self = this;
    return {
      store: createStore({
        key: keyExpr,
        loadUrl: `${this.baseUrl}/${this._path}/grid`,
        onBeforeSend: self.configHeaderDevextreme,
      }),
      paginate: true,
      pageSize: 10,
      filter: filter,
      sort: sort,
    };
  }

  public configHeaderDevextreme(method: any, ajaxOptions: any) {
    ajaxOptions.headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
  }
}
