import { Component, OnInit, ViewChild } from '@angular/core';
import { DxoGridComponent } from 'devextreme-angular/ui/nested';
import { ConversationsService } from '../../services/conversations.service';
import { DefinitionsService } from '../../services/definitions.service';
import { ConversationsDetailComponent } from './conversations-detail/conversations-detail.component';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {
  @ViewChild('targetGrid', { static: true }) targetGrid!: DxoGridComponent;
  @ViewChild('conversationsDetail', { static: false })
  conversationsDetail!: ConversationsDetailComponent;
  dataSource: any = [
    {
      id: '68244d84-d311-4a5c-ee5a-08de534c7f18',
      description:
        'Hội thoại 2 Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2Hội thoại 2 Hội thoại 2 Hội thoại 2Hội thoại 2 Hội thoại 2v Hội thoại 2vc v',
      taskId: '2c646cfd-88a6-474a-9863-51d0ceee23a0',
      status: 'Success',
      statuses: [],
      fileId: 'a8e3b6b9-996c-45ed-641a-08de534c7f19',
      file: null,
      result: null,
      isDeleted: false,
      createdAt: '2026-01-14T09:08:34.825Z',
      updatedAt: '2026-01-14T09:18:38.617Z',
      createdBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
      modifiedBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
    },
    {
      id: '67af1339-3fa1-4a95-479f-08de541208e5',
      description: 'test',
      taskId: '34d9d307-e144-41fe-a2c9-0243f5f5e655',
      status: 'Cancel',
      statuses: [],
      fileId: '06f14021-0c14-4459-68c0-08de541208eb',
      file: null,
      result: null,
      isDeleted: false,
      createdAt: '2026-01-15T08:42:36.987Z',
      updatedAt: '2026-01-15T08:44:08.571Z',
      createdBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
      modifiedBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
    },
    {
      id: 'd333552d-f34e-46af-a93d-08de54bccdab',
      description: 'sadfsd',
      taskId: null,
      status: 'Draft',
      statuses: [],
      fileId: '3eb4a69d-9a6e-40c6-daae-08de54bccdb8',
      file: null,
      result: null,
      isDeleted: false,
      createdAt: '2026-01-16T05:05:01.614Z',
      updatedAt: null,
      createdBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
      modifiedBy: null,
    },
  ];
  dataSourceStatus: any = [
    {
      id: 'eb02275b-63d2-4da9-6303-08de53e15e8f',
      type: 'ConversationStatus',
      name: 'Soạn thảo',
      code: 'Draft',
      value: 'Draft',
      color: '#ffc42e',
      order: 0,
    },
    {
      id: '371e0ac6-b26a-4295-6304-08de53e15e8f',
      type: 'ConversationStatus',
      name: 'Đang xử lý',
      code: 'Processing',
      value: 'Processing',
      color: '#1e90ff',
      order: 0,
    },
    {
      id: '01ad17ba-63bb-4576-6305-08de53e15e8f',
      type: 'ConversationStatus',
      name: 'Thành công',
      code: 'Success',
      value: 'Success',
      color: '#4caf50',
      order: 0,
    },
    {
      id: 'e1c471ca-07e1-47f3-6306-08de53e15e8f',
      type: 'ConversationStatus',
      name: 'Lỗi',
      code: 'Failure',
      value: 'Failure',
      color: '#f73e54',
      order: 0,
    },
    {
      id: '55d8d476-c9e3-4a17-6307-08de53e15e8f',
      type: 'ConversationStatus',
      name: 'Hủy',
      code: 'Cancel',
      value: 'Cancel',
      color: '#a9a9a9',
      order: 0,
    },
  ];
  constructor(
    private conversationsService: ConversationsService,
    private definitionsService: DefinitionsService,
  ) {}

  ngOnInit() {
    // this.dataSource = this.conversationsService.loadGrid();
    // this.definitionsService
    //   .getByType('ConversationStatus')
    //   .subscribe((res: any) => {
    //     this.dataSourceStatus = res;
    //   });
  }

  refreshGrid() {
    this.dataSource.reload();
  }
  handleDetail(data: any) {
    this.conversationsDetail.open(data?.id);
  }
  getStatus = (code: any) => {
    const result = this.dataSourceStatus.find((item: any) => item.code == code);
    return result ?? {};
  };
}
