import {NgFor, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import {SocketService} from './socket.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-llista-videos',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './llista-videos.component.html',
  styleUrls: ['./llista-videos.component.css']
})
export class LlistaVideosComponent {
  selectedVideo: string = '';

  constructor(public socketService: SocketService) {}

  ngOnInit(): void {
    // Inicia el servei i recupera la llista de vídeos
  }

  // Funció per enviar el vídeo seleccionat al servidor
  sendSelectedVideo() {
    if (this.selectedVideo) {
      this.socketService.selectVideo(this.selectedVideo);
    }
  }
}


