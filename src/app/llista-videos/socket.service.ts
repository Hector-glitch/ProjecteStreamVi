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
  private codeVerified = new BehaviorSubject<boolean>(false);
  public linkVideo: string = '';

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
    });
  }

  selectVideo(videoName: string) {
    this.socket.emit('selectVideo', videoName);
  }

  validateCode(code: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.socket.emit('validateCode', code, (isValid: boolean) => {
        if (isValid) this.codeVerified.next(true);
        resolve(isValid);
      });
    });
  }

  isCodeVerified() {
    return this.codeVerified.asObservable();
  }

  transformToEmbedLink(link: string): string {
    const videoId = link.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
}
