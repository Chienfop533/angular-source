import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCURDService } from './base_curd.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService extends BaseCURDService<any> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'conversations');
  }
}
