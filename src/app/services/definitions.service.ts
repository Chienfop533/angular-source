import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class DefinitionsService extends BaseService<any> {
  constructor() {
    super('definitions');
  }
  getByType(type: string) {
    return this.http
      .get(`${this.baseUrl}/${this._path}/by-type?type=${type}`)
      .pipe(
        map((x: any) => x.data),
        catchError((err) => {
          throw err;
        })
      );
  }
}
