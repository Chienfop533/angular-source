import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.scss'],
})
export class FileDropzoneComponent implements OnInit {
  selectButtonText = 'Kéo & thả hoặc nhấp để chọn file audio';
  fileUploaded: any[] = [];
  @Output() fileOutput = new EventEmitter<any>();
  ngOnInit() {}
  changeFileUploaded = (e: any) => {
    if (e && e.value?.length > 0) {
      this.fileUploaded = e.value;
      this.selectButtonText = '';
    } else {
      this.fileUploaded = [];
      this.selectButtonText = 'Kéo & thả hoặc nhấp để chọn file audio';
    }
    this.fileOutput.emit(this.fileUploaded[0]);
  };
  deleteFileSelected() {
    this.fileUploaded = [];
    this.selectButtonText = 'Kéo & thả hoặc nhấp để chọn file audio';
  }
}
