import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  public videos: string[] = [];
  public authCode: string = '';
  public linkVideo: string = '';  // Almacenar el enlace del video
  private codeVerified = new BehaviorSubject<boolean>(false);  // Añadimos el BehaviorSubject para gestionar el estado de verificación
  private linkVideoSubject = new BehaviorSubject<string>('');

  linkVideo$ = this.linkVideoSubject.asObservable();  // Observable para que los componentes escuchen cambios
  isCodeVerified$ = this.codeVerified.asObservable();  // Observable para que los componentes escuchen la verificación del código

  constructor() {
    this.socket = io('http://localhost:3000');

    this.socket.on('videoList', (videoList: string[]) => {
      this.videos = videoList;
    });

    this.socket.on('authCode', (code: string) => {
      this.authCode = code;
    });

    this.socket.on('linkVideo', (link: string) => {
      this.linkVideo = link;
      this.linkVideoSubject.next(link);  // Emitir el nuevo enlace al observador
    });

    this.socket.on('codeVerified', (isVerified: boolean) => {
      this.codeVerified.next(isVerified);  // Actualizar el estado de la verificación del código
    });
  }

  selectVideo(videoName: string) {
    this.socket.emit('selectVideo', videoName);
  }

  validateCode(code: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.socket.emit('validateCode', code, (isValid: boolean) => {
        this.codeVerified.next(isValid);  // Actualizar el estado de la verificación
        resolve(isValid);
      });
    });
  }

  getVerificationStatus(): Promise<boolean> {
    return new Promise((resolve) => {
      this.socket.emit('getVerificationStatus', (status: boolean) => {
        resolve(status);
      });
    });
  }

  getSelectedVideo(): Promise<string> {
    return new Promise((resolve) => {
      this.socket.emit('getSelectedVideo', (videoLink: string) => {
        resolve(videoLink); // Devuelve el enlace del video almacenado en el servidor
      });
    });
  }

  isCodeVerified() {
    return this.codeVerified.asObservable();
  }
}
