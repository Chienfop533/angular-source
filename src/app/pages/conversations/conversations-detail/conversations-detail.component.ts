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
import { MediaService } from '../../../services/media.service';
@Component({
  selector: 'app-conversations-detail',
  templateUrl: './conversations-detail.component.html',
  styleUrls: ['./conversations-detail.component.scss'],
})
export class ConversationsDetailComponent implements OnInit {
  @ViewChild('lgModal', { static: false }) childModal!: ModalDirective;
  detailData: any = {};
  @ViewChild('wave') wave!: ElementRef;
  wavesurfer!: WaveSurfer;
  currentTime = 0;
  duration = 0;
  isPlaying: boolean = false;
  currentIndex: number = 0;
  speakerColors: Record<string, { color: string; bg: string }> = {};
  dataSourceStatus: any = [];

  ngAfterViewInit() {
    this.wavesurfer = WaveSurfer.create({
      container: this.wave.nativeElement,
      height: 80,
      waveColor: '#ccc',
      progressColor: '#e04503a9',
      cursorColor: '#e04403',
      barHeight: 2,
      barWidth: 2,
    });

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
    // Khởi tạo mặc định time 0
    this.wavesurfer.on('ready', () => {
      this.wavesurfer.seekTo(0);
    });
  }

  @Output() loadInit = new EventEmitter<any>();
  constructor(
    private conversationsService: ConversationsService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {}
  open(id: string, dataSourceStatus: any) {
    this.dataSourceStatus = dataSourceStatus;
    this.conversationsService.getById(id).subscribe((res) => {
      this.detailData = res;
      this.mediaService
        .download(this.detailData?.file?.path)
        .subscribe((res) => {
          this.wavesurfer.loadBlob(res);
        });
    });
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
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
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
        (_: any, l: any) => `${Math.min(+l + 30, 90)}%)`
      );
      this.speakerColors[speaker] = { color, bg };
    }
    return this.speakerColors[speaker].color;
  }
  playSegment(m: any, index: number) {
    this.currentIndex = index;
    const ws = this.wavesurfer;
    if (!ws) return;
    this.isPlaying = true;
    ws.play(m.start, m.end);
  }

  formatDuration(sec: any) {
    if (sec < 1) return `${(sec * 1000).toFixed(0)}ms`;
    return `${sec.toFixed(2)}s`;
  }
  getStatus = (code: any) => {
    const result = this.dataSourceStatus.find((item: any) => item.code == code);
    return result ?? {};
  };
}
