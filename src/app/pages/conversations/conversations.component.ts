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
  dataSource: any = [];
  dataSourceStatus: any = [];
  constructor(
    private conversationsService: ConversationsService,
    private definitionsService: DefinitionsService
  ) {}

  ngOnInit() {
    this.dataSource = this.conversationsService.loadGrid();
    this.definitionsService
      .getByType('ConversationStatus')
      .subscribe((res: any) => {
        this.dataSourceStatus = res;
      });
  }

  refreshGrid() {
    this.dataSource.reload();
  }
  handleDetail(data: any) {
    this.conversationsDetail.open(data?.id, this.dataSourceStatus);
  }
  getStatus = (code: any) => {
    const result = this.dataSourceStatus.find((item: any) => item.code == code);
    return result ?? {};
  };
}
