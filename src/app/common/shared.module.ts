import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DxDataGridModule,
  DxFormModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxScrollViewModule,
  DxToolbarModule,
  DxTabsModule,
  DxListModule,
  DxMenuModule,
  DxDropDownButtonModule,
  DxFileUploaderModule,
} from 'devextreme-angular';
import { FileDropzoneComponent } from '../components/file-dropzone/file-dropzone.component';
import { BreadCrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

const commonComponents = [FileDropzoneComponent, BreadCrumbComponent];
@NgModule({
  declarations: [...commonComponents],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxFormModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxPopupModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxTabsModule,
    DxListModule,
    DxMenuModule,
    DxDropDownButtonModule,
    DxFileUploaderModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxFormModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxPopupModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxTabsModule,
    DxListModule,
    DxMenuModule,
    DxDropDownButtonModule,
    DxFileUploaderModule,
    ...commonComponents,
  ],
})
export class SharedModule {}
