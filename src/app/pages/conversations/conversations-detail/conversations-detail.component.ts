import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConversationsService } from '../../../services/conversations.service';
@Component({
  selector: 'app-conversations-detail',
  templateUrl: './conversations-detail.component.html',
  styleUrls: ['./conversations-detail.component.scss'],
})
export class ConversationsDetailComponent implements OnInit {
  @ViewChild('lgModal', { static: false }) childModal!: ModalDirective;
  detailData: any;

  @Output() loadInit = new EventEmitter<any>();
  constructor(private conversationsService: ConversationsService) {}

  ngOnInit(): void {}
  open(id: string) {
    this.conversationsService.getById(id).subscribe((res) => {
      this.detailData = res.data;
      console.log(this.detailData);
    });

    this.childModal.show();
  }

  closePopup = () => {
    this.childModal.hide();
  };
}
