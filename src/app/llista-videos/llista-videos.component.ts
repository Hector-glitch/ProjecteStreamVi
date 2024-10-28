import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-llista-videos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './llista-videos.component.html',
  styleUrls: ['./llista-videos.component.css']
})
export class LlistaVideosComponent {
  public videos = ['www.video1.yt.com', 'video2', 'video3', 'video4'];
}
