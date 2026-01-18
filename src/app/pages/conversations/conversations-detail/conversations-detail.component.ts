import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConversationsService } from '../../../services/conversations.service';
import WaveSurfer from 'wavesurfer.js';
@Component({
  selector: 'app-conversations-detail',
  templateUrl: './conversations-detail.component.html',
  styleUrls: ['./conversations-detail.component.scss'],
})
export class ConversationsDetailComponent implements OnInit {
  @ViewChild('lgModal', { static: false }) childModal!: ModalDirective;
  detailData: any = {
    id: '68244d84-d311-4a5c-ee5a-08de534c7f18',
    description: 'Hội thoại 2',
    status: 'Success',
    createdAt: '2026-01-14T09:08:34.825Z',
    updatedAt: '2026-01-14T09:18:38.617Z',
    createdBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
    modifiedBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
    taskId: '2c646cfd-88a6-474a-9863-51d0ceee23a0',
    isDeleted: false,

    actions: {
      canEdit: false,
      canDelete: false,
      canProcess: false,
      canAutoEdit: false,
      canCancel: false,
    },

    file: {
      id: 'a8e3b6b9-996c-45ed-641a-08de534c7f19',
      name: 'speaker_2.mp3',
      contentType: 'audio/mpeg',
      path: 'speaker_2_954e2d7c-8a1d-4210-a313-e24215c9607b.mp3',
    },

    result: {
      conversationId: '68244d84-d311-4a5c-ee5a-08de534c7f18',
      messages: [
        {
          speaker: 'speaker_0',
          start: 0,
          end: 9.2,
          duration: 9.2,
          text: 'Nguyễn Tiến Huy là một nhà đồng sáng lập...',
        },
        {
          speaker: 'speaker_1',
          start: 9.2,
          end: 19.2,
          duration: 10,
          text: 'Nguyễn Tiến Huy là một nhà đồng sáng lập...',
        },
        {
          speaker: 'speaker_2',
          start: 19.2,
          end: 29.2,
          duration: 10,
          text: 'Nguyễn Tiến Huy là một nhà đồng sáng lập...',
        },
        {
          speaker: 'speaker_0',
          start: 29.2,
          end: 39.2,
          duration: 10,
          text: 'Nguyễn Tiến Huy là một nhà đồng sáng lập...',
        },
      ],
    },

    statuses: [
      {
        id: '70608a9c-1d37-4a7d-69d5-08de534de6fa',
        conversationId: '68244d84-d311-4a5c-ee5a-08de534c7f18',
        status: 'Success',
        taskStatus: 'Success',
        taskMessage: null,
        taskPosition: null,
        taskQueueLength: null,
        createdAt: '2026-01-14T09:18:38.617Z',
        updatedAt: null,
        createdBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
        modifiedBy: null,
      },
      {
        id: '6318c150-3390-430c-5d51-08de534c7f1a',
        conversationId: '68244d84-d311-4a5c-ee5a-08de534c7f18',
        status: 'Processing',
        taskStatus: 'Pending',
        taskMessage:
          'Diarization with transcription task submitted successfully',
        taskPosition: null,
        taskQueueLength: null,
        createdAt: '2026-01-14T09:11:05.201Z',
        updatedAt: null,
        createdBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
        modifiedBy: null,
      },
      {
        id: '8bc33787-3b66-43b7-5d50-08de534c7f1a',
        conversationId: '68244d84-d311-4a5c-ee5a-08de534c7f18',
        status: 'Draft',
        taskStatus: null,
        taskMessage: null,
        taskPosition: null,
        taskQueueLength: null,
        createdAt: '2026-01-14T09:08:34.825Z',
        updatedAt: null,
        createdBy: '5c82626e-6d38-ac4b-dd54-3a0f973e275c',
        modifiedBy: null,
      },
    ],
  };
  @ViewChild('wave') wave!: ElementRef;
  wavesurfer!: WaveSurfer;
  currentTime = 0;
  duration = 0;
  isPlaying: boolean = false;
  currentIndex: number = 0;
  speakerColors: Record<string, { color: string; bg: string }> = {};

  ngAfterViewInit() {
    this.wavesurfer = WaveSurfer.create({
      container: this.wave.nativeElement,
      height: 80,
      waveColor: '#ccc',
      progressColor: '#e04503a9',
      cursorColor: '#e04403',
    });

    this.wavesurfer.load('assets/postcard_0.mp3');

    // Lấy duration khi ready
    this.wavesurfer.on('ready', () => {
      this.duration = this.wavesurfer.getDuration();
    });

    // Xử lý thời gian khi phát
    this.wavesurfer.on('audioprocess', (time: number) => {
      this.currentTime = time;
    });

    // Xử lý khi kết thúc
    this.wavesurfer.on('finish', () => {
      this.isPlaying = false;
    });
  }

  @Output() loadInit = new EventEmitter<any>();
  constructor(private conversationsService: ConversationsService) {}

  ngOnInit(): void {}
  open(id: string) {
    // this.conversationsService.getById(id).subscribe((res) => {
    //   this.detailData = res.data;
    //   console.log(this.detailData);
    // });

    this.childModal.show();
  }

  closePopup = () => {
    this.childModal.hide();
  };
  formatTime(t: number): string {
    if (!t) return '0:00';

    const totalSeconds = Math.floor(t);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  togglePlay() {
    if (!this.wavesurfer) return;

    this.wavesurfer.playPause();
    this.isPlaying = this.wavesurfer.isPlaying();
  }
  stopAudio() {
    if (!this.wavesurfer) return;

    this.wavesurfer.pause();
    this.wavesurfer.seekTo(0); // trả về đầu
    this.isPlaying = false;
    this.currentTime = 0;
  }

  randomHsl() {
    const hue = Math.floor(Math.random() * 360);
    const sat = 60 + Math.random() * 20;
    const light = 45 + Math.random() * 10;
    return `hsl(${hue}, ${sat}%, ${light}%)`;
  }

  getSpeakerColor(speaker: string) {
    if (!speaker) return '#adb5bd';
    if (!this.speakerColors[speaker]) {
      const color = this.randomHsl();
      const bg = color.replace(
        /(\d+)%\)$/,
        (_: any, l: any) => `${Math.min(+l + 30, 90)}%)`,
      );
      this.speakerColors[speaker] = { color, bg };
    }
    return this.speakerColors[speaker].color;
  }
  playSegment(m: any, index: number) {
    this.currentIndex = index;
    const ws = this.wavesurfer;
    if (!ws) return;
    ws.play(m.start, m.end);
  }
  compactTime(sec: any) {
    const mins = Math.floor(sec / 60);
    const seconds = (sec % 60).toFixed(3);
    return `${String(mins).padStart(2, '0')}:${String(seconds).padStart(6, '0')}`;
  }

  formatDuration(sec: any) {
    if (sec < 1) return `${(sec * 1000).toFixed(0)}ms`;
    return `${sec.toFixed(2)}s`;
  }
}
