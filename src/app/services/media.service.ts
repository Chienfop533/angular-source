import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class MediaService extends BaseService<any> {
  constructor() {
    super('media');
  }
  download(filePath: string) {
    return this.http.get(
      `${this.baseUrl}/${this._path}/download?filePath=${filePath}`,
      {
        responseType: 'blob',
      }
    );
  }
}
