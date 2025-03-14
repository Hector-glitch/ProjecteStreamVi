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
  private secretKey = 'mi_clave_secreta'; // Clau secreta per validar el token

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    public socketService: SocketService
  ) {}

  ngOnInit() {
    // Validar el token quan es carrega el component
    const token = localStorage.getItem('authToken');
    if (token) {
      if (this.validateToken(token)) {
        const userData = this.loadUserFromToken(token);
        this.isPremium = userData.isPremium; // Obtenir la informació de l'usuari
      } else {
        this.logout(); // Si el token no és vàlid, tanquem sessió
      }
    } else {
      this.isPremium = false; // Si no hi ha token, l'usuari no està logat
    }

    this.subscriptions.add(
      this.socketService.isCodeVerified().subscribe((verified) => {
        this.videoVisible = verified;
      })
    );

    // Consultar estado de selección en el servidor al cargar el componente
    this.socketService.getSelectedVideo().then((videoLink) => {
      if (videoLink) {
        this.socketService.linkVideo = videoLink; // Actualitza l'enllaç al servei
        this.videoVisible = true; // Mostra el video si està verificat
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  validateToken(token: string): boolean {
    try {
      const [data, signature] = atob(token).split('.');
      if (signature !== this.secretKey) return false; // Verificar la signatura

      const tokenData = JSON.parse(data);
      if (Date.now() > tokenData.exp) return false; // Comprovar si el token ha caducat

      return true; // Token vàlid
    } catch (error) {
      return false; // Si es produeix un error, el token no és vàlid
    }
  }

  loadUserFromToken(token: string) {
    const [data, signature] = atob(token).split('.');
    if (signature === this.secretKey) {
      return JSON.parse(data); // Retornar les dades de l'usuari
    }
    return null;
  }

  sendSelectedVideo() {
    if (this.selectedVideo) {
      // Bloquejar si intenta seleccionar video2 sin ser Premium
      if (!this.isPremium && this.selectedVideo === 'video2') {
        alert('Debes ser usuario Premium para ver este video.');
        return;
      }

      this.socketService.selectVideo(this.selectedVideo); // Notifica al servidor sobre la selecció
      this.isVideoSent = true; // Indica que s'ha enviat
      this.videoVisible = false; // Oculta el video, ja que requereix verificació
      alert("Selección realizada. Verifica el código en la siguiente página.");
    }
  }

  verifySelectedVideo() {
    window.location.href = 'http://localhost:4300'; // Redirigir a la página de verificación
  }

  getSafeUrl(link: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  logout() {
    // Eliminar les dades de la sessió de localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('isPremium');

    // Redirigir a la pàgina d'inici de sessió
    this.router.navigate(['/login']);
  }
}
