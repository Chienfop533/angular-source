import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService extends BaseService<any> {
  constructor() {
    super('conversations');
  }
}
