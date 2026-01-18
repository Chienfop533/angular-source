import { Component, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { ToastService } from '../../services/toast.service';
import { ConversationsService } from '../../services/conversations.service';
import { objectToFormData } from '../../common/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('form', { static: false }) form!: DxFormComponent;
  model: any = {};
  constructor(
    private toastService: ToastService,
    private conversationsService: ConversationsService,
    private router: Router,
  ) {}
  saveDraft() {
    let result = this.form.instance.validate();
    if (!result.isValid) {
      this.toastService.showWarning('Vui lòng thêm mô tả hoặc file ghi âm');
      return;
    }
    this.model.isDraft = true;
    const formData = objectToFormData(this.model);
    this.conversationsService.addFromFormData(formData).subscribe((res) => {
      this.toastService.showSuccess('Lưu nháp thành công');
      this.router.navigate(['/conversations']);
    });
  }

  processAudio() {
    let result = this.form.instance.validate();
    if (!result.isValid) {
      this.toastService.showWarning('Vui lòng thêm mô tả hoặc file ghi âm');
      return;
    }
    this.model.isDraft = false;
    const formData = objectToFormData(this.model);
    this.conversationsService
      .addFromFormData(formData)
      .subscribe((res: any) => {
        this.toastService.showSuccess('Xử lý thành công');
        this.router.navigate(['/conversations'], {
          queryParams: { id: res?.data?.id },
        });
      });
  }
}
