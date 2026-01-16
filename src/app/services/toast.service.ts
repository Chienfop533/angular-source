import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastr: ToastrService) {}
  showSuccess(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig<any>>
  ) {
    this.toastr.success(message, title, override);
  }
  showError(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig<any>>
  ) {
    this.toastr.error(message, title, override);
  }
  showInfo(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig<any>>
  ) {
    this.toastr.info(message, title, override);
  }
  showWarning(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig<any>>
  ) {
    this.toastr.warning(message, title, override);
  }
}
