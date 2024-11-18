import {NgFor, NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {SocketService} from './socket.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Per verificar que el link es segur


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
  isVideoSent: boolean = false;  // Nueva propiedad para rastrear si el video ha sido enviado

  constructor(  private sanitizer: DomSanitizer, public socketService: SocketService, private router: Router) {}

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
      this.isVideoSent = true; // Cambia a true cuando el video es enviado
    }
  }

  // Navegación a la página de verificación
  verifySelectedVideo() {
    this.router.navigate(['/client2']);
  }

  // Cosas video youtube

// Método para marcar la URL como segura
  getSafeUrl(link: string): SafeResourceUrl {
    // Transforma la URL de YouTube a un formato adecuado para un iframe
    const embedLink = this.transformToEmbedLink(link);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
  }

  // Transformar la URL de YouTube a formato embebido (iframe)
  transformToEmbedLink(link: string): string {
    const videoId = link.split('v=')[1];  // Extrae el videoId de la URL de YouTube
    return `https://www.youtube.com/embed/${videoId}`;  // Devuelve la URL embebida
  }


}


