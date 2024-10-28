import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LlistaVideosComponent} from "./llista-videos/llista-videos.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, LlistaVideosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjecteStreamVi';
}
