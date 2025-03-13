import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SocketService } from './socket.service';
import { Router } from '@angular/router';

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
  isPremium: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    public socketService: SocketService
  ) {}

  ngOnInit() {
    // Verificar si el usuario es Premium
    const token = localStorage.getItem('authToken');
    this.isPremium = !!token; // Si hay token, es Premium

    // Si el usuario intenta acceder a video2 y no es premium, redirigirlo
    if (!this.isPremium && this.selectedVideo === 'video2') {
      alert('Necesitas una cuenta premium para ver este video.');
      this.router.navigate(['/login']);
    }

    this.subscriptions.add(
      this.socketService.isCodeVerified().subscribe((verified) => {
        this.videoVisible = verified;
      })
    );

    // Consultar estado de selección en el servidor al cargar el componente
    this.socketService.getSelectedVideo().then((videoLink) => {
      if (videoLink) {
        this.socketService.linkVideo = videoLink; // Actualiza el enlace en el servicio
        this.videoVisible = true; // Muestra el video si está verificado
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sendSelectedVideo() {
    if (this.selectedVideo) {
      // Bloquear si intenta seleccionar video2 sin ser Premium
      if (!this.isPremium && this.selectedVideo === 'video2') {
        alert('Debes ser usuario Premium para ver este video.');
        return;
      }

      this.socketService.selectVideo(this.selectedVideo); // Notifica al servidor sobre la selección
      this.isVideoSent = true; // Indica que se ha enviado
      this.videoVisible = false; // Oculta el video, ya que requiere verificación
      alert("Selección realizada. Verifica el código en la siguiente página.");
    }
  }

  verifySelectedVideo() {
    window.location.href = 'http://localhost:4300'; // Redirigir a la página de verificación
  }

  getSafeUrl(link: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
}
