import { Component } from '@angular/core';
import {SocketService} from '../llista-videos/socket.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-comprovar-c2',
  templateUrl: './comprovar-c2.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./comprovar-c2.component.css']
})
export class ComprovarC2Component {
  inputCode: string = '';

  constructor(private socketService: SocketService, private router: Router) {}

  // Función para confirmar el código
  confirmCode() {
  }
}
