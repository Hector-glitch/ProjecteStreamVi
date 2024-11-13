import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  public videos: string[] = [];       // Almacena la lista de videos recibidos
  public authCode: string = '';       // Almacena el código de autenticación recibido
  private codeVerified = new BehaviorSubject<boolean>(false); // Estado del código verificado

  constructor() {
    // Conexión al servidor Socket.IO
    this.socket = io('http://localhost:3000');

    // Escucha la lista de videos desde el servidor
    this.socket.on('videoList', (videoList: string[]) => {
      this.videos = videoList;
    });

    // Escucha el código de autenticación del servidor
    this.socket.on('authCode', (code: string) => {
      this.authCode = code;
    });
  }

  // Envía el nombre del video seleccionado al servidor
  selectVideo(videoName: string) {
    this.socket.emit('selectVideo', videoName);
  }

  // Verifica el código ingresado con el que se generó
  verifyCode(inputCode: string): boolean {
    const isValid = inputCode === this.authCode;
    this.codeVerified.next(isValid); // Actualiza el estado de verificación
    return isValid;
  }

  // Observable para el estado de verificación del código
  isCodeVerified() {
    return this.codeVerified.asObservable();
  }
}
