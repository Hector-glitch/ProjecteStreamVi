import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getApp } from "firebase/app";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData = {
    userEmail: '',
    userPassword: ''
  };
  error: string = '';
  private secretKey = 'mi_clave_secreta'; // Clau secreta per al token

  constructor(private router: Router) { }

  ngOnInit() {
    const sessionActive = localStorage.getItem('sessionActive');
    if (!sessionActive) {
      this.router.navigate(['/lista-videos']); // Torna a la pàgina de verificació
    }
  }

  async onSubmit() {
    try {
      const db = getFirestore(getApp());

      // Consulta a Firestore per verificar l'usuari
      const userQuery = query(
        collection(db, "usuaris"),
        where("email", "==", this.formData.userEmail),
        where("contrasenya", "==", this.formData.userPassword)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // L'usuari existeix
        const userDoc = querySnapshot.docs[0]; // Agafa el primer document trobat
        const userData = userDoc.data();

        // Comprova si l'usuari és premium
        const isPremium = userData['isPremium'];

        // Generar el token només si l'usuari és Premium
        if (isPremium) {
          const tokenData = {
            email: this.formData.userEmail,
            isPremium: isPremium,
            exp: Date.now() + 15 * 60 * 1000 // Expiració a 15 minuts
          };

          // Codificar les dades en base64
          const token = btoa(JSON.stringify(tokenData) + '.' + this.secretKey);

          // Emmagatzemar el token a localStorage
          localStorage.setItem('authToken', token);
        }

        // Guarda altres dades de la sessió
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('isPremium', isPremium ? 'true' : 'false');

        // Redirigir a la pàgina de vídeos
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
