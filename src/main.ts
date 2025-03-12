import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Importa Firebase i inicialitza l'aplicació
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBd-xT8zzIHeXZH1MX1nLFKDjseXU9n2hg",
  authDomain: "streamvi-406f9.firebaseapp.com",
  projectId: "streamvi-406f9",
  storageBucket: "streamvi-406f9.firebasestorage.app",
  messagingSenderId: "545096118229",
  appId: "1:545096118229:web:9c04a4fd6b88dee6ebd75c",
  measurementId: "G-NT0SEDWNT8"
};

// Inicialitza Firebase
initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
