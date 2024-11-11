import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  public videos: string[] = [];       // Emmagatzema la llista de vídeos rebuda
  public authCode: string = '';       // Emmagatzema el codi d'autenticació rebut

  constructor() {
    // Conexió al servidor Socket.IO
    this.socket = io('http://localhost:3000');

    // Escolta la llista de vídeos desde el servidor
    this.socket.on('videoList', (videoList: string[]) => {
      this.videos = videoList;
    });

    // Escolta el codi d'autenticació del servidor
    this.socket.on('authCode', (code: string) => {
      this.authCode = code;
    });
  }

  // Envia el nom del vídeo seleccionat al servidor
  selectVideo(videoName: string) {
    this.socket.emit('selectVideo', videoName);
  }
}
