import {NgFor, NgForOf, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import {SocketService} from './socket.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-llista-videos',
  standalone: true,
  imports: [NgFor, FormsModule, NgForOf, NgIf],
  templateUrl: './llista-videos.component.html',
  styleUrls: ['./llista-videos.component.css']
})
export class LlistaVideosComponent {
  selectedVideo: string = '';

  constructor(public socketService: SocketService, private router: Router) {}

  // Funció per enviar el vídeo seleccionat al servidor
  sendSelectedVideo() {
    if (this.selectedVideo) {
      this.socketService.selectVideo(this.selectedVideo);
    }

  }
  verifySelectedVideo() {

    this.router.navigate(['/client2']);//

  }
}


