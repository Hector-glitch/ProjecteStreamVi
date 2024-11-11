import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LlistaVideosComponent} from "./llista-videos/llista-videos.component";
import {ComprovarC2Component} from './comprovar-c2/comprovar-c2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LlistaVideosComponent, ComprovarC2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjecteStreamVi';
}
