import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getApp } from "firebase/app";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {
    userEmail: '',
    userPassword: ''
  };
  error: string = '';

  constructor(private router: Router) { }

  async onSubmit() {
    try {
      // Obté la instància de Firestore a partir de la app inicialitzada
      const db = getFirestore(getApp());

      // Consulta la col·lecció "usuaris" filtrant per email i contrasenya
      const userQuery = query(
          collection(db, "usuaris"),
          where("email", "==", this.formData.userEmail),
          where("contrasenya", "==", this.formData.userPassword)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // Si l'usuari existeix, marquem la sessió com iniciada (aquí s'utilitza localStorage per simplicitat)
        localStorage.setItem('isLogged', 'true');
        // Redirigeix a la pàgina principal (llista-videos)
        this.router.navigate(['/lista-videos']);
      } else {
        this.error = "Usuari no trobat o contrasenya incorrecta.";
      }
    } catch (error) {
      console.error("Error en iniciar sessió:", error);
      this.error = "Error en iniciar sessió. Torna-ho a intentar.";
    }
  }
}
