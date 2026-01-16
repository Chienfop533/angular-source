import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCURDService } from './base_curd.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DefinitionsService extends BaseCURDService<any> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'definitions');
  }
  getByType(type: string) {
    return this.http.get(`${this.baseUrl}/${this._path}/by-type?type=${type}`);
  }
}
