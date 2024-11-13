import {NgFor, NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
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
export class LlistaVideosComponent implements OnInit {
  selectedVideo: string = '';
  videoVisible: boolean = false; // Estado de visibilidad del video

  constructor(public socketService: SocketService, private router: Router) {}

  ngOnInit() {
    // Suscribimos al estado de verificación
    this.socketService.isCodeVerified().subscribe((verified) => {
      this.videoVisible = verified;
    });
  }

  // Función para enviar el vídeo seleccionado
  sendSelectedVideo() {
    if (this.selectedVideo) {
      this.socketService.selectVideo(this.selectedVideo);
    }
  }

  // Navegación a la página de verificación
  verifySelectedVideo() {
    this.router.navigate(['/client2']);
  }

  // Condición para mostrar el video
  pintarVideo() {
    return !this.videoVisible;
  }
}


