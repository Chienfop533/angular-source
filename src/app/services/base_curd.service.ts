import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { objectToFormData } from '../common/helper';
import DataSource from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';

export interface IBaseCURDService<T> {
  getAll(): Observable<T[]>;
  getById(id: number | string): Observable<T>;
  add(item: T): Observable<T>;
  update(id: number | string, item: T): Observable<T>;
  delete(id: number | string): Observable<void>;
}
export class BaseCURDService<T>
  extends BaseService
  implements IBaseCURDService<T>
{
  // Thêm tài nguyên mới
  add(resource: T): Observable<T> {
    const url = `${this.baseUrl}/${this._path}`;
    return this.http.post<T>(url, resource).pipe(
      map((x: any) => x.data as T),
      catchError((err) => {
        console.error('Error adding resource:', err);
        throw err;
      })
    );
  }

  addFromEntity(entity: any) {
    let formData: FormData = objectToFormData(entity);
    return this.http.post(`${this.baseUrl}/${this._path}`, formData);
  }

  addFromFormData(formData: FormData) {
    return this.http.post(`${this.baseUrl}/${this._path}`, formData).pipe(
      catchError((err) => {
        console.error('Error adding resource:', err);
        throw err;
      })
    );
  }

  // Lấy danh sách tất cả tài nguyên
  getAll(): Observable<T[]> {
    const url = `${this.baseUrl}/${this._path}`;
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        console.error('Error getting all resources:', err);
        throw err;
      })
    );
  }

  // Lấy tài nguyên theo ID
  getById(id: string): Observable<T> {
    const url = `${this.baseUrl}/${this._path}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        console.error(`Error getting resource with ID ${id}:`, err);
        throw err;
      })
    );
  }

  // Sửa thông tin tài nguyên
  update(id: string, changes: Partial<T>): Observable<T> {
    const url = `${this.baseUrl}/${this._path}/${id}`;
    return this.http.put<T>(url, changes).pipe(
      map((x: any) => x.data as T),
      catchError((err) => {
        console.error(`Error updating resource with ID ${id}:`, err);
        throw err;
      })
    );
  }

  updateFromEntity(entity: any, id: string) {
    let formData: FormData = objectToFormData(entity);
    return this.http.put(`${this.baseUrl}/${this._path}/${id}`, formData).pipe(
      map((x: any) => x.data as T),
      catchError((err) => {
        console.error('Error adding resource:', err);
        throw err;
      })
    );
  }
  updateFromFormData(id: string, formData: FormData) {
    return this.http.put(`${this.baseUrl}/${this._path}/${id}`, formData).pipe(
      map((x: any) => x.data as T),
      catchError((err) => {
        console.error('Error adding resource:', err);
        throw err;
      })
    );
  }

  // Xóa tài nguyên
  delete(id: string): Observable<any> {
    const url = `${this.baseUrl}/${this._path}/${id}`;
    return this.http.delete(url).pipe(
      catchError((err) => {
        console.error(`Error deleting resource with ID ${id}:`, err);
        throw err;
      })
    );
  }

  loadGrid(filter?: any) {
    let self = this;
    this._gridInstance = new DataSource({
      store: createStore({
        key: `id`,
        loadUrl: `${this.baseUrl}/${this._path}/grid`,
        onBeforeSend: self.configHeaderDevextreme,
        onAjaxError: self.configAjaxErrorDevextreme,
      }),

      filter: filter,
    });
    return this._gridInstance;
  }

  loadLookup(filter?: any, sort?: any, keyExpr: any = 'id') {
    let self = this;
    return {
      store: createStore({
        key: keyExpr,
        loadUrl: `${this.baseUrl}/${this._path}/lookup`,
        onBeforeSend: self.configHeaderDevextreme,
        onAjaxError: self.configAjaxErrorDevextreme,
      }),

      pageSize: 10,
      filter: filter,
      sort: sort,
    };
  }

  public customLoadOptions(loadOptions: any) {
    const params: any = new HttpParams();

    [
      'filter',
      'group',
      'groupSummary',
      'parentIds',
      'requireGroupCount',
      'requireTotalCount',
      'searchExpr',
      'searchOperation',
      'searchValue',
      'select',
      'sort',
      'skip',
      'take',
      'totalSummary',
      'userData',
    ].forEach((i) => {
      if (i in loadOptions && isNotEmpty(loadOptions[i])) {
        params[i] = JSON.stringify(loadOptions[i]);
      }
    });

    return params;
  }
}

function isNotEmpty(val: any) {
  if (val == null || val === undefined || val == '') {
    return false;
  }
  return true;
}
