import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-llista-videos',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './llista-videos.component.html',
  styleUrls: ['./llista-videos.component.css'],
})
export class LlistaVideosComponent implements OnInit, OnDestroy {
  selectedVideo: string = '';
  videoVisible: boolean = false;
  isVideoSent: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private sanitizer: DomSanitizer,
    public socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.socketService.isCodeVerified().subscribe((verified) => {
        this.videoVisible = verified;
      })
    );

    // Consultar estado en el servidor al cargar el componente
    this.socketService.getVerificationStatus().then((status) => {
      this.videoVisible = status;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sendSelectedVideo() {
    if (this.selectedVideo) {
      this.socketService.selectVideo(this.selectedVideo);
      this.isVideoSent = true;
      this.videoVisible = false;
    }
  }

  verifySelectedVideo() {
    window.location.href = 'http://localhost:4300';
  }

  getSafeUrl(link: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.socketService.transformToEmbedLink(link)
    );
  }
}
