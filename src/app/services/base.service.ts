import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
export class BaseService {
  public baseUrl: string = environment.apiConfig.baseUrl;
  public hostUrl: string = environment.apiConfig.baseUrl;
  public _path: string;
  public _gridInstance: any;
  public router = inject(Router);
  public toastService = inject(ToastService);
  constructor(
    public http: HttpClient,
    private authService: AuthService,
    path: string
  ) {
    this._path = path;
    this.configHeaderDevextreme = this.configHeaderDevextreme.bind(this);
    this.configAjaxErrorDevextreme = this.configAjaxErrorDevextreme.bind(this);
  }

  public configHeaderDevextreme(method: any, ajaxOptions: any) {
    ajaxOptions.headers = {
      Authorization: `Bearer ${this.authService.accessToken}`,
    };
  }

  public configAjaxErrorDevextreme({ xhr, error }: any) {
    let localAllow = localStorage.getItem('isAllowRefeshToken');
    let isAllowRefeshToken = localAllow != 'false';
    if (xhr.status == 401 && isAllowRefeshToken) {
      this.authService.onRefreshToken().then((res: any) => {
        if (this._gridInstance != null) {
          this._gridInstance.load();
        }
      });
    } else if (xhr.status == 401 && !isAllowRefeshToken) {
      this.router.navigate(['/auth/lock']);
    } else if (xhr.status == 403) {
      this.toastService.showError('Không có quyền thực hiện chức năng này!');
    }
  }
}
